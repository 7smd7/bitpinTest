import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markets from './conteiners/Markets';
import { getCookie ,setCookie } from './service/cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  if (getCookie("fav")=="")
    setCookie("fav", JSON.stringify([]),9999999999);
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 5 }}>
        <Router>
          <Switch>
            <Route path="/markets/">
              <Markets/>
            </Route>
            <Route path="/">
              <Redirect to="/markets/" />;
            </Route>
          </Switch>  
        </Router>
      </Box>
    </Container>
  );
}
