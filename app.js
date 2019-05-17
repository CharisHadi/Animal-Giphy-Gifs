var animals = [];

var key = "gwhUjMEXBLwI5uRQ7smH8e4TTJqEN3yd";

// Function for displaying animal data

  function renderButtons() {
  $("#buttons-view").html("");
  for (i = 0; i < animals.length; i++){
    $("#buttons-view").append("<button id = '" + animals[i] + "' class = 'animal-button'>" + animals[i] + "</button>")
  }

//   console.log("Render List");
//   console.log(animals);
//   console.log("___________________________");
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function() {
  event.preventDefault();
  var animal = $("#animal-input").val();
  if (animal !== ""){
    animals.push(animal);
    renderButtons();
  }   
});

$(document.body).on("click", ".animal-button", function(){
    var animal = this.id;
    // console.log(this.id);
    var qeuryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + animal + "&limit=10&rating=PG-13&lang=en";

    $.ajax({
        url: qeuryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
        
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animalGif = $("<img>");
          animalGif.attr("id", animal + "-gif");
          animalGif.attr("class", "gif");
          animalGif.attr("src", results[i].images.fixed_height_still.url);

          gifDiv.prepend(p);
          gifDiv.prepend(animalGif);

          $("#gifs-appear-here").prepend(gifDiv);
        }
    });

    
});

$(document.body).on("click", ".gif", function(){
    
});

// Calling the renderButtons function to display the initial list of animals
renderButtons();