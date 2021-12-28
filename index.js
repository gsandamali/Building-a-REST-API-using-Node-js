const express = require('express');

const app = express();
const port = 3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let movies = [{
    id: "1",
    title: "ABC",
    director: "director1",
    release_date: "2020-09-03",
},
{
    id: "2",
    title: "EFG",
    director: "director2",
    release_date: "2021-12-03",
},
];

//get the movie list  in the form of JSON
app.get('/movies', (req, res) => {
    res.json(movies);
});

//add the movie to the list
app.post('/movies', (req, res) => {
    const movie = req.body;

    console.log(movie);
    movies.push(movie);
    res.send("Movie is added to the list");
});

//search for a movie in the list
app.get("/movies/:id",(req,res) => {
    const id = req.params.id;

    for (let movie of movies){
        if(movie.id === id) {
            res.json(movie)
            return
        }
    }
    res.status(404).send('Movie not found');
});

//remove movie from the list
app.delete("/movies/:id", (req,res) => {
    const id= req.params.id;

    movies = movies.filter(movie => {
        if (movie.id !== id){
            return true
        }
        return false
    });
    res.send('Movie is deleted')
});

//set the server to listen at port
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));