import { Router } from 'express'
import { serveImg } from '../controllers/imageController'
import { fileExist, getImgMetaData, checkProcessedImg, processImg, makeDir, checkQuery } from '../middleware'

const router = Router()
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
router.get(
	'/',
	fileExist('./src/assets/images/', imageTypes),
	checkQuery(imageTypes),
	makeDir,
	getImgMetaData('./src/assets/thumb/'),
	checkProcessedImg,
	processImg,
	serveImg('./src/assets/thumb/'),
)

export default router
