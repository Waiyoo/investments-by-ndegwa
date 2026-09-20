import nodemailer from 'nodemailer'
import { db } from '@/lib/db'

interface ContactNotificationPayload {
  investmentName: string
  investmentslug: string
  visitorName?: string
  visitorEmail?: string
  contactType: string
  message?: string
}

export async function sendAdminContactNotification(
  payload: ContactNotificationPayload
) {
  try {
    const settings = await db.siteSettings.findFirst()

    const adminEmail =
      settings?.companyEmail ||
      process.env.ADMIN_EMAIL ||
      process.env.SMTP_USER

    if (!adminEmail) {
      console.log(
        'Notifications disabled or admin email is not configured.'
      )

      return {
        success: false,
        reason: 'disabled',
      }
    }

    const smtpHost = process.env.SMTP_HOST

    if (!smtpHost) {
      console.log(
        'SMTP notifications are not configured.'
      )

      return {
        success: false,
        reason: 'smtp_not_configured',
      }
    }

    const smtpPort = parseInt(
      process.env.SMTP_PORT || '587',
      10
    )

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth:
        smtpUser && smtpPass
          ? {
              user: smtpUser,
              pass: smtpPass,
            }
          : undefined,
    })

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000'

    const investmentUrl =
      `${siteUrl}/investments/${payload.investmentslug}`

    const mailOptions = {
      from:
        process.env.SMTP_FROM ||
        smtpUser ||
        adminEmail,

      to: adminEmail,

      subject:
        `[Investment Inquiry] ${payload.investmentName}`,

      text: `Hello,

A visitor has interacted with the investment "${payload.investmentName}".

Interaction Type: ${payload.contactType}
Visitor Name: ${payload.visitorName || 'Not Provided'}
Visitor Email: ${payload.visitorEmail || 'Not Provided'}
Message: ${payload.message || 'None provided'}

View Investment:
${investmentUrl}
`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background: #f5f5f5;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 24px; border-radius: 8px;">
            <h2 style="margin-top: 0;">
              New Investment Inquiry
            </h2>

            <p>
              A visitor has interacted with
              <strong>${payload.investmentName}</strong>.
            </p>

            <hr />

            <p>
              <strong>Interaction Type:</strong>
              ${payload.contactType}
            </p>

            <p>
              <strong>Visitor Name:</strong>
              ${payload.visitorName || 'Not Provided'}
            </p>

            <p>
              <strong>Visitor Email:</strong>
              ${payload.visitorEmail || 'Not Provided'}
            </p>

            <p>
              <strong>Message:</strong>
              ${payload.message || 'None provided'}
            </p>

            <p style="margin-top: 24px;">
              <a
                href="${investmentUrl}"
                style="display: inline-block; padding: 10px 18px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 5px;"
              >
                View Investment
              </a>
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return {
      success: true,
    }
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : 'Unknown email delivery error'

    console.error(
      'Email notification delivery failure:',
      message
    )

    return {
      success: false,
      error: message,
    }
  }
}
