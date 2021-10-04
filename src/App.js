import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import IngredientContainer from "./components/IngredientContainer";
import RecipeContainer from "./components/RecipeContainer";

function App() {

  return (
    <Router>
      <div className="app-container">
      <Switch>
        <Route exact path="/">
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
