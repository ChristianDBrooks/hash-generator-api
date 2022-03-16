"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** source/server.ts */
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const hash_1 = __importDefault(require("./routes/hash"));
const ALLOWED_ORIGINS = JSON.parse(process.env.ALLOWED_ORIGINS || "[]");
const app = (0, express_1.default)();
/** Logging */
app.use((0, morgan_1.default)("dev"));
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express_1.default.json());
/** RULES OF OUR API */
app.use((req, res, next) => {
    let origin = req.get('origin');
    console.log("origin", origin);
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        console.log("Origin allowed!");
    }
    else {
        console.log("Origin not allowed!");
    }
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    // set the CORS method headers
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
    }
    next();
});
/** Routes */
app.use("/hash", hash_1.default);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});
/** Server */
const httpServer = http_1.default.createServer(app);
const PORT = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));