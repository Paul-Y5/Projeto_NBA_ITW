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
      hideLoading();
    },
  });
}

function sleep(milliseconds) {
  const start = Date.now();
  while (Date.now() - start < milliseconds);
}

function showLoading() {
  $("#myModal").modal("show", {
    backdrop: "static",
    keyboard: false,
  });
}

function hideLoading() {
  $("#myModal").on("shown.bs.modal", function (e) {
    $("#myModal").modal("hide");
  });
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;
  console.log("sPageURL=", sPageURL);
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
}

//--- Page Events
self.activate = function (id) {
  console.log("CALL: getTeams...");
  var composedUri =
    self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
  ajaxHelper(composedUri, "GET").done(function (data) {
    console.log(data);
    hideLoading();
    self.records(data.Records);
    self.currentPage(data.CurrentPage);
    self.hasNext(data.HasNext);
    self.hasPrevious(data.HasPrevious);
    self.pagesize(data.PageSize);
    self.totalPages(data.TotalPages);
    self.totalRecords(data.TotalRecords);
    self.SetFavourites();
  });
};

$(document).ajaxComplete(function (event, xhr, options) {
  $("#myModal").modal("hide");
});

function removeFav(Id) {
  console.log("remove fav");
  $("#fav-" + Id).remove();

  let fav = JSON.parse(localStorage.fav || "[]");

  const index = fav.indexOf(Id);

  if (index != -1) fav.splice(index, 1);

  localStorage.setItem("fav", JSON.stringify(fav));

  location.reload();
}

function openDetails(Id, Acronym) {
  // Construct the URL for the details page using the provided Id
  const detailsPageUrl = `./teamsdetails.html?id=${Id}&acronym="${Acronym}"`;

  // Redirect to the details page
  window.location.href = detailsPageUrl;
}

$(document).ready(function () {
  showLoading();

  let fav = JSON.parse(localStorage.fav || "[]");

  console.log(fav);

  for (const Id of fav) {
    console.log(Id);

    ajaxHelper("http://192.168.160.58/NBA/api/Teams/" + Id, "GET").done(
      function (data) {
        console.log(data);

        // Ensure Acronym is available in the returned data
        const Acronym = data.Acronym;

        const apiUrl ="http://192.168.160.58/NBA/api/Teams/" + Id + "?acronym=" + Acronym;

        if (localStorage.fav.length != 0) {
          $("#table-favourites").show();
          $("#noadd").hide();
          $("#nofav").hide();
          $("#table-favourites").append(
            `<tr id="removefav${Id}">
                        <td class="align-middle"><img class="imgtable" src="${data.Logo}" /></td>                    
                        <td class="align-middle">${Acronym}</td>
                        <td class="align-middle">${data.Name}</td>
                        <td class="align-middle">${data.ConferenceName}</td>
                        <td class="align-middle">${data.DivisionName}</td>
                        <td class="align-middle">${data.StateName}</td>
                        <td class="align-middle">${data.City}</td>
                        <td class="text-end">
                            <a class="btn btn-default btn-light btn-xs" onclick="openDetails(${Id}, '${Acronym}')"><i class="fa fa-eye" title="Show details"></i></a>
                            <a class="btn btn-default btn-light btn-xs" onclick="removeFav(${Id})"><i class="fa fa-star text-warning" title="Remover dos favoritos"></i></a>
                        </td>
                    </tr>`
          );
        }
      }
    );

    sleep(50);
  }

  hideLoading();
});
