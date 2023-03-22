import { CustomError } from "../../src/error/CustomError";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import { BandDatabaseMock } from "../mocks/BandDatabaseMock";
import { ShowBusiness } from "../../src/business/ShowBusiness";
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock";
import { ShowInputDTO } from "../../src/model/Show";

const showBusiness = new ShowBusiness(
    new ShowDatabaseMock(),
    new BandDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
)

describe("createShow Tests", () => {
    test("Test 1: Error that should return when weekDay is empty", async () => {
        expect.assertions(3)
        try {
            const input: ShowInputDTO = {
                weekDay: "",
                startTime: 8,
                endTime: 23,
                bandId: "id",
                token: "token"
            }
            await showBusiness.createShow(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("weekDay, startTime, endTime, bandId and token must be provided.")
        }
    })

    test("Test 2: Error that should return when there is already a show at the time", async () => {
        expect.assertions(3)
        try {
            const input: ShowInputDTO = {
                weekDay: "friday",
                startTime: 8,
                endTime: 23,
                bandId: "id",
                token: "token"
            }
            await showBusiness.createShow(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("There's already a show at this time.")
        }
    })

    test("Test 3: Successful registration", async () => {
        expect.assertions(1)
        try {
            const input: ShowInputDTO = {
                weekDay: "saturday",
                startTime: 8,
                endTime: 23,
                bandId: "id",
                token: "token"
            }

            const createShow = jest.fn(
                (input: ShowInputDTO) => showBusiness.createShow(input)
            )

            await createShow(input)

            expect(createShow).toHaveBeenCalledWith(input)
        } catch (error: any) {
            console.log(error.message)
        }
    })

})

describe("getShowsByDate Tests", () => {
    test("Test 1: Error that should return when token is empty", async () => {
        expect.assertions(3)
        try {
            const token = ""
            const weekDay = "friday"

            await showBusiness.getShowsByDate(token, weekDay)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("weekDay and token must be provided.")
        }
    })

    test("Test 2: Show information succesfully returned", async () => {
        expect.assertions(2)
        try {
            const token = "token"
            const weekDay = "friday"

            const getShowsByDate = jest.fn(
                (weekDay: string, token: string) => showBusiness.getShowsByDate(weekDay, token)
            )

            const result = await getShowsByDate(weekDay, token)

            expect(getShowsByDate).toHaveBeenCalledWith("friday", "token")
            expect(result).toEqual([{
                startTime: 8,
                endTime: 23,
                name: "band",
                musicGenre: "genre"
            }])
        } catch (error: any) {
            console.log(error.message)
        }
    })

})