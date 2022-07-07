import sharp, { FormatEnum } from 'sharp'

export default class ImageHandler {
	static async resize(file: Buffer, width: number, height: number): Promise<Buffer> {
		return await sharp(file).withMetadata().resize(width, height).toBuffer()
	}
	static async rotate(file: Buffer, angle: number | undefined): Promise<Buffer> {
		return await sharp(file).withMetadata().rotate(angle).toBuffer()
	}
	static async flip(file: Buffer, direction: boolean | undefined): Promise<Buffer> {
		return await sharp(file).withMetadata().flip(direction).toBuffer()
	}
	static async toFile(buffer: Buffer, filePath: string): Promise<sharp.OutputInfo> {
		return await sharp(buffer).withMetadata().toFile(filePath)
	}
	static async blur(file: Buffer, sigma?: number): Promise<Buffer> {
		return await sharp(file).blur(sigma).toBuffer()
	}
	static async sharpen(file: Buffer, sigma?: number): Promise<Buffer> {
		return await sharp(file).sharpen(sigma).toBuffer()
	}
	static async metadata(file: string): Promise<sharp.Metadata> {
		return await sharp(file).metadata()
	}
	static async toFormat(file: Buffer, format: keyof FormatEnum = 'jpeg'): Promise<Buffer> {
		return await sharp(file).toFormat(format).toBuffer()
	}
}
