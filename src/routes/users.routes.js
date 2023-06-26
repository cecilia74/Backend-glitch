import express from "express";
import { UserService } from "../services/user.service.js";


export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
    try {
        const users = await UserService.getAll();
        return res.status(200).json({
            status: "success",
            msg: "users list",
            data: users,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});

usersRouter.post("/", async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        if (!firstName || !lastName || !email) {
            console.log(
                "validation error: please complete firstName, lastname and email."
            );
            return res.status(400).json({
                status: "error",
                msg: "please complete firstName, lastname and email.",
                data: {},
            });
        }
        const userCreated = await UserService.create({ 
            firstName, 
            lastName, 
            email 
        });
        return res.status(201).json({
            status: "success",
            msg: "user created",
            data: {
                _id: userCreated._id,
                firstName: userCreated.firstName,
                lastName: userCreated.lastName,
                email: userCreated.email
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});

usersRouter.put("/:_id", async (req, res) => {
    const { _id } = req.params;
    const { firstName, lastName, email } = req.body;
    try {
        if (!firstName || !lastName || !email || !_id) {
            console.log(
                "validation error: please complete firstName, lastname and email."
            );
            return res.status(400).json({
                status: "error",
                msg: "please complete firstName, lastname and email.",
                data: {},
            });
        }
        const userUptaded = await UserService.updateOne(
            { _id, firstName, lastName, email }
        );
        return res.status(201).json({
            status: "success",
            msg: "user uptaded",
            data: userUptaded,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});


usersRouter.delete("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
                const result = await UserService.deleteOne(_id);
        if (!_id) {
            console.log("validation error: please complete id to delete");
            return res.status(400).json({
                status: "error",
                msg: "please complete id",
                data: {},
            });
        } else if (result?.deletedCount > 0) {
            return res.status(200).json({
                status: "success",
                msg: "user deleted",
                data: {},
            })
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
});