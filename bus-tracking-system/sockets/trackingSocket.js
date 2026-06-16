const BusLocation = require("../models/BusLocation");

module.exports = (io) => {

    io.on("connection", (socket) => {

        socket.on("locationUpdate", async (data) => {

            const { busId, latitude, longitude } = data;

            await BusLocation.findOneAndUpdate(
                { busId },
                {
                    latitude,
                    longitude,
                    updatedAt: Date.now()
                },
                {
                    upsert: true,
                    new: true
                }
            );

            io.emit("busLocation", data);
        });

    });

};