import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddPackages from './Components/AddFlightPackages/Packages/AddPackages';
import BookingFlight from './Components/BookingFlight/BookingFlight';
import Header from './Components/Home/Header/Header';
import Home from './Components/Home/Home/Home';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute';



export const UserContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});



  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >

      <Router>
        <Header />

        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/addPack">
            <AddPackages />
          </Route>
          <Route exact path="/book">
            <BookingFlight />
          </Route>

          <Route path="/book/:id">
            <BookingFlight />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
