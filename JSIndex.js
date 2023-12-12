/* Capitalize */
Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

/* Dark-Mode */
// Verifica o estado atual do modo escuro na localStorage
function getDarkModeState() {
  return localStorage.getItem("darkMode") === "true";
}

// Verifica o estado atual do botão toggle na localStorage
function getToggleState() {
  return localStorage.getItem("toggleState") === "true";
}

// Atualiza o estado do modo escuro e aplica as alterações de estilo
function setDarkModeState(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  const navbars = document.querySelectorAll(".navbar");
  navbars.forEach((navbar) => {
    navbar.classList.toggle("dark-mode", isDarkMode)});

  // Atualiza o estado do modo escuro na localStorage
  localStorage.setItem("darkMode", isDarkMode);
}

// Atualiza o estado do botão toggle na localStorage
function setToggleState(isToggleActive) {
  // Atualiza o estado do botão toggle na localStorage
  localStorage.setItem("toggleState", isToggleActive);
}

// Inicializa com o estado salvo ou padrão
setDarkModeState(getDarkModeState());

// Inicializa o estado do botão toggle
const isToggleActive = getToggleState();
document.getElementById("toggle-mode").checked = isToggleActive;
setDarkModeState(isToggleActive);

// Adiciona um ouvinte de evento ao botão de alternância
document.getElementById("toggle-mode").addEventListener("change", function () {
  const isToggleActive = this.checked;
  setToggleState(isToggleActive);
  setDarkModeState(isToggleActive);
});

/* Tempo nas cidades das Arenas */
$(document).ready(function () {
  $("#cityselect").change(function () {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather",
      data: {
        q: $("#cityselect").val(),
        APPID: "b2b1df463182c3cca5276e9d3267cc95",
      },
      success: function (data) {
        if (data.name) {
          $("#remover").removeClass("d-block");
          $("#remover").addClass("d-none");
          $("#adicionar1").removeClass("d-none");
          $("#adicionar1").addClass("d-block");
          $("#adicionar2").removeClass("d-none");
          $("#adicionar2").addClass("d-block");
          $("#adicionar3").removeClass("d-none");
          $("#adicionar4").removeClass("d-none");
          $("#adicionar4").addClass("d-block");
          $("#adicionar3").addClass("d-block");
          $("#coordinates").html("Lon: " + data.coord.lon + "º | Lat: " + data.coord.lat + "º");
          $("#weather").html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" />' + " " + data.weather[0].description.capitalize());
          $("#temp").html("" + (data.main.temp - 273.15).toFixed(2).toString() + "ºC");
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

  /* Mapa cidades */
  var map = null;

  $(document).ready(function () {
    $("#cityselect").change(function () {
      // Check if there is an existing map instance
      if (map !== null) {
        // If it exists, remove it
        map.remove();
      }
  
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather",
        data: {
          q: $("#cityselect").val(),
          APPID: "b2b1df463182c3cca5276e9d3267cc95",
        },
        success: function (data) {
          if (data.name) {
            $("#adicionar4").removeClass("d-none");
            $("#adicionar4").addClass("d-block");

            /* Mapa Tempo */
            map = L.map("mapWheather", {
              center: [data.coord.lat, data.coord.lon],
              zoom: 10,
              maxZoom: 13,
              minZoom: 6,
              maxBounds: [
                [data.coord.lat, data.coord.lon],
                [data.coord.lat, data.coord.lon],
              ],
              maxBoundsViscosity: 0.5,
            });
  
            // Cria "Titulo do mapa"
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "© OpenStreetMap contributors",
            }).addTo(map);
  
            L.marker([data.coord.lat, data.coord.lon])
              .addTo(map)
              .bindPopup(data.name);
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
  