import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../components/actions/authActions";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import Loader from "../components/ui/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <Loader />;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={!!uid}
            exact
            path="/login"
            component={LoginScreen}
          />
          <PrivateRoute
            isAuthenticated={!!uid}
            exact
            path="/"
            component={CalendarScreen}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
