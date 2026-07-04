require("dotenv").config();

<<<<<<< HEAD
const express    = require("express");
const http       = require("http");
const path       = require("path");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes      = require("./routes/authRoutes");
const busRoutes       = require("./routes/busRoutes");
const routeRoutes     = require("./routes/routeRoutes");
const adminRoutes     = require("./routes/adminRoutes");
const driverRoutes    = require("./routes/driverRoutes");
const passengerRoutes = require("./routes/passengerRoutes");
const tripRoutes      = require("./routes/tripRoutes");
const aiRoutes        = require("./routes/aiRoutes");
const locationRoutes  = require("./routes/locationRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, { cors: { origin: "*" } });

require("./sockets/trackingSocket")(io);

// ── Middleware (MUST come before any routes) ──
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── API Routes ──
app.use("/api/auth",      authRoutes);
app.use("/api/buses",     busRoutes);
app.use("/api/routes",    routeRoutes);
app.use("/api/admin",     adminRoutes);
app.use("/api/driver",    driverRoutes);
app.use("/api/passenger", passengerRoutes);
app.use("/api/trips",     tripRoutes);
app.use("/api/ai",        aiRoutes);
app.use("/api/locations", locationRoutes);

// ── Error handlers ──
app.use(notFound);
app.use(errorHandler);

// ── Start ──
const PORT = process.env.PORT || 5000;

connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
=======
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const routeRoutes = require("./routes/routeRoutes");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes");
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
app.use("/api/admin", adminRoutes);


connectDB();

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   
);

>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
