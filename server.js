require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const routeRoutes = require("./routes/routeRoutes");
const path = require("path");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

require("./sockets/trackingSocket")(io);
const locationRoutes = require("./routes/locationRoutes");

app.use("/api/locations", locationRoutes);


app.use(express.static("public"));

app.use(express.json());
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Bus Tracking System API");
}
);

connectDB();

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   
);

