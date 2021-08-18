import React, { useState } from 'react';
import './login.css';
import { Paper, Grid, Avatar, TextField, Button, Typography } from '@material-ui/core';
import { useHistory, Link, Redirect } from 'react-router-dom';
import axios from "axios";



export default function Register() {
    //
    const history = useHistory();
    //
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    //auth checker
    const token = localStorage.getItem("token");
    if (token)
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: {},
                }}
            />

        );
    //styles
    const paperStyle = { padding: 50, height: '70vh', width: 350, margin: "50 auto", }
    const AvatarStyle = { backgroundColor: 'green' }
    const spacing = { margin: 6 }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: "100%", width: "100%" }}>

            <Grid >

                <Paper elevation={10} style={paperStyle}>
                    {/* header section for login */}
                    <Grid style={spacing} align='center'>
                        <Avatar style={AvatarStyle}></Avatar>
                        <h3>Register</h3>

                    </Grid>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        axios.post("http://localhost:8080/user/", {
                            name: name,
                            email: email,
                            password: password
                        }).then(res => {
                            console.log(res.data)
                            const { data } = res;
                            console.log(data)
                            if (data.statusCode !== 201) {
                                alert("Incorrect username or password")
                            } else {
                                
                                alert("Successfully Registered!!!")

                                history.push("/");


                            }

                        }).catch(err => {

                            console.log(err.message);
                        })

                    }}>
                        <TextField style={spacing} variant="outlined" label="Name" placeholder="Enter Your Name" onChange={e => setName(e.target.value)} required fullWidth />

                        <TextField style={spacing} variant="outlined" label="Email" placeholder="Enter Your Email" type="email" onChange={e => setEmail(e.target.value)} required fullWidth />

                        <TextField style={spacing} variant="outlined" label="password" placeholder="Enter Password" type="password" onChange={e => setPassword(e.target.value)} required fullWidth />
                        <Button style={spacing} variant="contained" type="submit" color="primary" fullWidth >Login</Button>
                        <Typography style={spacing} >already have a account?
                            <Link to="/login" >Login</Link>
                        </Typography>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}


