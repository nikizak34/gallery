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
  const [AuthorValue, setAuthorValue] = useState("");
  const [authorId, setAuthorId] = useState<any>("");
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
    setAuthorValue(value);
    setAuthorId(
      Number(
        authorData
          ?.filter((el) => el.name === value)
          .map((el) => el.id)
          .join(""),
      ),
    );
    setCurrentPage(1);
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
            onChange={onChangeText}
            className={s.input}
            placeholder="Name"
            type="text"
          />
          <Select
            onChange={onChangeAuthor}
            value={AuthorValue}
            placeholder="Author"
            data={authorData}
          />
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
