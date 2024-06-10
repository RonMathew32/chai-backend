import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'

const app = express()
const limit = '16kb'
const apiVersion = '/api/v1'

app.use(cors())
app.use(express.json({limit: limit}))
app.use(express.urlencoded({extended: true, limit: limit}))
app.use(express.static('public'))

app.use(`${apiVersion}/users`, userRouter)

export {app}