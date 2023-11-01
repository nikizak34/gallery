import React, { ChangeEvent, useState } from "react";
import { Pagination, Select } from "fwt-internship-uikit";
import { Paintings } from "./components/Paintings/Paintings";
import s from "./App.module.scss";
import logo from "./assets/image/Frame 238.svg";
import theme from "./assets/image/Frame 237.svg";
import {
  AuthorsDataType,
  PaintingDataType,
  useGetAuthorsQuery,
  useGetPaintingFullQuery,
  useGetPaintingQuery,
} from "./services/base-api";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [find, setFind] = useState("");
  const [titleAuthorValue, setTitleAuthorValue] = useState("Author");
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
  return (
    <div className={s.App}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "35px",
          }}
        >
          <div>
            <img src={logo} alt="" />
          </div>
          <div style={{ paddingLeft: "1040px" }}>
            <img src={theme} alt="" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            margin: "10px",
            marginBottom: "45px",
            justifyContent: "center",
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
            isDarkTheme={false}
            value={titleAuthorValue}
            disabled={false}
            options={authorData}
          />{" "}
          <Select
            onChange={onChangeAuthor}
            isDarkTheme={false}
            value={titleAuthorValue}
            disabled={false}
            options={authorData}
          />{" "}
          <Select
            onChange={onChangeAuthor}
            isDarkTheme={false}
            value={titleAuthorValue}
            disabled={false}
            options={authorData}
          />
        </div>
        <Paintings paintingData={paintingData} />
        <div className={s.pag}>
          {data?.length > 12 && (
            <Pagination
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
