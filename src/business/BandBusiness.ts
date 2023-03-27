import { CustomError } from "../error/CustomError"
import { BandNotFound, InvalidBandName, InvalidMusicGenre } from "../error/BandErros"
import { Unauthorized } from "../error/UserErrors"
import { Band, BandInputDTO } from "../model/Band"
import { BandDatabase } from "../data/BandDatabase"
import { IAuthenticator, IIdGenerator } from "./ports"

export class BandBusiness {

  constructor(
    private bandDatabase: BandDatabase,
    private idGenerator: IIdGenerator,
    private authenticator: IAuthenticator
  ) { }

  async createBand(input: BandInputDTO): Promise<void> {
    try {
      const { name, musicGenre, responsible, token } = input

      if (!name || !musicGenre || !responsible || !token) {
        throw new CustomError(422, "name, musicGenre, responsible and token must be provided.")
      }

      if (name.length < 3) {
        throw new InvalidBandName()
      }

      if (musicGenre.length < 3) {
        throw new InvalidMusicGenre()
      }

      const userRole = this.authenticator.getTokenData(token).role

      if (userRole !== "ADMIN") {
        throw new Unauthorized()
      }

      const id = this.idGenerator.generate()

      const band = new Band(
        id,
        name,
        musicGenre,
        responsible
      )

      await this.bandDatabase.insertBand(band)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async getBandById(token: string, id: string): Promise<Band> {
    try {
      if (!id || !token) {
        throw new CustomError(422, "id and token must be provided.")
      }

      this.authenticator.getTokenData(token)

      const band = await this.bandDatabase.findBandById(id)

      if (!band) {
        throw new BandNotFound()
      }

      return band
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async getBands(token: string): Promise<Band[]> {
    try {
      if (!token) {
        throw new CustomError(422, "token must be provided.")
      }

      this.authenticator.getTokenData(token)

      const bands = await this.bandDatabase.getBands()

      if (!bands) {
        throw new BandNotFound()
      }

      return bands
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}
