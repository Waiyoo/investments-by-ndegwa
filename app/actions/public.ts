'use server'

import { prisma } from '@/lib/db/prisma'
import { inquirySchema, investmentFilterSchema } from '@/lib/validation'
import { sendInquiryNotificationEmails } from '@/lib/email'
import { z } from 'zod'

export async function getPublicInvestments(filters: z.infer<typeof investmentFilterSchema>) {
  const parsed = investmentFilterSchema.safeParse(filters)
  if (!parsed.success) {
    throw new Error('Invalid filter parameters.')
  }

  const { category, status, search, minAmount, maxAmount, sort } = parsed.data

  const whereClause: any = {
    published: true,
  }

  if (category) {
    whereClause.category = { slug: category }
  }

  if (status) {
    whereClause.status = { slug: status }
  }

  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { shortDescription: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (minAmount !== undefined || maxAmount !== undefined) {
    whereClause.fundingTarget = {}
    if (minAmount !== undefined) whereClause.fundingTarget.gte = minAmount
    if (maxAmount !== undefined) whereClause.fundingTarget.lte = maxAmount
  }

  let orderBy: any = { createdAt: 'desc' }
  if (sort === 'target-asc') orderBy = { fundingTarget: 'asc' }
  if (sort === 'target-desc') orderBy = { fundingTarget: 'desc' }
  if (sort === 'closing') orderBy = { closingDate: 'asc' }

  const investments = await prisma.investmentOpportunity.findMany({
    where: whereClause,
    include: {
      category: true,
      status: true,
      images: { orderBy: { ordering: 'asc' } },
    },
    orderBy,
  })

  // Sanitize according to explicit visibility flags
  return investments.map((inv) => ({
    id: inv.id,
    title: inv.title,
    slug: inv.slug,
    category: inv.category,
    status: inv.status,
    location: inv.location,
    shortDescription: inv.shortDescription,
    closingDate: inv.showClosingDate ? inv.closingDate : null,
    fundingTarget: inv.showFundingTarget ? inv.fundingTarget : null,
    amountRaised: inv.showAmountRaised ? inv.amountRaised : null,
    fundingProgress: inv.showFundingProgress && inv.fundingTarget && inv.amountRaised 
      ? Number((Number(inv.amountRaised) / Number(inv.fundingTarget)) * 100).toFixed(1) 
      : null,
    minimumInvestment: inv.showMinimumInvestment ? inv.minimumInvestment : null,
    returnType: inv.showReturnInformation ? inv.returnType : null,
    returnDescription: inv.showReturnInformation ? inv.returnDescription : null,
    expectedReturn: inv.showReturnInformation ? inv.expectedReturn : null,
    riskLevel: inv.showRisk ? inv.riskLevel : null,
    duration: inv.showDuration ? inv.duration : null,
    featured: inv.featured,
    images: inv.images,
  }))
}

export async function submitInvestmentInquiry(data: z.infer<typeof inquirySchema>) {
  const validation = inquirySchema.safeParse(data)
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message }
  }

  const { investmentOpportunityId, name, email, phone, amountInterested, message } = validation.data

  // Verify that the investment exists and is published
  const investment = await prisma.investmentOpportunity.findUnique({
    where: { id: investmentOpportunityId },
    include: { status: true },
  })

  if (!investment || !investment.published) {
    return { success: false, error: 'The selected investment opportunity is no longer available.' }
  }

  // Save inquiry securely in database
  const inquiry = await prisma.investmentInquiry.create({
    data: {
      investmentOpportunityId,
      name,
      email,
      phone,
      amountInterested,
      message,
      status: 'NEW',
    },
  })

  // Trigger emails with robust non-blocking error preservation
  let emailSent = true
  try {
    await sendInquiryNotificationEmails({
      inquiryId: inquiry.id,
      investorName: name,
      investorEmail: email,
      investorPhone: phone,
      amountInterested,
      message,
      investmentTitle: investment.title,
    })
  } catch (err) {
    emailSent = false
    console.error('Email notification dispatch failed, but inquiry record was successfully preserved:', err)
  }

  return {
    success: true,
    message: 'Your investment inquiry has been successfully submitted. Our team will review your details and contact you shortly.',
    emailSentWarning: !emailSent,
  }
}