import { UserModel } from "./DAO/models/users.model";

UserModel.prependListener("find",function () {
    this.populate("")
})