import './App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Homes from './Home/Home';
import Search from './Search/Search';
import login from './Login/Login';
import Navbar from "./components/Navbar";

// function logout() {
//   sessionStorage.removeItem("token");
//   window.location = window.location.origin;
// }

function App() {
  return (
   <div>
     <BrowserRouter>
     <Navbar />
      <Switch>
          <Route exact path='/' component={Homes} />
          <Route exact path='/login' component={login} />
          <Route exact path='/search' component={Search} />
          {/* <Route exact path='/logout' component={onclick = (logout)} /> */}
       </Switch>
     </BrowserRouter>
   </div>
  );
}

export default App;
