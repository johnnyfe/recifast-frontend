import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useEffect, useState } from "react";
import './App.css';
import RecipeContainer from "./components/RecipeContainer";
import Login from "./components/Login";
import { BASE_URL } from "./constrains";
import NavBar from "./components/NavBar";

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

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      <main>
        <Switch>
          <Route exact path="/">
          <RecipeContainer/>
          </Route>
        </Switch>
      </main>
      
    </>
  )
}

export default App;
