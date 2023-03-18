import { User } from "../model/User";

export interface UserRepository {
    insertUser(user: User): Promise<void>
    findUserByEmail(email: string): Promise<User | undefined>
}