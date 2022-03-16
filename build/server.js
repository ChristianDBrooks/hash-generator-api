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
const cors_1 = require("./middleware/cors");
const app = (0, express_1.default)();
/** Logging */
app.use((0, morgan_1.default)("dev"));
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express_1.default.json());
/** Custom Middlware */
/** RULES OF OUR API */
app.use(cors_1.cors);
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
