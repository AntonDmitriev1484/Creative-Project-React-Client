import React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import {create_user, login} from '../api-fetch/api-user.js'

function Home(props) {

    const [info, setInfo] = useState({username:"", password:""});
    
    return (

                <Card color = "primary" variant = "outlined">
                    <Typography variant="h1">Home</Typography>
                    <Card color = "secondary" variant = "outlined">
                        <Typography variant="h4">Login</Typography>

                        <TextField  label="Username" id="login-username" variant= "outlined"
                            onChange = { //Each time this text field is changed, onChange is called , and an event object is passed to the function
                                (event)=>{
                                    console.log("username "+event.target.value);
                                    //setInfo('name',event.target.value);
                                    const temp = info.password;
                                    setInfo({username: event.target.value, password: temp});
                                    console.log(info);
                                }
                            }/>

                        <TextField label="Password" id="login-password" variant= "outlined"
                            onChange = { //Constantly causing state to re-render, but thats fine for now
                                (event)=>{
                                    console.log("password "+event.target.value);
                                    const temp = info.username;
                                    setInfo({username: temp, password: event.target.value});
                                }
                                
                            }/>

                        <Button 
                            color="secondary" variant="contained"
                            onClick= {  async () => {
                                console.log('Login');
                                console.log(info);
                               
                                let response = await login(info);
                                console.log(response);
                                console.log(JSON.stringify(response));
                                
                                }
                            } >Enter</Button>


                    </Card>
                    <Card color = "secondary" variant = "outlined">
                        <Typography variant="h4">Register</Typography>

                        <TextField label="Username" variant= "outlined"/>
                        <TextField label="Password" variant= "outlined"/>
                        <Button color = "secondary" variant="contained" 
                            onClick= { () => {
                                    console.log('Register');
                            }} >Submit</Button>

                    </Card>
                </Card>

        
            );

}

export default Home;