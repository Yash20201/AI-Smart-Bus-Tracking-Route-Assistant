socket.on("busLocation", (data) => {

   updateMarker(
      data.latitude,
      data.longitude
   );

});