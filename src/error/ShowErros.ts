import { CustomError } from "./CustomError";

export class ShowNotFound extends CustomError {
    constructor() {
        super(404, "No shows were found.")
    }
}

export class InvalidDay extends CustomError {
    constructor() {
        super(422, "Invalid weekDay. It must be 'friday', 'saturday' or 'sunday'.")
    }
}

export class NotInteger extends CustomError {
    constructor() {
        super(422, "startTime and endTime must be integers.")
    }
}

export class UnavailableTime extends CustomError {
    constructor() {
        super(422, "There's already a show at this time.")
    }
}

export class InvalidTime extends CustomError {
    constructor() {
        super(422, "The show time must be between 8 and 23.")
    }
}