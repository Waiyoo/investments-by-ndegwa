//app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, contact, need, channel } = await req.json()

    if (!name || !contact || !need) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // ---------- 1. Build message ----------
    const subject = `New inquiry from ${name}`
    const body =
      `New contact inquiry\n\n` +
      `Name:      ${name}\n` +
      `Contact:   ${contact}\n` +
      `Channel:   ${channel}\n` +
      `Sent at:   ${new Date().toISOString()}\n\n` +
      `--- What they need ---\n${need}\n`

    // ---------- 2. Send email ----------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,           // e.g. smtp.gmail.com
      port: Number(process.env.SMTP_PORT),   // 465
      secure: true,
      auth: {
        user: process.env.SMTP_USER,         // company inbox
        pass: process.env.SMTP_PASS,         // app password
      },
    })

    await transporter.sendMail({
      from: `"PY Capital Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,      // company inbox
      replyTo: contact.includes('@') ? contact : undefined,
      subject,
      text: body,
    })

    // ---------- 3. Optional WhatsApp URL ----------
    let whatsappUrl: string | undefined
    if (channel === 'whatsapp') {
      const phone = process.env.WHATSAPP_PHONE // "254724535062" no +, no spaces
      const text = encodeURIComponent(
        `Hello PY Capital,\n\nMy name is ${name}.\nContact: ${contact}\n\nI need: ${need}`
      )
      whatsappUrl = `https://wa.me/${phone}?text=${text}`
    }

    return NextResponse.json({ ok: true, whatsappUrl })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}