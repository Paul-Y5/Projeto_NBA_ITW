
/* Tempo nas cidades das Arenas */
$(document).ready(function () {
  $("#citySelector").change(function () {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather",
      data: {
        q: $("#citySelector").val(),
        APPID: "b2b1df463182c3cca5276e9d3267cc95",
      },
      success: function (data) {
        if (data.name) {
          $("table").removeClass("d-none");
          $("#cityName").html(data.name + " / " + data.sys.country);
          $("#coordinates").html(
            "Lon (º): " + data.coord.lon + " / Lat(º):" + data.coord.lat
          );
          $("#weather").html(
            '<img src="http://openweathermap.org/img/w/' +
              data.weather[0].icon +
              '.png" />' +
              data.weather[0].description
          );
          $("#temp").html(
            data.main.temp.toString() +
              "ºK / " +
              (data.main.temp - 273.15).toString() +
              "ºC"
          );
          $("#pressure").html(data.main.pressure);
          $("#humidity").html(data.main.humidity + "%");
          $("#allData").html(
            JSON.stringify(data, null, 4).replace(/\n/g, "<br>")
          );
        } else {
          $("table").addClass("d-none");
          alert(data.message);
        }
      },
      error: function () {
        $("table").addClass("d-none");
        alert("Erro!");
      },
    });
  });
});
