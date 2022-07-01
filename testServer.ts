import express, { Application } from 'express'
import imageRouter from './src/routes/imageRoute'

const testApp: Application = express()

testApp.use('/images', imageRouter)

export default testApp
