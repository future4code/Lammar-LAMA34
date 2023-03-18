import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {

  constructor(private bandBusiness: BandBusiness) { }

  async createBand(req: Request, res: Response): Promise<void> {
    try {
      const input: BandInputDTO = {
        name: req.body.name,
        musicGenre: req.body.musicGenre,
        responsible: req.body.responsible,
        token: req.headers.authorization as string
      }

      await this.bandBusiness.createBand(input)

      res.status(201).send({ message: "Band successfully created." })
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async getBandById(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string
      const id = req.params.id
      
      const band = await this.bandBusiness.getBandById(token, id)

      res.status(200).send(band)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async getBands(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string

      const bands = await this.bandBusiness.getBands(token)

      res.status(200).send(bands)
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }


}
