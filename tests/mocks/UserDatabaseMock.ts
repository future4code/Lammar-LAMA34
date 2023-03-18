import { UserRepository } from "../../src/business/UserRepository";
import { User } from "../../src/model/User";
import { userMock } from "../mocks/UserMock";

export class UserDatabaseMock implements UserRepository {
  public async insertUser(user: User): Promise<void> { }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return email === "email@email" ? userMock : undefined
  }

}