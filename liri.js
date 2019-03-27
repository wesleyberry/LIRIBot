var result = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
if(result.error) {
    throw result.error
}
// var id = result.parsed.SPOTIFY_ID;
// var secret = result.parsed.SPOTIFY_SECRET;
console.log(spotify);
if(process.argv[2] == "concert-this") {
    var artist = process.argv[3].toLowerCase();
    artist = artist.split(" ").join("+");
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(function(response) {
        // console.log(response);
        for(var i = 0; i < response.data.length; i++) {
            // 1) Name of the venue
            console.log("Name of the venue: " + response.data[i].venue.name);
            // 2) Venue location
            console.log("Venue location: " + response.data[i].venue.city + " , " +
            // 3) date of the event "MM/DD/YYYY"
            response.data[i].venue.country);
            var date = moment(response.data[i].datetime).format('L');
            console.log("Date of the event: " + date);
            console.log("---------------------------");
        }
    });
}
if(process.argv[2] == "spotify-this-song") {
    var input = process.argv[3].toLowerCase();
    console.log(input);
    spotify
    // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    .search({type: 'track', query: input, limit: 5})
    .then(function(response) {
      console.log(response); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });
    // 1) Artist(s)
    // 2) The song's name
    // 3) A preview link of the song from Spotify
    // 4) The album that the song is from
    // if no song = The Sign by Ace of Base

}
if(process.argv[2] == "movie-this") {
    if(process.argv[3] !== undefined) {
        var movie = process.argv[3].toLowerCase();
        movie = movie.split(" ").join("+");
        var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        axios.get(url).then(function(response) {
        forMovie(response);
        // if no data = Mr.Nobody
        }).catch (function(error) {
            if(error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
        // if no data = Mr.Nobody
    } else if(process.argv[3] == undefined){
        url = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
        axios.get(url).then(function(response) {
        forMovie(response);
        }).catch (function(error) {
            if(error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
    }
}
if(process.argv[2] == "do-what-it-says") {
    // Take data from random.txt/spotify-this-song
    
}

function forMovie(response) {
    // 1) Title of the movie.
    console.log("Title of the movie: " + response.data.Title);
     // 2) Year the movie came out.
    console.log("Release year: " + response.data.Year);
    // 3) IMDB Rating of the movie.
    console.log("IMDB Rating: " + response.data.imdbRating);
    // 4) Rotten Tomatoes Rating of the movie.
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    // 5) Country where the movie was produced.
    console.log("Country (or countries) of production: " + response.data.Country);
    // 6) Language of the movie.
    console.log("Language(s): " + response.data.Language);
    // 7) Plot of the movie.
    console.log("Plot: " + response.data.Plot);
    // 8) Actors in the movie.
    console.log("Actors and Actresses: " + response.data.Actors);
    console.log("---------------------------");
}