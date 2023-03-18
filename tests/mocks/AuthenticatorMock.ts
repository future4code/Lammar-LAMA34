import { IAuthenticator } from "../../src/business/ports";
import { UserRole } from "../../src/model/User";

export class AuthenticatorMock implements IAuthenticator {
    public generateToken = jest.fn(()=>{
        return "token"
    })
    
    public getTokenData = jest.fn(() => {
        return { id: "id", role: UserRole.ADMIN }
    })
    
}