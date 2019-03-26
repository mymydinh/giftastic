var gifs = [
    "Anteater",
    "Dog",
    "Cat",
    "Dragonfly",
    "Hummingbird",
    "Jellyfish",
    "Koala",
    "Llama",
    "Otter",
    "Pig",
    "Reindeer",
    "Squirrel",
    "Zebra"
];

// THIS FUNCTION RERENDERS THE HTML TO DISPLAY THE APPROPRIATE CONTENT
function giftastic() {

    // var gifSearch = $("#gif-input").val();
    var gifSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=WKdb1teGXixrWLPX2jU8arZTsflKDEH2&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="images btn btn-outline-info">');

            var p = $("<p>").text("Ratings: " + results[i].rating);

            var gifImage = $("<img>");
            gifImage.addClass('gifImage');

            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");

            gifDiv.append(p);
            gifDiv.append(gifImage);



            $("#gifs-view").prepend(gifDiv);
        }

        // var results = response.data;
        // for (var i = 0; i < results.length; i++) {

        //     var imageUrl = results[i].images.fixed_height.url;
        //     var catImage = $("<img>");
        //     catImage.attr("src", imageUrl);
        //     catImage.attr("alt", "cat image");

        //     $("#gifs-view").prepend(catImage);

        // }



   
        $(".gifImage").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    });


}


// FUNCTION FOR DISPLAYING MOVIE DATA
function renderedButtons() {
    $("#gifs-button").empty();
    for (var i = 0; i < gifs.length; i++) {

        var a = $('<button>');
        a.addClass('gif btn btn-info');
        a.attr('data-name', gifs[i]);
        a.text(gifs[i]);
        $('#gifs-button').append(a);
    }
}



// THIS FUNCTION IS USED FOR ADDING GIFS BUTTON
$("#find-gif").on("click", function (event) {
    event.preventDefault();

    var gifSearch = $("#gif-input").val().trim();
    gifs.push(gifSearch);
    // THIS FUNCTION SHOWS USER INPUT 
    renderedButtons();
});





$(document).on("click", ".gif", giftastic);
// THIS FUNCTION SHOWS THE WHOLE ARRAY
renderedButtons();



