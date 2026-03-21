import { getCurrentUser } from '@/lib/current-user'

export async function getCurrentMembershipState() {
  const user = await getCurrentUser()

  const membershipStatus = user?.membership?.status ?? 'inactive'
  const isActiveMember = membershipStatus === 'active'

  return {
    user,
    membershipStatus,
    isActiveMember,
  }
}