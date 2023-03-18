import { ShowRepository } from "../business/ShowRepository";
import { CustomError } from "../error/CustomError";
import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase implements ShowRepository {
  private static TABLE_NAME = "lama_shows";

  async insertShow(show: Show): Promise<void> {
    try {
      await ShowDatabase.connection
        .insert({
          id: show.getId(),
          week_day: show.getWeekDay(),
          start_time: show.getStartTime(),
          end_time: show.getEndTime(),
          band_id: show.getBandId()
        })
        .into(ShowDatabase.TABLE_NAME)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async findShows(weekDay: string): Promise<Show[] | undefined> {
    try {
      const result = await ShowDatabase.connection(ShowDatabase.TABLE_NAME)
        .select().where({ week_day: weekDay })

      if (result.length !== 0) {
        let showsArray: Show[] = []
        for (let show of result) {
          const instantiatedShow = Show.toShowModel(show)
          showsArray.push(instantiatedShow)
        }
        return showsArray
      } else {
        return undefined
      }
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

}
