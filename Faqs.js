$(document).ready(function () {
  $("#formsfaqs").submit(function (event) {
    var retval = true;

    if (
      $("#pessoa").val().trim().length < 4 ||
      $("#pessoa").val().trim().length > 30
    ) {
      $("#pessoaError").removeClass("d-none");
      retval = false;
    } else {
      $("#pessoaError").addClass("d-none");
    }
    if (
      $("#email").val().trim().length < 8 ||
      $("#email").val().trim().length > 50
    ) {
      $("#emailError").removeClass("d-none");
      retval = false;
    } else {
      $("#emailError").addClass("d-none");
    }
    if ($('input[name="duvtipo"]:checked').length < 1) {
      $("#duvtipoError").removeClass("d-none");
      retval = false;
    } else {
      $("#duvtipoError").addClass("d-none");
    }
    if (
      $("#duvida").val().trim().length < 10 ||
      $("#duvida").val().trim().length > 200
    ) {
      $("#duvidaError").removeClass("d-none");
      retval = false;
    } else {
      $("#duvidaError").addClass("d-none");
    }
    return retval;
  });

  $("#clean").click(function () {
    $("#pessoaError").addClass("d-none");
    $("#emailError").addClass("d-none");
    $("#duvtipoError").addClass("d-none");
    $("#duvidaError").addClass("d-none");
  });
});
