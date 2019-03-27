var gifs = [
    "Full Metal Alchemist",
    "Cowboy Bebop",
    "Code Geass",
    "Gurren Lagann",
    "Samurai Champloo",
    "Naruto",
    "Pyscho-Pass",
    "Bleach",
    "Angel Beats",
    "Kill la Kill",
    "Hunter x Hunter",
    "Sword Art Online",
    "Yuri on Ice",
    "Jojo's Bizarre Adventure",
    "Attack on Titan",
    "One Piece"
];

function giftastic() {

    var gifSearch = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gifSearch + '&api_key=WKdb1teGXixrWLPX2jU8arZTsflKDEH2&limit=10';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;

        $('#gifs-view').empty();

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="images btn btn-outline-info">');

            var p = $('<p>').text('Ratings: ' + results[i].rating);

            var gifImage = $('<img>');
            gifImage.addClass('gifImage');

            gifImage.attr('src', results[i].images.fixed_height_still.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', 'still');

            gifDiv.append(p);
            gifDiv.append(gifImage);

            $('#gifs-view').prepend(gifDiv);
        }

        $('.gifImage').on('click', function () {
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        })
    });
}


function renderedButtons() {
    $('#gifs-button').empty();
    for (var i = 0; i < gifs.length; i++) {

        var a = $('<button>');
        a.addClass('gif btn btn-info');
        a.attr('data-name', gifs[i]);
        a.text(gifs[i]);
        $('#gifs-button').append(a);
    }

}

$('#find-gif').on('click', function (event) {
    event.preventDefault();

    var gifSearch = $('#gif-input').val().trim();
    gifs.push(gifSearch);
    renderedButtons();
});

$(document).on('click', '.gif', giftastic);

renderedButtons();



