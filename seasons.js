// ViewModel KnockOut
var vm = function () {
  console.log("ViewModel initiated...");
  //---Variáveis locais
  var self = this;
  self.baseUri = ko.observable("http://192.168.160.58/NBA/API/Seasons");
  self.displayName = "NBA Seasons List";
  self.error = ko.observable("");
  self.passingMessage = ko.observable("");
  self.records = ko.observableArray([]);
  self.currentPage = ko.observable(1);
  self.pagesize = ko.observable(20);
  self.totalRecords = ko.observable(50);
  self.hasPrevious = ko.observable(false);
  self.hasNext = ko.observable(false);
  self.previousPage = ko.computed(function () {
    return self.currentPage() * 1 - 1;
  }, self);
  self.nextPage = ko.computed(function () {
    return self.currentPage() * 1 + 1;
  }, self);
  self.fromRecord = ko.computed(function () {
    return self.previousPage() * self.pagesize() + 1;
  }, self);
  self.toRecord = ko.computed(function () {
    return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
  }, self);
  self.totalPages = ko.observable(0);
  self.pageArray = function () {
    var list = [];
    var size = Math.min(self.totalPages(), 9);
    var step;
    if (size < 9 || self.currentPage() === 1) step = 0;
    else if (self.currentPage() >= self.totalPages() - 4)
      step = self.totalPages() - 9;
    else step = Math.max(self.currentPage() - 5, 0);

    for (var i = 1; i <= size; i++) list.push(i + step);
    return list;
  };

  //--- Page Events
self.activate = function (id) {
  console.log("CALL: getSeasons...");
  var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
  
  ajaxHelper(composedUri, "GET").done(function (data) {
    console.log(data);
    hideLoading();
    var seasons = data.Records;
    
    // Map each season to a promise for fetching its season type
    var seasonTypePromises = seasons.map(function (season) {
      var seasonTypeUri = "http://192.168.160.58/NBA/API/SeasonTypes/" + season.Id; // Using season.Id
      return ajaxHelper(seasonTypeUri, "GET").then(function (seasonTypeData) {
        // Assuming seasonTypeData contains a property that indicates the season type
        season.SeasonType = seasonTypeData.Name;
        return season;
      }).fail(function () {
        // Handle failure (e.g., season type not found for this season)
        season.SeasonType = "Unknown";
        return season;
      });
    });

    // When all season type requests are done, update the view model
    $.when.apply($, seasonTypePromises).then(function () {
      // The 'arguments' object contains season objects with their season types
      self.records($.map(arguments, function (arg) {
        return arg[0]; // Each argument is an array with the season as the first element
      }));
      self.currentPage(data.CurrentPage);
      self.hasNext(data.HasNext);
      self.hasPrevious(data.HasPrevious);
      self.pagesize(data.PageSize);
      self.totalPages(data.TotalPages);
      self.totalRecords(data.TotalRecords);
    });
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("Error fetching seasons", textStatus, errorThrown);
    self.error("Error fetching seasons: " + errorThrown);
    hideLoading();
  });
};


      //--- Internal functions
      function ajaxHelper(uri, method, data) {
        self.error(""); // Clear error message
        return $.ajax({
          type: method,
          url: uri,
          dataType: "json",
          contentType: "application/json",
          data: data ? JSON.stringify(data) : null,
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            hideLoading();
            self.error(errorThrown);
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

      //--- start ....
      showLoading();
      var pg = getUrlParameter("page");
      console.log(pg);
      if (pg == undefined) self.activate(1);
      else {
        self.activate(pg);
      }
      console.log("VM initialized!");
    };

    $(document).ready(function () {
      console.log("ready!");
      ko.applyBindings(new vm());
    });

    $(document).ajaxComplete(function (event, xhr, options) {
      $("#myModal").modal("hide");
    });
