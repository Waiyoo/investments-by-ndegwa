import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const investments = await db.investmentOpportunity.findMany({
      where: {
        published: true,
      },
      include: {
        category: true,
        status: true,
        images: {
          orderBy: {
            ordering: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ investments })
  } catch (error) {
    console.error('Investment fetch error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch investments.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    if (
      !body.title ||
      !body.slug ||
      !body.categoryId ||
      !body.statusId ||
      !body.location ||
      !body.shortDescription ||
      !body.fullDescription ||
      !body.returnType ||
      !body.returnDescription
    ) {
      return NextResponse.json(
        {
          error:
            'title, slug, categoryId, statusId, location, shortDescription, fullDescription, returnType, and returnDescription are required.',
        },
        { status: 400 }
      )
    }

    const investment = await db.investmentOpportunity.create({
      data: {
        title: body.title,
        slug: body.slug,
        categoryId: body.categoryId,
        statusId: body.statusId,
        location: body.location,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        closingDate: body.closingDate
          ? new Date(body.closingDate)
          : null,
        fundingTarget:
          body.fundingTarget !== undefined &&
          body.fundingTarget !== null &&
          body.fundingTarget !== ''
            ? body.fundingTarget
            : null,
        amountRaised:
          body.amountRaised !== undefined &&
          body.amountRaised !== null &&
          body.amountRaised !== ''
            ? body.amountRaised
            : 0,
        minimumInvestment:
          body.minimumInvestment !== undefined &&
          body.minimumInvestment !== null &&
          body.minimumInvestment !== ''
            ? body.minimumInvestment
            : null,
        returnType: body.returnType,
        returnDescription: body.returnDescription,
        expectedReturn: body.expectedReturn || null,
        riskLevel: body.riskLevel || null,
        duration: body.duration || null,
        featured:
          typeof body.featured === 'boolean'
            ? body.featured
            : false,
        published:
          typeof body.published === 'boolean'
            ? body.published
            : false,
        showFundingTarget:
          typeof body.showFundingTarget === 'boolean'
            ? body.showFundingTarget
            : true,
        showAmountRaised:
          typeof body.showAmountRaised === 'boolean'
            ? body.showAmountRaised
            : true,
        showFundingProgress:
          typeof body.showFundingProgress === 'boolean'
            ? body.showFundingProgress
            : true,
        showMinimumInvestment:
          typeof body.showMinimumInvestment === 'boolean'
            ? body.showMinimumInvestment
            : true,
        showReturnInformation:
          typeof body.showReturnInformation === 'boolean'
            ? body.showReturnInformation
            : true,
        showRisk:
          typeof body.showRisk === 'boolean'
            ? body.showRisk
            : true,
        showDuration:
          typeof body.showDuration === 'boolean'
            ? body.showDuration
            : true,
        showClosingDate:
          typeof body.showClosingDate === 'boolean'
            ? body.showClosingDate
            : true,
        showDocuments:
          typeof body.showDocuments === 'boolean'
            ? body.showDocuments
            : true,
        showLinks:
          typeof body.showLinks === 'boolean'
            ? body.showLinks
            : true,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        ogImage: body.ogImage || null,
      },
      include: {
        category: true,
        status: true,
        images: true,
      },
    })

    return NextResponse.json(
      { investment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Investment creation error:', error)

    return NextResponse.json(
      { error: 'Failed to create investment.' },
      { status: 500 }
    )
  }
}
