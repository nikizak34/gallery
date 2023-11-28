import React, { ChangeEvent, useState } from "react";
import { Pagination, Select } from "fwt-internship-uikit";
import { Paintings } from "./components/Paintings/Paintings";
import s from "./App.module.scss";
import { ReactComponent as Logo } from "./assets/image/Frame 238.svg";
import { ReactComponent as Theme } from "./assets/image/Frame 237.svg";
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
import { SelectS } from "./components/Select/Select";
import { AccordionComponent } from "./components/Accordion/Accordion";

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
  const { data: paintingData } = useGetPaintingQuery<PaintingDataType>({
    currentPage,
    search,
    authorId,
    locationId,
    fromCreated,
    beforeCreated,
  });
  const { data: locationData } = useGetLocationQuery<LocationDataType>();
  const { data: authorData } = useGetAuthorsQuery<AuthorsDataType>();
  const { data } = useGetPaintingFullQuery<PaintingDataType>({
    search,
    authorId,
    locationId,
    fromCreated,
    beforeCreated,
  });
  /* const before = data?.map((el) => +el.created).sort((a, b) => b - a)[0]; */

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
  const handleThemeClick = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const dark = theme === "dark";
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
          }}
        >
          <Logo />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <Theme onClick={handleThemeClick} className={s.arrowSvg} />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
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
            isDarkTheme={dark}
            value={titleAuthorValue}
            disabled={false}
            options={authorData}
          />{" "}
          <SelectS
            data={locationData}
            value={location}
            onChange={onChangeLocation}
          />
          <AccordionComponent
            valueFromCreated={fromCreated}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFromCreated(e.currentTarget.value)
            }
            valueBeforeCreated={beforeCreated}
            onChangeBeforeCreated={(e: ChangeEvent<HTMLInputElement>) =>
              setBeforeCreated(e.currentTarget.value)
            }
          />
        </div>
        <Paintings paintingData={paintingData} />
        <div className={s.pag}>
          {data?.length > 12 && (
            <Pagination
              isDarkTheme={dark}
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
