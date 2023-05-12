// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {

    // Kendo UI.
    var app = new kendo.mobile.Application(document.body, { skin: "nova" });

    // Create result view.
    $("#results").kendoMobileListView({
        template: kendo.template($("#template").html()),
        pageable: true
    });

    // For the search...
    $('#searchform').submit(function (event) {
        $.ajax({
            url: '/api/search/' + $('#search').val(),
            type: 'get',
            success: function (data) {
                var results = $("#results").data("kendoMobileListView");
                results.setDataSource(data)
            }
        });
        event.preventDefault();
    });
});

function add(e) {
    var videoId;
    if (event.target.querySelector('.id') != null) {
        videoId = event.target.querySelector('.id').innerHTML;
    } else {
        videoId = event.target.parentElement.querySelector('.id').innerHTML;
    }

    $.ajax({
        url: '/api/search/add/' + videoId,
        type: 'get',
        success: function (data) {
            alert('Liedje is toegevoegd!');

            $('#search').val('')
            var results = $("#results").data("kendoMobileListView");
            results.setDataSource({ })
        }
    });
}
