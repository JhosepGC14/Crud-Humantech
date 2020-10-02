import React from "react";
import Movie from "../src/components/MovieTable/Movie";
import Shift from "../src/components/ShiftComponents/Shift";
import AddShifForm from "../src/components/ShiftComponents/AddShiftForm"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Movie />
        </Route>
        <Route exact path="/turnos/:id">
          <Shift />
        </Route>
        <Route exact path="/registrar/:id">
          <AddShifForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
