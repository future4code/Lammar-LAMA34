import { ShowRepository } from "../../src/business/ShowRepository";
import { Show } from "../../src/model/Show";
import { showMock } from "./ShowMock";

export class ShowDatabaseMock implements ShowRepository {
  public async insertShow(show: Show): Promise<void> { }

  public async findShows(weekDay: string): Promise<Show[] | undefined> {
    return weekDay === "friday" ? [showMock] : undefined
  }

}