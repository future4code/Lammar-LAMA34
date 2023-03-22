import { UserRepository } from "../business/UserRepository";
import { CustomError } from "../error/CustomError";
import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements UserRepository {
  private static TABLE_NAME = "lama_users";

  async insertUser(user: User): Promise<void> {
    try {
      await UserDatabase.connection
        .insert(user)
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select().where({ email })

      if (result.length !== 0) {
        return User.toUserModel(result[0])
      } else {
        return undefined
      }
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}