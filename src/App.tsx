import React, { ChangeEvent, useState } from "react";
import { Pagination } from "fwt-internship-uikit";
import { Paintings } from "./components/Paintings/Paintings";
import s from "./App.module.scss";
import {
  AuthorsDataType,
  PaintingDataType,
  useGetAuthorsQuery,
  useGetPaintingFullQuery,
  useGetPaintingQuery,
} from "./services/base-api";
import { Select } from "./components/Select/Select";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [find, setFind] = useState("");
  const { data: paintingData } = useGetPaintingQuery<PaintingDataType>({
    currentPage,
    find,
  });
  const { data: authorData } = useGetAuthorsQuery<AuthorsDataType>();
  const { data } = useGetPaintingFullQuery(find);
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setFind(e?.target.value);
  };
  // eslint-disable-next-line no-unsafe-optional-chaining
  const page = Math.ceil(data?.length / 12);

  return (
    <div className={s.App}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "50px 0",
          }}
        >
          <input
            onChange={onChangeText}
            className={s.input}
            placeholder="Name"
            type="text"
          />
          <Select authorData={authorData} />
        </div>
        <Paintings paintingData={paintingData} />
        <div style={{ padding: "100px" }}>
          <Pagination
            className={s.paginator}
            currentPage={currentPage}
            onChange={setCurrentPage}
            pagesAmount={page}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
