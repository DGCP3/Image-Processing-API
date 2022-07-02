import { NextFunction, Response } from 'express'
import { processImg } from '../src/middleware'
import { RequestWithMetadata } from '../src/types/express'

describe('processImg', () => {
	let res: Response
	const nextFunction: NextFunction = jest.fn()

	it('should attach a buffer to req object', async () => {
		const req = {
			query: {
				filename: 'img2.jpg',
				width: '100',
				height: '100',
				format: 'png',
			},
		} as unknown as RequestWithMetadata
		await processImg(req, res, nextFunction)
		expect(req.imgBuffer).toBeInstanceOf(Buffer)
		expect(nextFunction).toHaveBeenCalled()
	})

	it('should be undefined', async () => {
		const req = {
			query: {
				filename: 'test.jpg',
				width: '100',
				height: '100',
				format: 'png',
			},
		} as unknown as RequestWithMetadata
		expect(await processImg(req, res, nextFunction)).toBeUndefined()
		expect(nextFunction).toHaveBeenCalled()
	})
})
