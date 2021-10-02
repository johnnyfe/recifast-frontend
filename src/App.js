import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import RecipeContainer from "./components/RecipeContainer";

function App() {
  return (
    <Router>
      <div className="app-container">
      <Switch>
        <Route exact path="/recipes">
         <RecipeContainer/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
