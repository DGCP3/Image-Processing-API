import { Router } from 'express'
import { serveImg } from '../controllers/imageController'
import { fileExist, getImgMetaData, checkProcessedImg, processImg, makeDir } from '../middleware/image_middleware'

const router = Router()
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
router.get(
	'/',
	fileExist('./src/assets/images/', imageTypes),
	makeDir,
	getImgMetaData('./src/assets/thumb/'),
	checkProcessedImg,
	processImg,
	serveImg,
)

export default router
