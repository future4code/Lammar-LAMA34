import { Show } from "../model/Show"

export interface ShowRepository {
    insertShow(show: Show): Promise<void>
    findShows(weekDay: string): Promise<Show[] | undefined>
}