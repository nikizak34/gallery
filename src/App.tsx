import React from "react";

import { Provider } from "react-redux";
import { store } from "./services/store";
import { Painting } from "./components/Painting";
import s from "./App.module.scss";

function App() {
  return (
    <Provider store={store}>
      <div className={s.App}>
        <Painting />
      </div>
    </Provider>
  );
}

export default App;
