import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configurationStore from "store/store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const Main = () => {
  return (
    <Provider store={configurationStore()}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
