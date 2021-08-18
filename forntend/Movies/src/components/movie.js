import React, { useState, useEffect } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
// material ui use style
const useStyles = makeStyles((theme) => ({
    Gridroot: {
        flexGrow: 1,
    },
    Cardroot: {
        maxWidth: 250,
    },

    media: {
        height: 350,
        objectFit: "contain",
        width: "100%",
    },
    SeachBarRoot: {
        padding: "2px 4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },

}));

export default function Movies() {
    //styling
    const classes = useStyles();
    //use to link
    const history = useHistory();
    //set error to null
    const [error, setError] = useState(null);
    //set movies to render all movies
    const [movies, setmovies] = useState([]);
    //set movie data store a duplicate for search to reset
    const [movieData, setMovieData] = useState([]);
    //set loading default false 
    const [isLoaded, setIsLoaded] = useState(false);
    //set search with a empty string
    const [search, setsearch] = useState("");
    //set result message to empty string
    const [resultM, setResult] = useState("");
    //  the empty deps array [] means
    // this useEffect will run once
    useEffect(() => {
        //get data from api
        axios
            .get("http://localhost:8080/movie/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(
                (res) => {
                    console.log(res);
                    // load is true 
                    setIsLoaded(true);
                    //store all the movies
                    setmovies(res.data.data);
                    //store a duplicate for search to reset
                    setMovieData(res.data.data);
                }

            ).catch(function (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            });
    }, []);

    //check if token exists
    //get token  
    const token = localStorage.getItem("token");

    //if not Redirect to login
    if (!token)
        return (
            <Redirect
                to={{
                    pathname: "/login",
                }}
            />
        );
    //show error 
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Movies</h1>
            <Button
                style={{ margin: 20 }}
                variant="contained"
                type="submit"
                color="primary"
                onClick={() => {
                    localStorage.removeItem("token");
                    history.replace("/login");
                }}
            >
                Logout
            </Button>

            <Link to="/create">

                <Button
                    style={{ margin: 20 }}
                    variant="contained"
                    type="submit"
                    color="primary"
                >
                    Add New Movie
                </Button>
            </Link>

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 15,
                }}
            >
                <Paper className={classes.SeachBarRoot}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Movies"
                        inputProps={{ "aria-label": "search movie" }}

                        onChange={(e) => {
                            //get input value
                            const val = e.target.value;
                            console.log(val)
                            //set to the state search 
                            setsearch(val);
                            console.log(movieData)
                            //if search value is greater than 2 start seach
                            if (val.length > 2) {
                                //filter by name and conver the val and move data to lowercase and show result
                                const results = movieData.filter((movie) => {
                                    //this starts with any first 3 letters means
                                    return movie.name.toLowerCase().includes(val.toLowerCase());
                                    //search start with first 3 letters
                                    // return movie.name.toLowerCase().startsWith(val.toLowerCase());

                                });
                                console.log(results.length);
                                //show search result
                                setmovies(results);
                                //result array length is 0 then print this message
                                if (results.length === 0) {

                                    const resultMessage = "Movie Not Found!!"
                                    setResult(resultMessage);

                                }
                            } else {
                                //reset data if search value if less than or equal 2
                                setmovies(movieData);
                            }

                        }}
                    />

                    <SearchIcon />

                </Paper>
            </div>

            <div className={classes.Gridroot}>
                <Grid container className={classes.Gridroot} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={3}>
                            {movies.map((movie) => {
                                return (
                                    <Grid key={movie.id} item>
                                        <Card className={classes.Cardroot}>
                                            <img
                                                className={classes.media}
                                                src={movie.imageURL}
                                                alt="Logo"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {movie.name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>

                <div>{resultM}</div>

            </div>
        </div>
    );
}
