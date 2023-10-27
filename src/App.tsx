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
  const [titleAuthorValue, setTitleAuthorValue] = useState("");
  const [authorId, setAuthorId] = useState<string>("");
  const { data: paintingData } = useGetPaintingQuery<PaintingDataType>({
    currentPage,
    find,
    authorId,
  });
  const { data: authorData } = useGetAuthorsQuery<AuthorsDataType>();
  const { data } = useGetPaintingFullQuery({ find, authorId });

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setFind(e?.target.value);
    setCurrentPage(1);
  };
  // eslint-disable-next-line no-unsafe-optional-chaining
  const pageNumber = Math.ceil(data?.length / 12);
  const onChangeAuthor = (value: string) => {
    setTitleAuthorValue(value);
    setAuthorId(
      authorData
        ?.filter((el) => el.name === value)
        .map((el) => el.id)
        .join(""),
    );
    setCurrentPage(1);
  };
  const OnClickResetValue = () => {
    setTitleAuthorValue("");
    setAuthorId("");
    setFind("");
  };
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
            value={find}
            onChange={onChangeText}
            className={s.input}
            placeholder="Name"
            type="text"
          />
          <Select
            onChange={onChangeAuthor}
            value={titleAuthorValue}
            placeholder="Author"
            data={authorData}
          />
          <button onClick={OnClickResetValue} type="button">
            res
          </button>
        </div>
        <Paintings paintingData={paintingData} />
        <div
          style={{
            padding: "100px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {data?.length > 12 && (
            <Pagination
              className={s.paginator}
              currentPage={currentPage}
              onChange={setCurrentPage}
              pagesAmount={pageNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
