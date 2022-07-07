import request from 'supertest'
import testApp from '../testServer'
describe('Image route', () => {
	it('should return a 200 status code if file exist', async () => {
		await request(testApp)
			.get('/images')
			.query({
				filename: 'img1',
				width: '300',
				height: '300',
			})
			.expect('Content-Type', /jpeg/)
			.expect(200)
	})
	it('should return a 404 status code if image does not exist', async () => {
		await request(testApp)
			.get('/images')
			.query({
				filename: 'test',
				width: '300',
				height: '300',
			})
			.expect(404)
	})
	it('should return a correct Content type header', async () => {
		//jepg is the default format
		await request(testApp)
			.get('/images')
			.query({
				filename: 'img1',
				width: '300',
				height: '300',
			})
			.expect(200)
			.expect('Content-Type', /jpeg/)
		//png is the format passed in the query
		await request(testApp)
			.get('/images')
			.query({
				filename: 'img1',
				width: '300',
				height: '300',
				format: 'png',
			})
			.expect(200)
			.expect('Content-Type', /png/)
	})
	it('should return 400 if format is unsupported', async () => {
		await request(testApp)
			.get('/images')
			.query({
				filename: 'img1',
				width: '300',
				height: '300',
				format: 'test',
			})
			.expect(500)
			.expect((res) => expect(res.text).toMatch(/Unsupported format/g))
	})
	it('should return default picture if no other params are provided', async () => {
		await request(testApp)
			.get('/images')
			.query({
				filename: 'img1',
			})
			.expect('Content-Type', /jpeg/)
			.expect(200)
	})
})
