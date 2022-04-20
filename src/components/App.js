import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test_component from './Test.js'
import Home from './Home.js'
import mui_theme from '../styles/mui_theme.js'
import { ThemeProvider} from '@mui/material/styles';
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import { ThemeProvider } from "@mui/styles";
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

//Don't need to use .jsx file extensions
//Since I'm using react hooks, I need to write App as a function
//For the react hook component to work you need to import React in its file

//import { createTheme } from '@mui/material/styles';


function App(props) {

    //Ok, I think I got MUI to finally fucking work
    //No idea why dark mode is being a piece of shit


    //Since MUI relies on react context to pass itself down to components
    //the entire react app needs to be wrapped in a MUI theme tag

    //Can also use the following syntax for routes: https://v5.reactrouter.com/web/example/basic

    return (
        <BrowserRouter>
            <ThemeProvider theme={mui_theme}>
                <Routes>
                    <Route exact path = "/" element= {<Home/>}/>
                    <Route exact path = "client/test"  element= {<Test_component/>}/>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
            

    )


}

export default App;

//I'll use export default for each React component since there will only be 1 component function per file