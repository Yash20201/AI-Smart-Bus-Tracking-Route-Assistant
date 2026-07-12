const { Server } = require("socket.io");

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
/**
 * Creates and configures the Socket.IO server instance.
 *
 * NOTE: server.js currently creates its Socket.IO server inline and wires
 * up "./sockets/trackingSocket" directly, and that flow has been left
 * untouched. This file is provided as a dedicated, reusable socket config
 * module (as requested). It is not wired into server.js automatically, so
 * nothing about the existing, working setup changes - it's available to
 * swap in later if you want the socket setup centralized here instead.
 *
 * Optional usage in server.js:
 *   const initSocket = require("./config/socket");
 *   const io = initSocket(server);
 *   require("./sockets/trackingSocket")(io);
 */
<<<<<<< HEAD
=======
=======
>>>>>>> d82fec0cf0f0cb13f4e211ca70e31157e4c2a59f
>>>>>>> 44e94aa5cfe6a59e671d65907059d16efea4bde3
function initSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
}

module.exports = initSocket;
