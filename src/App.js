import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useEffect, useState } from "react";
import './App.css';
import RecipeContainer from "./components/RecipeContainer";
import Login from "./components/Login";
import { BASE_URL } from "./constrains";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch(BASE_URL + "me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(user)

  // if (!user) return <Login onLogin={setUser} />;

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
