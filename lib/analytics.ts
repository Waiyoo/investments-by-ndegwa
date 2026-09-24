import crypto from 'crypto'
import { headers } from 'next/headers'

export async function trackinvestmentEvent(
  investmentId: string,
  eventType: 'VIEW' | 'CONTACT_CLICK' | 'MEDIA_INTERACTION',
  weight = 1.0
) {
  try {
    const headerList = headers()

    const ip =
      headerList.get('x-forwarded-for') || 'unknown'

    const userAgent =
      headerList.get('user-agent') || 'unknown'

    const ipHash = crypto
      .createHmac(
        'sha256',
        process.env.IP_HASH_SECRET || 'py-capital-salt'
      )
      .update(ip)
      .digest('hex')

    /*
     * Analytics storage is currently disabled because the active
     * Prisma schema does not contain an analytics/metric model.
     *
     * Keep collecting the request information here so this helper
     * remains compatible with existing callers. A database-backed
     * analytics model can be added later without changing callers.
     */
    console.info('Investment analytics event', {
      investmentId,
      eventType,
      weight,
      ipHash,
      userAgent: userAgent.substring(0, 150),
    })
  } catch (err) {
    console.error(
      'Non-blocking analytics tracking error:',
      err
    )
  }
}
