"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bukuRoutes_1 = __importDefault(require("./routes/bukuRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Router
app.use("/api/auth", authRoutes_1.default);
app.use("/api/buku", bukuRoutes_1.default);
exports.swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerConfig_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(exports.swaggerDocs));
// Connect Database
const urlMongo = process.env.MONGODB_URI;
const port = process.env.PORT || 4500;
mongoose_1.default.connect(urlMongo);
try {
    console.log("Connect MongoDb");
    app.listen(port, () => {
        console.log(`Server Running  http://localhost:${port}`);
    });
}
catch (_a) {
    console.error("Error Connecting to MongoDB or Starting Server");
}
exports.default = app;
