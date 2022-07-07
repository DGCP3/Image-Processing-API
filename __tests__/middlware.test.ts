import { NextFunction, Response } from 'express'
import { checkQuery, fileExist, processImg } from '../src/middleware'
import { RequestWithMetadata } from '../src/types/express'

const fileType = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
let req = {} as unknown as RequestWithMetadata
const res = {} as Response
res.sendFile = jest.fn()
const nextFunction: NextFunction = jest.fn()
afterEach(() => {
	jest.clearAllMocks()
})
beforeEach(() => {
	req = {
		query: {
			filename: 'img1',
			width: '300',
			height: '300',
		},
	} as unknown as RequestWithMetadata
})

describe('processImg middleware', () => {
	it('should buffer exist to req object', async () => {
		req.query.filename = 'img1.jpg'
		await processImg(req, res, nextFunction)
		expect(req.imgBuffer).toBeInstanceOf(Buffer)
		expect(nextFunction).toHaveBeenCalled()
	})
	it('should check and return processed image', async () => {
		req.query.format = 'png'
		await processImg(req, res, nextFunction)
		expect(nextFunction).toHaveBeenCalled()
	})
	it('should throw if it cant read image', async () => {
		const req = {
			query: {
				filename: 'test.jpg',
				width: '100',
				height: '100',
				format: 'png',
			},
		} as unknown as RequestWithMetadata
		await processImg(req, res, nextFunction)
		expect(nextFunction).toHaveBeenCalledWith('error, something went wrong')
	})
})

describe('checkQuery middleware', () => {
	it('should throw error if unsupported format is passed', () => {
		const req = {
			query: {
				filename: 'img1.jpg',
				width: '100',
				height: '100',
				format: 'unsupported format',
			},
		} as unknown as RequestWithMetadata
		checkQuery(fileType)(req, res, nextFunction)
		expect(nextFunction).toBeCalledWith('Unsupported format')
	})
	it('should return image if processed image already exists', async () => {
		const req = {
			query: {
				filename: 'img1.jpg',
			},
		} as unknown as RequestWithMetadata

		await checkQuery(fileType)(req, res, nextFunction)
		expect(res.sendFile).toBeCalled()
		expect(nextFunction).not.toHaveBeenCalled()
	})
})
describe('fileExist middleware', () => {
	it('should return error message if image is not found', async () => {
		req.query.filename = 'test'
		await fileExist('./src/assets/images/', fileType)(req, res, nextFunction)
		expect(nextFunction).toHaveBeenCalledWith('Sorry, File not found')
	})
	it('should attach correct file extension if file exist', async () => {
		await fileExist('./src/assets/images/', fileType)(req, res, nextFunction)
		expect(req.query.filename).toBe('img1.jpg')
		expect(nextFunction).toHaveBeenCalled()
	})
})
