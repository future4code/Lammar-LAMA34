import { CustomError } from "../error/CustomError"
import { BandNotFound } from "../error/BandErros"
import { ShowDatabase } from "../data/ShowDatabase"
import { Show, ShowInputDTO, ShowOutputDTO } from "../model/Show"
import { InvalidDay, NotInteger, ShowNotFound, UnavailableTime, InvalidTime } from "../error/ShowErros"
import { BandDatabase } from "../data/BandDatabase"
import { IAuthenticator, IIdGenerator } from "./ports"

export class ShowBusiness {

  constructor(
    private showDatabase: ShowDatabase,
    private bandDatabase: BandDatabase,
    private idGenerator: IIdGenerator,
    private authenticator: IAuthenticator
  ) { }

  async createShow(input: ShowInputDTO): Promise<void> {
    try {
      const { weekDay, startTime, endTime, bandId, token } = input

      if (!weekDay || !startTime || !endTime || !bandId || !token) {
        throw new CustomError(422, "weekDay, startTime, endTime, bandId and token must be provided.")
      }

      if (weekDay.toLowerCase() !== "friday" && weekDay.toLowerCase() !== "saturday" && weekDay.toLowerCase() !== "sunday") {
        throw new InvalidDay()
      }

      if (!Number.isInteger(startTime) || !Number.isInteger(endTime)) {
        throw new NotInteger()
      }

      if ((startTime < 8 || endTime > 23) || endTime < 8 || startTime > 23 || startTime > endTime) {
        throw new InvalidTime()
      }

      const band = await this.bandDatabase.findBandById(bandId)

      if (!band) {
        throw new BandNotFound()
      }

      const dayShows = await this.showDatabase.findShows(weekDay)

      if (dayShows) {
        for (let show of dayShows) {
          if (
            (startTime >= show.getStartTime() && endTime <= show.getEndTime()) ||
            (endTime > show.getStartTime() && startTime < show.getEndTime())
          ) {
            throw new UnavailableTime()
          }
        }
      }

      this.authenticator.getTokenData(token)

      const id = this.idGenerator.generate()

      const show = new Show(
        id,
        weekDay,
        startTime,
        endTime,
        bandId
      )

      await this.showDatabase.insertShow(show)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async getShowsByDate(weekDay: string, token: string): Promise<ShowOutputDTO[]> {
    try {
      if (!weekDay || !token) {
        throw new CustomError(422, "weekDay and token must be provided.")
      }

      if (weekDay.toLowerCase() !== "friday" && weekDay.toLowerCase() !== "saturday" && weekDay.toLowerCase() !== "sunday") {
        throw new InvalidDay()
      }

      this.authenticator.getTokenData(token)

      const dayShows = await this.showDatabase.findShows(weekDay)

      if (!dayShows) {
        throw new ShowNotFound()
      }

      let showsArray: ShowOutputDTO[] = []
      for (let show of dayShows) {
        const bandId = show.getBandId()
        const band = await this.bandDatabase.findBandById(bandId)
        showsArray.push({ startTime: show.getStartTime(), endTime: show.getEndTime(), name: band?.getName(), musicGenre: band?.getMusicGenre() })
      }

      const orderedShows = showsArray.sort((a, b) =>
        (a.startTime < b.startTime) ? -1 : ((b.startTime < a.startTime) ? 1 : 0)
      )

      return orderedShows
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }
}
