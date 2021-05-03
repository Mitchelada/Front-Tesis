import React from "react";
import {
  BrowserRouter as Router,
    Route,
  Switch
} from "react-router-dom";
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/Registro";
import { DrawerNav } from "../ui/DrawerNav";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path={'/login'}
                        component={LoginScreen}
                    />
                    <Route
                        exact
                        path={'/signup'}
                        component={RegisterScreen}
                    />
                    <Route 
                        path={'/'}
                        component={DrawerNav}
                    />
                </Switch>
            </div>
        </Router>
    )
}
