import fs from 'fs'

import type { UserType, UsersDatabaseType } from '../types/server-types'

const users: UsersDatabaseType = JSON.parse(
  fs.readFileSync('./database/users.json', 'utf8'),
)

export const isAuthenticated = ({ email, password }: UserType): boolean => {
  return (
    users.users.findIndex(
      (user: UserType) => user.email === email && user.password === password,
    ) !== -1
  )
}
