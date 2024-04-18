export type User = {
  email?: string
  name?: string
  username?: string
  token?: string
}

export type UserProviderProps = {
  user: User
  children: React.ReactNode
}

export type ContextProps = {
  load: () => Promise<User>
  save: (user: User) => void
  unload: () => void
  data: User
}
