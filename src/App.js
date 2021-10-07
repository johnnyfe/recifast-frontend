import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import HomePage from "./components/HomePage";
import IngredientContainer from "./components/IngredientContainer";
import NavBar from "./components/NavBar";
import RecipeContainer from "./components/RecipeContainer";

function App() {

  return (
    <Router>
      <div className="app-container">
      <NavBar />
      <Switch>
        <Route exact path="/">
         <HomePage/>
        </Route>
        <Route exact path="/recipes">
         <RecipeContainer/>
        </Route>
        <Route exact path="/ingredients">
          <IngredientContainer/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
