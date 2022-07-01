import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'

export const filePath = (filePath: string) => path.join(__dirname, filePath)

export default class FileHandler {
	public static async readFile(path: string): Promise<Buffer> {
		return await fs.readFile(filePath(path))
	}
	static async writeFile(path: string, data: Buffer): Promise<void> {
		return await fs.writeFile(path, data)
	}
	static async deleteFile(path: string): Promise<void> {
		return await fs.unlink(path)
	}
	static async fileExist(path: string): Promise<boolean> {
		return await fsSync.existsSync(path)
	}
}
