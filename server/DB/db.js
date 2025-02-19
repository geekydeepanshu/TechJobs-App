import mongoose from "mongoose"

const ConnectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_DB);
        console.log(`Mongo DB is connected ${conn}`)
    } catch (error) {
        console.log("Mongo DB error",error);
    }
}

export { ConnectDB }