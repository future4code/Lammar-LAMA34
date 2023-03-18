import { CustomError } from "../../src/error/CustomError";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import { BandBusiness } from "../../src/business/BandBusiness";
import { BandDatabaseMock } from "../mocks/BandDatabaseMock";
import { BandInputDTO } from "../../src/model/Band";

const bandBusiness = new BandBusiness(
    new BandDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
)


describe("createBand Tests", () => {
    test("Test 1: Error that should return when name is empty", async () => {
        expect.assertions(3)
        try {
            const input: BandInputDTO = {
                name: "",
                musicGenre: "genre",
                responsible: "responsible",
                token: "token"
            }
            await bandBusiness.createBand(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("name, musicGenre, responsible and token must be provided.")
        }
    })

    test("Test 2: Successful registration", async () => {
        expect.assertions(1)
        try {
            const input: BandInputDTO = {
                name: "band",
                musicGenre: "genre",
                responsible: "responsible",
                token: "token"
            }

            const createBand = jest.fn(
                (input: BandInputDTO) => bandBusiness.createBand(input)
            )

            await createBand(input)

            expect(createBand).toHaveBeenCalledWith(input)
        } catch (error: any) {
            console.log(error.message)
        }
    })

})

describe("getBandById Tests", () => {
    test("Test 1: Error that should return when token is empty", async () => {
        expect.assertions(3)
        try {
            const token = ""
            const id = "id"

            await bandBusiness.getBandById(token, id)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("id and token must be provided.")
        }
    })

    test("Test 2: Band information succesfully returned", async () => {
        expect.assertions(2)
        try {
            const token = "token"
            const id = "id"

            const getBandById = jest.fn(
                (token: string, id: string) => bandBusiness.getBandById(token, id)
            )

            const result = await getBandById(token, id)

            expect(getBandById).toHaveBeenCalledWith("token", "id")
            expect(result).toEqual({
                id: "id",
                name: "band",
                musicGenre: "genre",
                responsible: "responsible",
            })
        } catch (error: any) {
            console.log(error.message)
        }
    })

})


describe("getBands Tests", () => {
    test("Test 1: Error that should return when token is empty", async () => {
        expect.assertions(3)
        try {
            const token = ""

            await bandBusiness.getBands(token)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token must be provided.")
        }
    })

    test("Test 2: Bands information succesfully returned", async () => {
        expect.assertions(2)
        try {
            const token = "token"

            const getBands = jest.fn(
                (token: string) => bandBusiness.getBands(token)
            )

            const result = await getBands(token)

            expect(getBands).toHaveBeenCalledWith("token")
            expect(result).toEqual([{
                id: "id",
                name: "band",
                musicGenre: "genre",
                responsible: "responsible",
            }])
        } catch (error: any) {
            console.log(error.message)
        }
    })

})