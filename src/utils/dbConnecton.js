import { connect, Schema, model } from 'mongoose';
import { UserModel } from '../DAO/models/users.model.js';
import faker from 'faker';
// CONNECT TO MONGO

export async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://ceciliaponce28:mHey2UVhS8P29Yhr@proyectos-backend.qr0fbhz.mongodb.net/?retryWrites=true&w=majority"
        );

// GENERATE FALSE USERS FOR TRIAL

    // (async () => {
    //     const users = [];
    //     for (let i=0; i < 3000; i++) {
    //         users.push({
    //             firstName: faker.name.firstName,
    //             lastName: faker.name.lastName,
    //             email: faker.internet.email,
    //         });
    //     }

    //     try {
    //         await UserModel.insertMany(users);
    //         console.log("Inserted", users.length,"users")
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })();

// END OF TRIAL

// SEARCH 

// let todos = await UserModel.find({firstName: "John"}).explain("executionStats");
// console.log(todos);

// END SEARCH

        console.log("plug to mongo!");
    } catch (e) {
        console.log(e);
        throw "can not connect to the db";
    }
}
