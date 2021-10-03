import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useEffect, useState } from "react";
import './App.css';
import RecipeContainer from "./components/RecipeContainer";
import Login from "./components/Login";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Router>
      <div className="app-container">
      <Switch>
        <Route exact path="/">
         <RecipeContainer/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
