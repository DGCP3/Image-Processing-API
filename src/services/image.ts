import sharp, { FormatEnum } from 'sharp'

export default class ImageHandler {
	static async resize(file: Buffer, width: number, height: number) {
		return await sharp(file)
			.resize(width as number, height as number)
			.toBuffer()
	}
	static async rotate(file: Buffer, angle: number | undefined) {
		return await sharp(file).rotate(angle).toBuffer()
	}
	static async flip(file: Buffer, direction: boolean | undefined) {
		return await sharp(file).flip(direction).toBuffer()
	}
	static async toFile<T extends keyof FormatEnum>(buffer: Buffer, filePath: string, format: T = 'jpeg' as T) {
		return await sharp(buffer).toFormat(format, { lossless: true }).toFile(filePath)
	}
	static async blur(file: Buffer, sigma?: number) {
		return await sharp(file).blur(sigma).toBuffer()
	}
	static async sharpen(file: Buffer, sigma?: number) {
		return await sharp(file).sharpen(sigma).toBuffer()
	}
	static async metadata(file: string) {
		return await sharp(file).metadata()
	}
}
