import { UserBusiness } from "../../src/business/UserBusiness";
import { LoginInputDTO, UserInputDTO, UserRole } from "../../src/model/User"
import { CustomError } from "../../src/error/CustomError";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";

const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
)


describe("Signup Tests", () => {
    test("Test 1: Error that should return when name is empty", async () => {
        expect.assertions(3)
        try {
            const input: UserInputDTO = {
                name: "",
                email: "email@email",
                password: "123456",
                role: UserRole.ADMIN
            }
            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("name, email, password and role must be provided.")
        }
    })

    test("Test 2: Error that should return when email is invalid", async () => {
        expect.assertions(3)
        try {
            const input: UserInputDTO = {
                name: "Test",
                email: "notEmail",
                password: "123456",
                role: UserRole.ADMIN
            }
            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Invalid email.")
        }
    })

    test("Test 3: Error that should return when password is invalid", async () => {
        expect.assertions(3)
        try {
            const input: UserInputDTO = {
                name: "Test",
                email: "email@email",
                password: "123",
                role: UserRole.ADMIN
            }
            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Invalid password.")
        }
    })

    test("Test 4: Error that should return when user role is invalid", async () => {
        expect.assertions(3)
        try {
            const input: UserInputDTO = {
                name: "Test",
                email: "email@email",
                password: "123456",
                role: ""
            }
            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("name, email, password and role must be provided.")
        }
    })

    test("Test 5: Successful registration and access token verification", async () => {
        expect.assertions(2)
        try {
            const input: UserInputDTO = {
                name: "Test",
                email: "email@email",
                password: "123456",
                role: UserRole.ADMIN
            }
            const result = await userBusiness.signup(input)
            expect(result).toBeDefined()
            expect(result).toEqual("token")
        } catch (error: any) {
            console.log(error.message)
        }

    })

})

describe("Login Tests", () => {
    test("Test 1: Error that should return when the provided email does not exist", async () => {
        expect.assertions(3)
        try {
            const input: LoginInputDTO = {
                email: "notEmail",
                password: "123456"
            }
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("User not found.")
        }
    })

    test("Test 2: Error that should return when the password is wrong", async () => {
        expect.assertions(3)
        try {
            const input: LoginInputDTO = {
                email: "email@email",
                password: "123"
            }
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Wrong password.")
        }
    })

    test("Test 3: Login success and access token verification", async () => {
        expect.assertions(2)
        try {
            const input: LoginInputDTO = {
                email: "email@email",
                password: "123456"
            }
            const result = await userBusiness.login(input)
            expect(result).toBeDefined()
            expect(result).toEqual("token")
        } catch (error: any) {
            console.log(error.message)
        }
    })

})