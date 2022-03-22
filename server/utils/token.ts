import jwt from 'jsonwebtoken'

import type { UserType } from '../types/server-types'

import { SECRET_KEY, expiresIn } from '../constants/index'

export const createToken = (payload: UserType): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

export const verifyToken = (token: string): void => {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err,
  )
}
