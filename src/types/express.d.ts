import { Request } from 'express'

interface RequestWithMetadata extends Request {
	metadata?: sharp.Metadata
	imgBuffer?: Buffer
}
