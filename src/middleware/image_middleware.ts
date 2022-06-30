import { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'
import { RequestWithMetadata } from '../types/express'
import ImageHandler from '../services/image'
import { FormatEnum } from 'sharp'

export async function processImg(req: RequestWithMetadata, res: Response, next: NextFunction) {
	const { filename, width, height, blur, sharpen, format } = req.query
	let imgBuffer = fs.readFileSync(`./src/assets/images/${filename}`)

	if (width && height) imgBuffer = await ImageHandler.resize(imgBuffer, Number(width), Number(height))
	// other image processing
	if (blur) imgBuffer = await ImageHandler.blur(imgBuffer)
	if (sharpen) imgBuffer = await ImageHandler.sharpen(imgBuffer)
	if (format)
		await ImageHandler.toFile(
			imgBuffer,
			`./src/assets/thumb/${width}x${height}/${filename}`,
			format as keyof FormatEnum,
		)

	req.imgBuffer = imgBuffer
	next()
}

export function getImgMetaData(path: string) {
	return async (req: RequestWithMetadata, res: Response, next: NextFunction) => {
		const { filename, width, height } = req.query
		const filePath = `${path}${width}x${height}/${filename}`
		if (fs.existsSync(filePath)) {
			const metadata = await ImageHandler.metadata(filePath)
			req.metadata = metadata
		}
		next()
	}
}

export function fileExist(filepath: string, fileType: string[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { filename } = req.query
		let exist: boolean = false
		for (const type of fileType) {
			if (fs.existsSync(filepath + filename + type)) {
				req.query.filename += type
				exist = true
				break
			}
		}
		if (!exist) {
			res.send('Sorry, File not found')
			return
		}
		next()
	}
}

export function checkProcessedImg(req: Request, res: Response, next: NextFunction) {
	const { filename, width, height } = req.query
	if (fs.existsSync(`./src/assets/thumb/${width}x${height}/${filename}`)) {
		res.sendFile(path.join(__dirname, `../assets/thumb/${width}x${height}/${filename}`))
		return
	}
	next()
}

export function makeDir(req: Request, res: Response, next: NextFunction) {
	const { width, height } = req.query
	const directory = `./src/assets/thumb/${width}x${height}`
	fs.existsSync(directory) || fs.mkdirSync(directory, { recursive: true })
	next()
}

export function noQuery(req: Request, res: Response, next: NextFunction) {
	if (Object.keys(req.query).length < 3) {
		res.sendFile(path.join(__dirname, `../assets/images/${req.query.filename}`))
		return
	}
	next()
}
