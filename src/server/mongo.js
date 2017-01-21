import config from "./config";
import mongo from "mongoose";

export let connected = false;

mongo.Promise = Promise;
mongo.connect(config.MONGO_URL);

const connection = mongo.connection;
connection.on("error", () => {
    throw new Error("Unable to connect mongo : " + config.MONGO_URL);
});
connection.once("open", () => {
    connected = true;
});

export default mongo;