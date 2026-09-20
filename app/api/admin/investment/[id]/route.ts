import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    const data: Record<string, unknown> = {}

    const stringFields = [
      'title',
      'slug',
      'location',
      'shortDescription',
      'fullDescription',
      'returnType',
      'returnDescription',
      'expectedReturn',
      'riskLevel',
      'duration',
      'metaTitle',
      'metaDescription',
      'ogImage',
    ]

    for (const key of stringFields) {
      if (
        typeof body[key] === 'string' ||
        body[key] === null
      ) {
        data[key] = body[key]
      }
    }

    const requiredRelationFields = [
      'categoryId',
      'statusId',
    ]

    for (const key of requiredRelationFields) {
      if (typeof body[key] === 'string') {
        data[key] = body[key]
      }
    }

    if (body.closingDate !== undefined) {
      data.closingDate = body.closingDate
        ? new Date(body.closingDate)
        : null
    }

    const decimalFields = [
      'fundingTarget',
      'amountRaised',
      'minimumInvestment',
    ]

    for (const key of decimalFields) {
      if (
        body[key] !== undefined &&
        body[key] !== null &&
        body[key] !== ''
      ) {
        data[key] = body[key]
      } else if (body[key] === null || body[key] === '') {
        data[key] = null
      }
    }

    const booleanFields = [
      'featured',
      'published',
      'showFundingTarget',
      'showAmountRaised',
      'showFundingProgress',
      'showMinimumInvestment',
      'showReturnInformation',
      'showRisk',
      'showDuration',
      'showClosingDate',
      'showDocuments',
      'showLinks',
    ]

    for (const key of booleanFields) {
      if (typeof body[key] === 'boolean') {
        data[key] = body[key]
      }
    }

    const investment =
      await db.investmentOpportunity.update({
        where: { id: params.id },
        data,
        include: {
          category: true,
          status: true,
          images: {
            orderBy: {
              ordering: 'asc',
            },
          },
        },
      })

    return NextResponse.json({ investment })
  } catch (error) {
    console.error('Investment update error:', error)

    return NextResponse.json(
      { error: 'Investment not found or could not be updated.' },
      { status: 404 }
    )
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    await db.investmentOpportunity.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, {
      status: 204,
    })
  } catch (error) {
    console.error('Investment delete error:', error)

    return NextResponse.json(
      { error: 'Investment not found or could not be deleted.' },
      { status: 404 }
    )
  }
}
