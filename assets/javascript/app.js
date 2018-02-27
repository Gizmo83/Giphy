// Initial array of categories
var categories = ["happy", "shrug", "confused", "ugh", "excited"];

// displayCategoryInfo function re-renders the HTML to display the appropriate content
function displayCategoryInfo() {
    
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=EDGBPbpEg4mgULZRo4i4vO5BRxsDOyUQ&limit=20";
    
    // Creating an AJAX call for the specific category button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#categories-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            var categoryDiv = $("<div class='category'>");
            var rating = response.data[i].rating;
            var imageTag = $("<img class='giphy'>");
            
            categoryDiv.append("<p> Rating: " + rating + "</p>");
            
            imageTag.attr("src", response.data[i].images.fixed_height_still.url);
            imageTag.attr({'data-animate' : response.data[i].images.fixed_height.url});
            imageTag.attr({'data-state' : "still"});
            imageTag.attr({'data-still' : response.data[i].images.fixed_height_still.url});
            
            $(categoryDiv).append(imageTag);
            $("#categories-view").append(categoryDiv);

        }
        $(".giphy").on("click", function(){
            var state = $(this).attr('data-state');
            console.log(state);
            console.log(this);
            
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

// Function for creating the button from array
function renderButtons() {
    
    $("#buttons-view").empty();
    
    for (var i = 0; i < categories.length; i++) {
        var a = $("<button>");
        // Adding a class of category-btn to our button
        a.addClass("category-btn");
        // Adding a data-attribute
        a.attr("data-name", categories[i]);
        // Providing the initial button text
        a.text(categories[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles the what is input into the text field
$("#add-category").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var search = $("#category-input").val().trim();
    // Adding movie from the textbox to our array
    categories.push(search);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".category-btn", displayCategoryInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
