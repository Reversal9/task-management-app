import express, { Express } from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import columnRoutes from "./routes/columnRoutes";
import memberRoutes from "./routes/memberRoutes";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", taskRoutes);
app.use("/api", columnRoutes);
app.use("/api", memberRoutes);

const PORT: string | number = process.env.PORT || 5000;

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const uri: string = `mongodb://127.0.0.1:27017`;

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    )
    .catch((err) => {
        throw err;
    });