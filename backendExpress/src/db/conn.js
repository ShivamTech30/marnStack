const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

let isConnecting = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (isConnecting) {
        return isConnecting;
    }

    const mongoURI = process.env.MONGO_URI || process.env.DB_URI || `mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME || "Ecommerce"}`;

    isConnecting = mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 5000,
    }).then((conn) => {
        isConnecting = null;
        console.log(`Database connected successfully: ${conn.connection.host}`);
        return conn;
    }).catch((err) => {
        isConnecting = null;
        console.error("Database connection error:", err.message);
        throw err;
    });

    return isConnecting;
};

// Initial connection attempt
connectDB().catch(() => {});

module.exports = connectDB;
