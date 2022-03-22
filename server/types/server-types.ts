export type UserType = {
  email: string
  password: string
  userId?: number
}

export type UsersDatabaseType = {
  users: Array<UserType>
}

export type JsonResType = {
  message: string | NodeJS.ErrnoException
  status: number
}

export type UserIdType = number | undefined
