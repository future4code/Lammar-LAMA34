import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowInputDTO } from "../model/Show";

export class ShowController {

  constructor(private showBusiness: ShowBusiness) { }

  async createShow(req: Request, res: Response): Promise<void> {
    try {
      const input: ShowInputDTO = {
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        bandId: req.body.bandId,
        token: req.headers.authorization as string
      }

      await this.showBusiness.createShow(input)

      res.status(201).send({ message: "Show successfully created." })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async getShowsByDate(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const weekDay = req.params.weekDay

      const shows = await this.showBusiness.getShowsByDate(weekDay, token)

      res.status(200).send({ shows })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }


}
