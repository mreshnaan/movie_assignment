import React, { useState } from 'react';
import './login.css';
import { Paper, Grid, Avatar, TextField, Button, Typography } from '@material-ui/core';
import { useHistory,Link, Redirect } from 'react-router-dom';
import axios from "axios";




export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    //auth checker
    const token = localStorage.getItem("token");
    //check if token exists
    //if exists redirect to movie
    if (token)
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: {},
                }}
            />
            
        );


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
                        <h5>LogIn</h5>

                    </Grid>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        axios.post("http://localhost:8080/user/login", {
                            email: email,
                            password: password
                        }).then(res => {
                            console.log(res.data)
                            const { data } = res;
                            console.log(data)
                            if (data.statusCode !== 201) {
                                alert("Incorrect username or password")
                            } else {
                                //store token
                                console.log(data.data.token)
                                alert("Login Success!!")
                                localStorage.setItem('token', data.data.token); 
                                //if login success go to movie    
                                history.push("/");
                
                                
                            }

                        }).catch(err => {

                            console.log(err.message);
                        })

                    }}>
                        <TextField style={spacing} variant="outlined" label="email" placeholder="enter Email" type="email" onChange={e => setEmail(e.target.value)} required fullWidth />

                        <TextField style={spacing} variant="outlined" label="password" placeholder="enter password" type="password" onChange={e => setPassword(e.target.value)} required fullWidth />
                        <Button style={spacing} variant="contained" type="submit" color="primary" fullWidth >Login</Button>
                        <Typography style={spacing} >Do you have a account?
                            <Link to="/register" >Register</Link>
                        </Typography>
                    </form>
                </Paper>
            </Grid>
        </div >
    );
}
