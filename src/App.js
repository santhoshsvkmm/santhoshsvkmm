import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { globalLanguage } from "store/reducers/settings/language";
import Home from "./views/home";
import Error from "./views/error";
import AppLocale from "./lang";

const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user")
);

const useStore = () => {
  const dispatch = useDispatch();
  return {
    actions: {
      globalLanguage: (payload) => dispatch(globalLanguage(payload)),
    },
    values: {
      language: useSelector((state) => state.settings),
    },
  };
};

const App = () => {
  const { actions: serviceActions } = useStore();

  React.useEffect(() => {
    serviceActions.globalLanguage("en-US");
  });

  return (
    <div className="h-100">
      <IntlProvider locale="en-US" messages={AppLocale.en.messages}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user" render={(props) => <ViewUser {...props} />} />
            <Route path="" component={Error} />
          </Switch>
        </Router>
      </IntlProvider>
    </div>
  );
};
export default App;
