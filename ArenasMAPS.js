$("document").ready(function () {
  const map = L.map("map", {
    center: [39.8283, -98.5795], // centrar nos EUA
    zoom: 4.5,
    maxZomm: 20,
    minZoom: 4,
    maxBounds: [
      [50.3457868, -66.9345703], // Limite Norte e Este
      [23.396308, -125.0016502], // Limite Sul e oeste
    ],
    maxBoundsViscosity: 1,
  });

  // Cria "Titulo do mapa"
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  var composedUri = "http://192.168.160.58/NBA/API/Arenas/";
  ajaxHelper(composedUri, "GET").done(function (data) {
    console.log(data);
    $.each(data.Records, function (index, record) {
      L.marker([record.Lat, record.Lon])
        .addTo(map)
        .bindPopup(
          record.Name +
            "<br>" +
            record.StateName +
            '<br><a class="text-dark text-decoration-none" href ="/arenaDetails.html?id=' +
            record.Id +
            '"><span class="text-danger">&rarr;</span> Ver Arena</a>'
        );
    });
  });
});

//--- Internal functions
function ajaxHelper(uri, method, data) {
  return $.ajax({
    type: method,
    url: uri,
    dataType: "json",
    contentType: "application/json",
    data: data ? JSON.stringify(data) : null,
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("AJAX Call[" + uri + "] Fail...");
    },
  });
}

