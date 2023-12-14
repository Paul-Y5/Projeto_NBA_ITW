$(document).ready(function () {
    const api_url = "http://192.168.160.58/NBA/API/Players/Search?q=";

    $("#input").autocomplete({
        minLength: 2,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                url: api_url,
                data: {
                    q: $('#input').val().toLowerCase()
                },
                success: function (data) {
                    if (!data.length) {
                        var result = [{
                            label: 'Sem resultados',
                            value: response.term,
                        }];
                        response(result);
                    } else {
                        var nData = $.map(data.slice(0, 10), function (value, key) {
                            return {
                                label: value.Name,
                                value: value.Id,
                            }
                        });
                        results = $.ui.autocomplete.filter(nData, request.term);
                        response(results);
                    }
                },
                error: function () {
                    alert("error!");
                }
            });
        },
        select: function (event, ui) {
            event.preventDefault();
            $("#input").val(ui.item.label);
            window.location.href = "./playersDetails.html?id=" + ui.item.value;
        },
        focus: function (event, ui) {
            $("#input").val(ui.item.label);
        }
    });
});
