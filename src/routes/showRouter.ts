import express from 'express'
import { ShowBusiness } from '../business/ShowBusiness'
import { ShowController } from '../controller/ShowController'
import { BandDatabase } from '../data/BandDatabase'
import { ShowDatabase } from '../data/ShowDatabase'
import { Authenticator } from '../services/Authenticator'
import { IdGenerator } from '../services/IdGenerator'

export const showRouter = express.Router()

const bandDatabase = new BandDatabase()
const showDatabase = new ShowDatabase()
const showBusiness = new ShowBusiness(showDatabase, bandDatabase, new IdGenerator(), new Authenticator())
const showController = new ShowController(showBusiness)

showRouter.post("/create", (req, res) => showController.createShow(req, res))

showRouter.get("/:weekDay", (req, res) => showController.getShowsByDate(req, res))