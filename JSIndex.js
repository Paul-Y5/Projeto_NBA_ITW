/* Capitalize */
Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

/* Dark-Mode */
$(document).ready(function() {
  // Verifica se está ativo o dark-mode na storage
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  }
});

// Dark mode toggle button click event
$('#dark-mode').click(function() {
  if ($('body').hasClass('dark-mode')) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// Botão Dark-Mode
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode");
  const body = document.body;

  // Verifica o estado do dark mode no localStorage ao carregar a página
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const checkboxState = localStorage.getItem("checkboxState");
  // Aplica o dark mode se necessário
  if (isDarkMode) {
    enableDarkMode();
  }
  if (checkboxState === "true") {
    myCheckbox.checked = true;
  }

  // Adiciona um evento de alteração à checkbox de dark mode
  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  function enableDarkMode() {
    // Ativa o dark mode
    body.classList.add("dark-mode");
    // Armazena o estado do dark mode na localStorage
    localStorage.setItem("darkMode", "true");
    localStorage.setItem("darkModeToggle", "enable")
  }

  function disableDarkMode() {
    // Desativa o dark mode
    body.classList.remove("dark-mode");
    // Armazena o estado do dark mode na localStorage
    localStorage.setItem("darkMode", "false");
    localStorage.setItem("darkModeToggle", )
  }
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
