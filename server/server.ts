import fs from 'fs'
import bodyParser from 'body-parser'
import jsonServer from 'json-server'

import { createToken, verifyToken } from './utils/token'
import { isAuthenticated } from './utils/auth'

import type {
  UserType,
  UsersDatabaseType,
  JsonResType,
  UserIdType,
} from './types/server-types'

const server = jsonServer.create()
const router = jsonServer.router('./database/database.json')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

server.post('/auth/register', (req, res) => {
  const { email, password }: UserType = req.body

  if (isAuthenticated({ email, password })) {
    const resOptions: JsonResType = {
      status: 401,
      message: 'Электронная почта и пароль уже существуют',
    }

    return res.status(resOptions.status).json(resOptions)
  }

  fs.readFile('./database/users.json', (err, data) => {
    if (err) {
      const resOptions: JsonResType = {
        status: 401,
        message: err,
      }

      return res.status(resOptions.status).json(resOptions)
    }

    let usersData: UsersDatabaseType = JSON.parse(data.toString())
    let lastUserId: UserIdType =
      usersData.users[usersData.users.length - 1].userId

    usersData.users.push({
      userId: lastUserId && lastUserId + 1,
      email: email,
      password: password,
    })
  })

  const access_token: string = createToken({ email, password })

  res.status(201).json({ access_token })
})

server.post('/auth/login', (req, res) => {
  const { email, password }: UserType = req.body

  if (isAuthenticated({ email, password }) === false) {
    const resOptions: JsonResType = {
      status: 401,
      message: 'Неправильная электронная почта или пароль',
    }

    res.status(resOptions.status).json(resOptions)
    return
  }

  const access_token: string = createToken({ email, password })

  res.status(200).json({ access_token })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const resOptions: JsonResType = {
      status: 401,
      message: 'Ошибка в формате авторизации',
    }

    return res.status(resOptions.status).json(resOptions)
  }
  try {
    let verifyTokenResult: any
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1])

    if (verifyTokenResult instanceof Error) {
      const resOptions: JsonResType = {
        status: 401,
        message: 'Токен доступа не правильный',
      }

      return res.status(resOptions.status).json(resOptions)
    }
    next()
  } catch (err) {
    const resOptions: JsonResType = {
      status: 401,
      message: 'Ошибка, токен отозван',
    }

    res.status(resOptions.status).json(resOptions)
  }
})

server.use(router)

server.listen(8000, () => {
  console.log('Вы запустили сервер!')
})
