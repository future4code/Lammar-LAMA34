import { CustomError } from "../error/CustomError"
import { InvalidEmail, InvalidPassword, InvalidUserName, UserNotFound, WrongPassword } from "../error/UserErrors"
import { UserRepository } from "./UserRepository"
import dotenv from 'dotenv'
import { LoginInputDTO, User, UserInputDTO } from "../model/User"
import { IAuthenticator, IHashManager, IIdGenerator } from "./ports"

dotenv.config()

export class UserBusiness {

  constructor(
    private userDatabase: UserRepository,
    private hashManager: IHashManager,
    private idGenerator: IIdGenerator,
    private authenticator: IAuthenticator
  ) { }

  async signup(input: UserInputDTO): Promise<string> {
    try {
      const { name, email, password, role } = input

      if (!email || !name || !password || !role) {
        throw new CustomError(422, "name, email, password and role must be provided.")
      }

      if (!email.includes("@")) {
        throw new InvalidEmail()
      }

      if (name.length < 3) {
        throw new InvalidUserName()
      }

      if (password.length < 6) {
        throw new InvalidPassword()
      }

      const id = this.idGenerator.generate()

      const hashPassword: string = await this.hashManager.generateHash(password)

      const user = new User(
        id,
        name,
        email,
        hashPassword,
        User.stringToUserRole(role.toUpperCase())
      )

      await this.userDatabase.insertUser(user)

      const token = this.authenticator.generateToken({ id: user.getId(), role: user.getRole() })

      return token
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async login(input: LoginInputDTO): Promise<string> {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError(400, "email and password must be provided."
        );
      }

      const user = await this.userDatabase.findUserByEmail(email)

      if (!user) {
        throw new UserNotFound()
      }

      const compareResult: boolean = await this.hashManager.compareHash(password, user.getPassword())

      if (!compareResult) {
        throw new WrongPassword()
      }

      const token = this.authenticator.generateToken({ id: user.getId(), role: user.getRole() })

      return token
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }


}
