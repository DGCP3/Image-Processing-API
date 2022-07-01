import { Response } from 'express'
import ImageHandler from '../services/image'
import { RequestWithMetadata } from '../types/express'

export const serveImg = (path: string) => async (req: RequestWithMetadata, res: Response) => {
	const { filename, width, height, format } = req.query
	const { imgBuffer } = req
	res.writeHead(200, { 'Content-Type': `image/${format ?? 'jpeg'}` })
	res.end(imgBuffer)
	await ImageHandler.toFile(
		imgBuffer as Buffer,
		`${path}${width}x${height}/${filename?.toString().split('.')[0]}.${format ?? 'jpg'}`,
	)
}
