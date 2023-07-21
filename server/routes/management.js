import express from 'express'
import { getAdmins, getUserPerformence } from '../controllers/management.js'

const router = express.Router()

router.get('/admins', getAdmins)
router.get('/performence/:id', getUserPerformence)

export default router
