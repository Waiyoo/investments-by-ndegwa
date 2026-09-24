type InquiryEmailData = {
  inquiryId: string
  investorName: string
  investorEmail: string
  investorPhone: string
  amountInterested: unknown
  message?: string | null
  investmentTitle: string
}

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export async function sendInquiryNotificationEmails(
  data: InquiryEmailData
): Promise<void> {
  const apiKey = requiredEnv('RESEND_API_KEY')
  const from = requiredEnv('EMAIL_FROM')
  const adminEmail = requiredEnv('ADMIN_EMAIL')

  const amount = data.amountInterested
    ? `KSh ${Number(data.amountInterested).toLocaleString('en-KE')}`
    : 'Not specified'

  const investorHtml = `
    <h2>PY Capital — Inquiry Received</h2>
    <p>Dear ${escapeHtml(data.investorName)},</p>
    <p>Thank you for expressing interest in the following investment opportunity:</p>
    <p><strong>${escapeHtml(data.investmentTitle)}</strong></p>
    <p><strong>Amount of interest:</strong> ${escapeHtml(amount)}</p>
    <p>Our team will review your inquiry and contact you shortly.</p>
    <p>Regards,<br>PY Capital<br>+254 799 357 038<br>Nairobi, Kenya</p>
  `

  const adminHtml = `
    <h2>New Investment Inquiry</h2>
    <p><strong>Investment:</strong> ${escapeHtml(data.investmentTitle)}</p>
    <p><strong>Investor:</strong> ${escapeHtml(data.investorName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.investorEmail)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.investorPhone)}</p>
    <p><strong>Amount interested in:</strong> ${escapeHtml(amount)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message || 'No message provided.')}</p>
    <p><strong>Inquiry ID:</strong> ${escapeHtml(data.inquiryId)}</p>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [data.investorEmail],
      subject: `Investment Inquiry Received — ${data.investmentTitle}`,
      html: investorHtml,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Investor confirmation email failed: ${errorText}`)
  }

  const adminResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [adminEmail],
      reply_to: data.investorEmail,
      subject: `New Investment Inquiry — ${data.investmentTitle}`,
      html: adminHtml,
    }),
  })

  if (!adminResponse.ok) {
    const errorText = await adminResponse.text()
    throw new Error(`Admin notification email failed: ${errorText}`)
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
