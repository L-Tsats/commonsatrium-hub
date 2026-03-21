import { prisma } from '@/lib/prisma'
import { getCurrentSessionUser } from '@/lib/session'

export async function getCurrentUser() {
  const sessionUser = await getCurrentSessionUser()

  if (!sessionUser) {
    return null
  }

  const userId = parseInt(sessionUser.id, 10)

  if (isNaN(userId)) {
    return null
  }

  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      membership: true,
    },
  })
}

export async function requireCurrentUser() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}