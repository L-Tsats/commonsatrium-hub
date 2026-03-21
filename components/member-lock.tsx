type MemberLockProps = {
  title: string
  message?: string
}

export function MemberLock({
  title,
  message = 'Start or resume your membership to access this area.',
}: MemberLockProps) {
  return (
    <main>
      <h1>{title}</h1>
      <p>🔒 This area is locked</p>
      <p>{message}</p>
    </main>
  )
}