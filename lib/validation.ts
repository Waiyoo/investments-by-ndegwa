import { z } from 'zod'

export const inquirySchema = z.object({
  investmentOpportunityId: z.string().uuid({ message: 'Invalid investment selection.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  phone: z.string().min(10, { message: 'Please provide a valid phone number.' }).max(20),
  amountInterested: z.coerce.number().positive({ message: 'Amount must be greater than zero.' }).optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(1000),
})

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const investmentFilterSchema = z.object({
  category: z.string().optional(),
  status: z.string().optional(),
  search: z.string().max(100).optional(),
  minAmount: z.coerce.number().optional(),
  maxAmount: z.coerce.number().optional(),
  sort: z.enum(['newest', 'target-asc', 'target-desc', 'closing']).default('newest'),
})