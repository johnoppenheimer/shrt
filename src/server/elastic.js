import elasticsearch from "elasticsearch";
import config from "./config";

export let connected = false;

let elastic = new elasticsearch.Client({
    host: config.ELASTIC_URL
});

elastic.ping({ requestTimeout: Infinity }, err => {
    if (err) {
        throw new Error("Unable to connect elastic : " + config.ELASTIC_URL);
    }
    else {
        connected = true;
    }
});

export default elastic;