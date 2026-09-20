import { getAdminSession } from '@/lib/auth'

export async function requireAdmin() {
  return await getAdminSession()
}
