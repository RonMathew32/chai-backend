import express from 'express'
import cors from 'cors'

const app = express()
const limit = '16kb'

app.use(cors())
app.use(express.json({limit: limit}))
app.use(express.urlencoded({extended: true, limit: limit}))
app.use(express.static('public'))

export {app}