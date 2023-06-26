import { UserModel } from "../DAO/models/users.model.js";

class userService {

    async getAll() {
        const users = await UserModel.find(
            {},
            {
                _id: true,
                firstName: true,
                lastName: true,
                email: true,
            },);
        return users;
    }

    async create() {
        const userCreated = await UserModel.create({
            firstName,
            lastName,
            email
        });
        return userCreated;
    }

    async update() {
        const userUptaded = await UserModel.updateOne(
            { _id: _id },
            { firstName, lastName, email }
        );
        return userUptaded;
    }

    async deleteOne(_id) {
        const result = await UserModel.deleteOne(_id);
        return result;
    }

}

export const UserService = new userService();