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
document.getElementById('dark-mode').addEventListener('clicked', function() {
  handleButtonClick('dark-mode');
});

function handleButtonClick(botaoId) {
  // Armazene o ID do botão no localStorage
  localStorage.setItem('botaoAtivo', botaoId);
  };

var botaoSelecionado = localStorage.getItem('botaoAtivo');
if (botaoSelecionado) {
  // Se houver, selecione o botão armazenado
  document.getElementById(botaoSelecionado).click();
  };

// Ativar Dark-mode
function enableDarkMode() {
  $('body').addClass('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  localStorage.setItem('in-toggle', 'enabled')
};

// Desativar Dark-mode
function disableDarkMode() {
  $('body').removeClass('dark-mode');
  localStorage.setItem('darkMode', null);
};

//Nav-bars
function handleDarkModeToggle() {
  document.getElementById("nav-bar").classList.toggle("bg-dark");
  var isDarkMode = document
    .getElementById("nav-bar")
    .classList.contains("bg-dark");
  localStorage.setItem("darkMode", isDarkMode);
}

var storedDarkMode = localStorage.getItem("darkMode");
if (storedDarkMode === "true") {
  document.getElementById("nav-bar").classList.add("bg-dark");
}



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
