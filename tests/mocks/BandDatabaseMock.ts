import { BandRepository } from "../../src/business/BandRepository";
import { Band } from "../../src/model/Band";
import { bandMock } from "./BandMock";

export class BandDatabaseMock implements BandRepository {
  public async insertBand(band: Band): Promise<void> { }

  public async findBandById(id: string): Promise<Band | undefined> {
    return id === "id" ? bandMock : undefined
  }

  public async getBands(): Promise<Band[] | undefined> {
    return [bandMock]
  }

}