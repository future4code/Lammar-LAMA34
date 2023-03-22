import { BandRepository } from "../business/BandRepository";
import { CustomError } from "../error/CustomError";
import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase implements BandRepository {
  private static TABLE_NAME = "lama_bands";

  async insertBand(band: Band): Promise<void> {
    try {
      await BandDatabase.connection
        .insert({
          id: band.getId(),
          name: band.getName(),
          music_genre: band.getMusicGenre(),
          responsible: band.getResponsible()
        })
        .into(BandDatabase.TABLE_NAME)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async findBandById(id: string): Promise<Band | undefined> {
    try {
      const result = await BandDatabase.connection(BandDatabase.TABLE_NAME)
        .select().where({ id })

      if (result.length !== 0) {
        return Band.toBandModel(result[0])
      } else {
        return undefined
      }
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getBands(): Promise<Band[] | undefined> {
    try {
      const result = await BandDatabase.connection(BandDatabase.TABLE_NAME)
        .select()

      if (result.length !== 0) {
        let bandsArray: Band[] = []
        for (let band of result) {
          const instantiatedShow = Band.toBandModel(band)
          bandsArray.push(instantiatedShow)
        }
        return bandsArray
      } else {
        return undefined
      }
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

}
