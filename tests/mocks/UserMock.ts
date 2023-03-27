import { User, UserRole } from "../../src/model/User";

export const userMock = new User(
    "id",
    "Test",
    "email@email",
    "123456",
    UserRole.NORMAL
)