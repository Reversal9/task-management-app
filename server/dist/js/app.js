"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const columnRoutes_1 = __importDefault(require("./routes/columnRoutes"));
const memberRoutes_1 = __importDefault(require("./routes/memberRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use("/api", taskRoutes_1.default);
app.use("/api", columnRoutes_1.default);
app.use("/api", memberRoutes_1.default);
const PORT = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.rd75dmz.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((err) => {
    throw err;
});
