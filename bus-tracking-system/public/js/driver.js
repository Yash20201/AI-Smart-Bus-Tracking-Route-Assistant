navigator.geolocation.watchPosition(
(position) => {

 socket.emit("locationUpdate", {
   busId: "YOUR_BUS_ID",
   latitude: position.coords.latitude,
   longitude: position.coords.longitude
 });

});