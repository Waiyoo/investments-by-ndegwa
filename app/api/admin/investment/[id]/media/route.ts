import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'
import {
  deleteFileFromStorage,
  uploadFileToStorage,
} from '@/lib/storage'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const form = await request.formData()
  const file = form.get('file')

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { error: 'A file is required.' },
      { status: 400 }
    )
  }

  const caption =
    String(form.get('caption') || '').trim() || null

  const uploaded = await uploadFileToStorage(
    file,
    `investments/${params.id}`
  )

  const image = await db.investmentImage.create({
    data: {
      investmentId: params.id,
      url: uploaded.url,
      caption,
      alt: caption,
    },
  })

  return NextResponse.json(
    { image },
    { status: 201 }
  )
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const imageId =
    new URL(request.url).searchParams.get('imageId')

  if (!imageId) {
    return NextResponse.json(
      { error: 'imageId is required.' },
      { status: 400 }
    )
  }

  const image = await db.investmentImage.findFirst({
    where: {
      id: imageId,
      investmentId: params.id,
    },
  })

  if (!image) {
    return NextResponse.json(
      { error: 'Image not found.' },
      { status: 404 }
    )
  }

  await db.investmentImage.delete({
    where: {
      id: image.id,
    },
  })

  await deleteFileFromStorage(image.url)

  return new NextResponse(null, {
    status: 204,
  })
}
