let params = {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    API_PORT: process.env.API_PORT,
    MONGO_URL: process.env.MONGO_URL
};

Object.keys(params).forEach((key) => {
    let val = params[key];
    if (val === undefined)
        throw new Error(key.toString() + " env is missing");
});

if (!(params.NODE_ENV === "production" || params.NODE_ENV === "development")) {
    throw new Error("NODE_ENV could only take 'production' or 'development' values");
}

export default params;