import { CustomError } from "./CustomError";

export class InvalidMusicGenre extends CustomError {
    constructor(){
        super(422, "The musicGenre must have at least 3 characters.")
    }
}

export class InvalidBandName extends CustomError {
    constructor(){
        super(422, "The band name must have at least 3 characters.")
    }
}

export class BandNotFound extends CustomError{ 
    constructor(){
        super(404, "Band not found.")
    }
}
