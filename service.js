import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/common/config/dataBase.js"
import seedSeats from "./src/modules/seats/seed.js";

const Port = Number(process.env.PORT) || 5050;

const start = async () => {
    try {
        console.log("Connecting DB...");
        await connectDB();
        console.log("DB connected");

        await seedSeats();

        console.log("PORT:", Port);

        app.listen(Port, () => {
            console.log(`server is running on port ${Port}`);
        });

    } catch (error) {
        console.log("Startup error:", error);
        process.exit(1);
    }
}

start().catch((err) => {
    console.error("Failed to start server", err)
    process.exit(1)
})