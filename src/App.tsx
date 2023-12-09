import React, { ChangeEvent, useState } from "react";
import { Paintings } from "./components/Paintings/Paintings";
import s from "./App.module.scss";
import { ReactComponent as LogoIcon } from "./assets/image/Frame 238.svg";
import { ReactComponent as ThemeIcon } from "./assets/image/Frame 237.svg";
import {
  AuthorsDataType,
  LocationDataType,
  PaintingDataType,
  useGetAuthorsQuery,
  useGetLocationQuery,
  useGetPaintingFullQuery,
  useGetPaintingQuery,
} from "./services/base-api";
import { useDebounce } from "./hooks/useDebounce";
import { useTheme } from "./hooks/useTheme";
import { SelectComponent } from "./components/Select/Select";
import { Accordion } from "./components/Accordion/Accordion";
import { Pagination } from "./components/Pagination/Pagination";

const ROWS_PER_PAGE = 12;
function App() {
  const { theme, setTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [find, setFind] = useState("");
  const search = useDebounce(find, 1000);
  const [titleAuthorValue, setTitleAuthorValue] = useState("Author");
  const [location, setLocation] = useState("Location");
  const [authorId, setAuthorId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [fromCreated, setFromCreated] = useState("1");
  const [beforeCreated, setBeforeCreated] = useState("3000");
  const fCreated = useDebounce(fromCreated, 1000);
  const bCreated = useDebounce(beforeCreated, 1000);
  const { data: paintingData, isLoading } =
    useGetPaintingQuery<PaintingDataType>({
      currentPage,
      search,
      authorId,
      locationId,
      fCreated,
      bCreated,
    });
  const { data: locationData } = useGetLocationQuery<LocationDataType>();
  const { data: authorData } = useGetAuthorsQuery<AuthorsDataType>();
  const { data } = useGetPaintingFullQuery<PaintingDataType>({
    search,
    authorId,
    locationId,
    fCreated,
    bCreated,
  });
  /* const before = data?.map((el) => +el.created).sort((a, b) => b - a)[0]; */
  const isDark = theme === "dark";
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setFind(e?.target.value);
    setCurrentPage(1);
  };

  const pageNumber = Math.ceil(data?.length / ROWS_PER_PAGE);
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

  const onChangeLocation = (value: string) => {
    setLocation(value);
    setLocationId(
      locationData
        ?.filter((el) => el.location === value)
        .map((el) => el.id)
        .join(""),
    );
    setCurrentPage(1);
  };
  const onChangeFromCreated = (e: ChangeEvent<HTMLInputElement>) => {
    setFromCreated(e.currentTarget.value);
  };
  const onChangeBeforeCreated = (e: ChangeEvent<HTMLInputElement>) => {
    setBeforeCreated(e.currentTarget.value);
  };
  const handleThemeClick = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const removeValueLocation = () => {
    setLocationId("");
    setLocation("Location");
  };
  const removeValueAuthor = () => {
    setAuthorId("");
    setTitleAuthorValue("Author");
  };

  if (isLoading) return <span className="loader" />;
  return (
    <div className={s.App}>
      <div>
        <div
          style={{
            minWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "60px",
            paddingLeft: "5px",
          }}
        >
          <LogoIcon />
          <ThemeIcon onClick={handleThemeClick} className={s.arrowSvg} />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "45px",
            justifyContent: "space-around",
          }}
        >
          <input
            value={find}
            onChange={onChangeText}
            className={s.input}
            placeholder="Name"
            type="text"
          />
          <SelectComponent
            defaultValue="Author"
            onClick={removeValueAuthor}
            options={authorData}
            value={titleAuthorValue}
            onChange={onChangeAuthor}
          />
          <SelectComponent
            defaultValue="Location"
            onClick={removeValueLocation}
            options={locationData}
            value={location}
            onChange={onChangeLocation}
          />
          <Accordion
            valueFromCreated={fromCreated}
            onChange={onChangeFromCreated}
            valueBeforeCreated={beforeCreated}
            onChangeBeforeCreated={onChangeBeforeCreated}
          />
        </div>
        <Paintings paintingData={paintingData} />
        <div className={s.pag}>
          {data?.length > 12 && (
            <Pagination
              currentPage={currentPage}
              onChange={setCurrentPage}
              pageNumber={pageNumber}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
