import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navigation from "./Components/Shared/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/AuthProvider";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Watches from "./Components/Watches/Watches";
import Purchase from "./Components/Purchase/Purchase";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashBoard from "./Components/DashBoard/DashBoard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import NotFound from "./Components/NotFound/NotFound";
import AdminRoute from "../src/AdminRoute/AdminRoute";
import Footer from "./Components/Shared/Footer/Footer";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Navigation />
              <Home />
              <Footer />
            </Route>
            <Route path="/home">
              <Navigation />
              <Home />
              <Footer />
            </Route>
            <Route path="/watches">
              <Navigation />
              <Watches />
              <Footer />
            </Route>
            <PrivateRoute path="/dashboard">
              <DashBoard />
            </PrivateRoute>
            <AdminRoute path="/admin">
              <AdminDashboard />
            </AdminRoute>
            <PrivateRoute path="/purchase/:id">
              <Navigation />
              <Purchase />
              <Footer />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
