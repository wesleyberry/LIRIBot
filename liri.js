var result = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = "Command:" + process.argv[2] + " " + process.argv[3];
var total;
var newBrk = "\n-----------------------------------------------------------";
if (result.error) {
    throw result.error
}

if (process.argv[2] == "concert-this") {
    var artist = process.argv[3].toLowerCase();
    artist = artist.split(" ").join("+");
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(function (response) {
        // console.log(response);
        fs.appendFile("log.txt", newBrk + "\n" + command, function (err) {
            if (err) {
                console.log(err);
            }
        });
        for (var i = 0; i < response.data.length; i++) {
            // 1) Name of the venue
            console.log("\nName of the venue: " + response.data[i].venue.name);
            // 2) Venue location
            console.log("Venue location: " + response.data[i].venue.city + " , " +
                response.data[i].venue.country);
            // 3) date of the event "MM/DD/YYYY"
            var date = moment(response.data[i].datetime).format('L');
            console.log("Date of the event: " + date);
            console.log("---------------------------");
            total = "\nName of the venue: " + response.data[i].venue.name +
                "\nVenue location: " + response.data[i].venue.city + " , " + response.data[i].venue.country +
                "\nDate of the event: " + date + "\n---------------------------";
            fs.appendFile("log.txt", total, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}
if (process.argv[2] == "spotify-this-song") {
    var input;
    var criteria;
    fs.appendFile("log.txt", newBrk + "\n" + command, function (err) {
        if (err) {
            console.log(err);
        }
    });
    if (process.argv[3] !== undefined) {
        input = process.argv[3].toLowerCase();
        criteria = { type: 'track', query: input, limit: 5 };
    } else {
        input = "the sign";
        criteria = { type: 'track', query: input, limit: 10 };
    }
    // input = input.split(" ").join("+");
    spotify.search(criteria, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        if (process.argv[3] !== undefined) {
            spotifyInput(data);
            spotifyWrite(data);
        } else {
            spotifySign(data);
            spotifyWrite2(data);
        }
    });
}
if (process.argv[2] == "movie-this") {
    fs.appendFile("log.txt", newBrk + "\n" + command, function (err) {
        if (err) {
            console.log(err);
        }
    });
    if (process.argv[3] !== undefined) {
        var movie = process.argv[3].toLowerCase();
        movie = movie.split(" ").join("+");
        var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        axios.get(url).then(function (response) {
            forMovie(response);
            writeMovie(response);
            // if no data = Mr.Nobody
        }).catch(function (error) {
            if (error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
        // if no data = Mr.Nobody
    } else if (process.argv[3] == undefined) {
        url = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
        axios.get(url).then(function (response) {
            forMovie(response);
            writeMovie(response);
        }).catch(function (error) {
            if (error.response) {
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
if (process.argv[2] == "do-what-it-says") {
    fs.appendFile("log.txt", newBrk + "\n" + command, function (err) {
        if (err) {
            console.log(err);
        }
    });
    // Take data from random.txt/spotify-this-song
    var criteria;
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        data = data.split(",");
        criteria = { type: 'track', query: data[1], limit: 5 };
        console.log(data[0], data[1]);
        spotify.search(criteria, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            spotifyInput(data);
            spotifyWrite(data);
        });
    });
}
function forMovie(response) {
    // 1) Title of the movie.
    console.log("\nTitle of the movie: " + response.data.Title);
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
function writeMovie(response) {
    total = "\nTitle of the movie: " + response.data.Title +
        "\nRelease year: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry (or countries) of production: " + response.data.Country +
        "\nLanguage(s): " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nActors and Actresses: " + response.data.Actors +
        "\n---------------------------";
    fs.appendFile("log.txt", total, function (err) {
        if (err) {
            console.log(err);
        }
    });
}
function spotifyInput(data) {
    for (var i = 0; i < 5; i++) {
        // 1) Artist(s)
        console.log("\nArtist: " + data.tracks.items[i].album.artists[0].name);
        // 2) The song's name
        console.log("Song name: " + data.tracks.items[i].name);
        // 3) A preview link of the song from Spotify
        console.log("Spotify link: " + data.tracks.items[i].album.external_urls.spotify);
        // 4) The album that the song is from
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("---------------------------");
        // spotifyWrite(command, data);
    }
}
function spotifySign(data) {
    for (var i = 9; i < 10; i++) {
        // 1) Artist(s)
        console.log("\nArtist: " + data.tracks.items[i].album.artists[0].name);
        // 2) The song's name
        console.log("Song name: " + data.tracks.items[i].name);
        // 3) A preview link of the song from Spotify
        console.log("Spotify link: " + data.tracks.items[i].album.external_urls.spotify);
        // 4) The album that the song is from
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("---------------------------");
    }
}
function spotifyWrite(data) {
    for (var i = 0; i < 5; i++) {
        total = "\nArtist: " + data.tracks.items[i].album.artists[0].name +
            "\nSong name: " + data.tracks.items[i].name +
            "\nSpotify link: " + data.tracks.items[i].album.external_urls.spotify +
            "\nAlbum: " + data.tracks.items[i].album.name +
            "\n---------------------------";
        fs.appendFile("log.txt", total, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}
function spotifyWrite2(data) {
    for (var i = 9; i < 10; i++) {
        total = "\nArtist: " + data.tracks.items[i].album.artists[0].name +
            "\nSong name: " + data.tracks.items[i].name +
            "\nSpotify link: " + data.tracks.items[i].album.external_urls.spotify +
            "\nAlbum: " + data.tracks.items[i].album.name +
            "\n---------------------------";
        fs.appendFile("log.txt", total, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}