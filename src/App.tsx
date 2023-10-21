import React, { useState } from "react";
import { Pagination } from "fwt-internship-uikit";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { Paintings } from "./components/Painting";
import s from "./App.module.scss";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Provider store={store}>
      <div className={s.App}>
        <div className={s.container}>
          <Paintings currentPage={currentPage} />
          <Pagination
            // className={s.}
            currentPage={currentPage}
            onChange={setCurrentPage}
            pagesAmount={3}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
