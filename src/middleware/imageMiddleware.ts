import { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'
import { RequestWithMetadata } from '../types/express'
import ImageHandler from '../services/imageService'
import { FormatEnum } from 'sharp'

export async function processImg(req: RequestWithMetadata, res: Response, next: NextFunction): Promise<void> {
	try {
		const { filename, width, height, blur, sharpen, format } = req.query
		let imgBuffer = fs.readFileSync(`./src/assets/images/${filename}`)

		if (width && height) imgBuffer = await ImageHandler.resize(imgBuffer, Number(width), Number(height))
		if (blur) imgBuffer = await ImageHandler.blur(imgBuffer)
		if (sharpen) imgBuffer = await ImageHandler.sharpen(imgBuffer)
		if (format) imgBuffer = await ImageHandler.toFormat(imgBuffer, format as keyof FormatEnum)

		req.imgBuffer = imgBuffer
		next()
	} catch (err) {
		if (err instanceof Error) next(err.message)
		else next('error, something went wrong')
	}
}

export function getImgMetaData(
	path: string,
): (req: RequestWithMetadata, res: Response, next: NextFunction) => Promise<void> {
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

export function fileExist(
	filepath: string,
	fileType: string[],
): (req: Request, res: Response, next: NextFunction) => void {
	return (req: Request, res: Response, next: NextFunction) => {
		const { filename } = req.query
		let exist = false
		for (const type of fileType) {
			if (fs.existsSync(filepath + filename + type)) {
				req.query.filename += type
				exist = true
				break
			}
		}
		if (!exist) {
			next('Sorry, File not found')
			return
		}
		next()
	}
}

export function checkProcessedImg(req: Request, res: Response, next: NextFunction): void {
	const { filename, width, height, format } = req.query
	if (fs.existsSync(`./src/assets/thumb/${width}x${height}/${filename?.toString().split('.')[0]}.${format ?? 'jpg'}`)) {
		res.sendFile(
			path.join(
				__dirname,
				`../assets/thumb/${width}x${height}/${filename?.toString().split('.')[0]}.${format ?? 'jpg'}`,
			),
		)
		return
	}

	next()
}

export function makeDir(req: Request, res: Response, next: NextFunction): void {
	const { width, height } = req.query
	const directory = `./src/assets/thumb/${width}x${height}`
	fs.existsSync(directory) || fs.mkdirSync(directory, { recursive: true })
	next()
}

export function checkQuery(fileFormat: string[]): (req: Request, res: Response, next: NextFunction) => void {
	return (req: Request, res: Response, next: NextFunction) => {
		if (Object.keys(req.query).length < 3) {
			res.sendFile(path.join(__dirname, `../assets/images/${req.query.filename}`))
			return
		}
		if (req.query.format && !fileFormat.includes(`.${req.query?.format}`)) {
			next('Unsupported format')
			return
		}
		next()
	}
}
