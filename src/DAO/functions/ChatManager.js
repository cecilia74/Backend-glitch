export default class CartManager {
    constructor() {
        this.chats = [];
    }

    async addMsgs(msg) {
        try {
            this.chats.push(msg);
        } catch (err) {
            console.log({
                status: "error",
                msg: "Error. Message not send",
                data: err,
            });
        }

    }


    async getMsgs() {
        try {
return this.chats;
        } catch (err) {
            console.log({
                status: "error",
                msg: "Error. Messages not found",
                data: err,
            });
        }
    }
}