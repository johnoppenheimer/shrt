import config from "./server/config";
import app from "./server/express";

if (!module.parent) {
    app.listen(config.API_PORT, () => {
        console.log("Express start on " + config.API_URL + ":" + config.API_PORT);
    });
}

export default app;