import express, { Application } from 'express'
import imageRouter from './routes/imageRoute'
const app: Application = express()

/* ROUTES */
app.use('/images', imageRouter)
/* LISTENING */
const PORT = 4000
app.listen(PORT, (): void => console.log(`running on port ${PORT}`))

process.on('unhandledRejection', (err) => {
	console.error('Error:\n', err)
	process.exit(1)
})
export default app
