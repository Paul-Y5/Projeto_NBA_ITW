/* Capitalize */
Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

/* Dark-Mode */

function getDarkModeState() {
  return localStorage.getItem("darkMode") === "true";
}

// Função para atualizar o estado do modo escuro
function setDarkModeState(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.querySelectorAll(".navbar, .card").forEach((element) => {
    element.classList.toggle("dark-mode", isDarkMode);
  });
  localStorage.setItem("darkMode", isDarkMode);
}

// Inicialização com o estado salvo ou padrão
setDarkModeState(getDarkModeState());

// Adiciona um ouvinte de evento ao botão de alternância
document.getElementById("toggle-mode").addEventListener("click", function () {
  const isDarkMode = !getDarkModeState();
  setDarkModeState(isDarkMode);
});



/* const isDarkMode = localStorage.getItem("darkMode") === "true";
const checkboxState = localStorage.getItem("checkboxState") === 'true';

// Set initial theme based on the stored state
if (isDarkMode) {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
  $('#navbar-bottom').removeClass('navbar navbar-light bg-light fixed-bottom');
  $('#navbar-bottom').addClass('navbar navbar-dark bg-dark fixed-bottom');
  $('#navbar-top').removeClass('navbar navbar-light bg-light fixed-top');
  $('#navbar-top').addClass('navbar navbar-dark bg-dark fixed-top');
} else {
  document.documentElement.setAttribute('data-bs-theme', 'light');
  $('#navbar-top').removeClass('navbar navbar-dark bg-dark fixed-top');
  $('#navbar-top').addClass('navbar navbar-light bg-light fixed-top');
  $('#navbar-bottom').removeClass('navbar navbar-dark bg-dark fixed-bottom');
  $('#navbar-bottom').addClass('navbar navbar-light bg-light fixed-bottom');
}

document.getElementById('dark-mode').addEventListener('click', () => {
  // Toggle dark mode
  if (isDarkMode) {
    document.documentElement.setAttribute("data-bs-theme", "light");
    $("#navbar-top").removeClass("navbar navbar-dark bg-dark fixed-top");
    $("#navbar-top").addClass("navbar navbar-light bg-light fixed-top");
    $("#navbar-bottom").removeClass("navbar navbar-dark bg-dark fixed-bottom");
    $("#navbar-bottom").addClass("navbar navbar-light bg-light fixed-bottom");
    localStorage.setItem("darkMode", "false");
    localStorage.setItem("checkboxState", "false");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    $("#navbar-bottom").removeClass(
      "navbar navbar-light bg-light fixed-bottom"
    );
    $("#navbar-bottom").addClass("navbar navbar-dark bg-dark fixed-bottom");
    $("#navbar-top").removeClass("navbar navbar-light bg-light fixed-top");
    $("#navbar-top").addClass("navbar navbar-dark bg-dark fixed-top");
    localStorage.setItem("darkMode", "true");
    localStorage.setItem("checkboxState", "true");
  }
  // Update the isDarkMode variable after toggling
  isDarkMode = !isDarkMode;

  // Update and store the checkbox state
  localStorage.setItem("darkMode", isDarkMode.toString());
  localStorage.setItem("checkboxState", isDarkMode.toString());
});
 */

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
  