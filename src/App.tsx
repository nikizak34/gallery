import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { Painting } from "./components/Painting";

function App() {
  return (
    <Provider store={store}>
      <Painting />
    </Provider>
  );
}

export default App;
