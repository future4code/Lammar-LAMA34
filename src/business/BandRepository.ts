import { Band } from "../model/Band";

export interface BandRepository {
    insertBand(band: Band): Promise<void>
    findBandById(id: string): Promise<Band | undefined>
    getBands(): Promise<Band[] | undefined>
}