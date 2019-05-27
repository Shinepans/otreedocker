export const settings = {

    // redis
    redisHost: process.env.REDIS || "localhost",
    redisPort: 6379,
    sessionSecret: process.env.SESSION_SECRET || "",


    // mongo
    mongoUri: process.env.MONGODB || "",
    mongoUser: '',
    mongoPass: ''
}
