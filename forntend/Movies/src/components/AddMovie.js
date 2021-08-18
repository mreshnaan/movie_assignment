import React, { useState } from "react";
import "./login.css";
import { Paper, Grid, Avatar, TextField, Button } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

export default function AddMovie() {
    //to link 
    const history = useHistory();
    //
    const [name, setName] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    //auth check
    //check the token exsists
    const token = localStorage.getItem("token");
    //if not redirect to login
    if (!token)
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: {},
                }}
            />
        );

    const paperStyle = {
        padding: 50,
        height: "70vh",
        width: 350,
        margin: "50 auto",
    };
    const AvatarStyle = { backgroundColor: "green" };
    const spacing = { margin: 6 };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    {/* header section for login */}
                    <Grid style={spacing} align="center">
                        <Avatar style={AvatarStyle}></Avatar>
                        <h3>Create Movie</h3>
                    </Grid>
                    <form
                        onSubmit={(e) => {
                            //add data to api
                            // stop forms from automatically submitting when the submit button is clicked
                            e.preventDefault();
                            axios
                                .post(
                                    "http://localhost:8080/movie/",
                                    {
                                        name: name,
                                        imageURL: imageURL,
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                )
                                .then((res) => {
                                    console.log(res.data);
                                    const { data } = res;
                                    console.log(data);
                                    if (data.statusCode !== 201) {
                                        alert("Movie Already Exists");
                                    } else {
                                        alert("Movie Successfully Added!!")
                                        history.push("/");

                                    }
                                })
                                .catch((err) => {
                                    alert(err.message)

                                    console.log(err.message);
                                });
                        }}
                    >
                        <TextField
                            style={spacing}
                            variant="outlined"
                            label="Name"
                            placeholder="Enter Your Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            style={spacing}
                            variant="outlined"
                            label="URL"
                            placeholder="Past Your Image URL"
                            onChange={(e) => setImageURL(e.target.value)}
                            required
                            fullWidth
                        />

                        <Button
                            style={spacing}
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                        >
                            Add New
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}
