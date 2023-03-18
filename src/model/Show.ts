export class Show {
    constructor(
        private id: string,
        private weekDay: string,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ) { }

    getId() {
        return this.id
    }

    getWeekDay() {
        return this.weekDay
    }

    getStartTime() {
        return this.startTime
    }

    getEndTime() {
        return this.endTime
    }

    getBandId() {
        return this.bandId
    }

    static toShowModel(show: any): Show {
        return new Show(show.id, show.week_day, show.start_time, show.end_time, show.band_id);
    }

}

export interface ShowInputDTO {
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string,
    token: string
}

export interface ShowOutputDTO {
    startTime: number,
    endTime: number,
    name?: string,
    musicGenre?: string
}
