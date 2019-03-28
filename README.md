# liri-node-app

## What liri-node-app project does ##
####liri-node-app's functionalities:####
The application utilizes node.js to take input from the terminal in the form of arguments. Then the input is formatted in a way that can be implimented in a query string for API calls. Axios is used to make all of the application's API calls except for calling Spotify.
Spotify API calls require an id and a secret.
Returned values that resemble dates are reformatted with [moment.js](https://momentjs.com/ "Moment.js Website).
The application also reads text from a file and passes the text through a query string to make an API call. Results from all calls and commands are appended in [log.txt](/log.txt).
####Examples of liri-node-app's functionality:####
Each screenshot showcases the returned and formatted data printed to the terminal and to a txt file.
* The 'concert-this' command makes a call (with the fourth argument in the command line as a value in the URL's query string) to BandsinTown's API and returns the data as displayed in the screenshot.
![The 'concert-this' command](/images/concertThis.jpg)
* The 'do-what-it-says' command reads text from [random.txt](/random.txt) and separates the strings. The song title is passed through spotify's API call.
![The do-what-it-says command](/images/doWhatItSays.jpg)
* The 'movie-this' command with an undefined fourth argument will, by default, make an API call to OMDB with Mr. Nobody as the value in the query string.
![The movie-this command (with an undefined fourth argument)](/images/movieThis.jpg)
* When the fourth argument is defined, the application will pass it as a reformatted, query-string-friendly string in the URL. This screenshot displays data retrieved from OMDB.
![The movie-this command (with a defined fourth argument)](images/movieThisTheDarkKnight.jpg)
* The 'spotify-this-song' makes a call to Spotify's API using the fourth argument. The fourth argument is passed into the .search() method unformatted. Spotify's method does not require the user to 'build' the URL. Rather the values are simply assigned to the parameters within the method. The default value (if no fourth argument is provided) is "The Sign" by Ace of Base.
![The spotify-this-song (with an undefined fourth argument)](images/spotifyThisSong.jpg)
* The last demonstration is that of the 'spotify-this-song' command with a defined fourth argument. In this example, "Snow" is typed as the fourth argument.
![The spotify-this-song (with a defined fourth argument)](images/spotifyThisSongSnow.jpg)
## Why liri-node-app is useful
The application retrieves and prints data in an easy-to-read format for the user. Data is retrieved from spotify's API, BandsinTown's API and OMDB's API.

## How users can get started with liri-node-app
Users can get started with liri-node-app by installing node, creating a JSON file and installing the appropriate packages. See the top of [liri.js](/liri.js) to see what dependencies are required.
Enter commands into the terminal in the format:
node [file name] [liri-node-app-specific command] [searched term]

## Where users can get help with liri-node-app
Developer Wesley Berry's email: wesleyberry52@gmail.com

## Who maintains and contributes to liri-node-app
Wesley Berry maintains and contributes to liri-node-app.
Find Wesley Berry on [LinkedIn](https://www.linkedin.com/in/wesley-berry-89742317a), [GitHub](https://github.com/wesleyberry), or check out his [online portfolio](https://wesleyberry.github.io/Responsive-Portfolio/).