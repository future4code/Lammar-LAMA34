import { IHashManager } from "../../src/business/ports"

export class HashManagerMock implements IHashManager {
    public generateHash = jest.fn(async (plainText: string) => {
        return "hash"
    })

    public compareHash = jest.fn(async (plainText: string, hashText: string) => {
        return plainText === hashText
    })

}