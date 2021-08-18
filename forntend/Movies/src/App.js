import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Movie from "./components/movie";
import AddNewMovie from "./components/AddMovie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/create">
              <AddNewMovie />
            </Route>

            <Route path="/">
              <Movie />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
