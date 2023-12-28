import React, { ChangeEvent } from "react";
import { Paintings } from "./components/Paintings/Paintings";
import s from "./App.module.scss";
import LogoIcon from "./assets/image/Frame 238.svg?react";
import ThemeIcon from "./assets/image/Frame 237.svg?react";
import {
  AuthorsData,
  LocationData,
  PaintingData,
  useGetAuthorsQuery,
  useGetLocationQuery,
  useGetPaintingFullPageQuery,
  useGetPaintingQuery,
} from "./services/base-api";
import { useDebounce } from "./hooks/useDebounce";
import { useTheme } from "./hooks/useTheme";
import { SelectComponent } from "./components/Select/Select";
import { Accordion } from "./components/Accordion/Accordion";
import { Pagination } from "./components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "./services/store";
import {
  changeAuthorId,
  changeAuthorValue,
  changeBeforeCreated,
  changeCurrentPage,
  changeFind,
  changeFromCreated,
  changeLocationId,
  changeLocationValue,
} from "./services/Painting.reducer";
import { Loader } from "./components/Loader/Loader";

const ROWS_PER_PAGE = 12;

function App() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector<number>(
    (state) => state.painting.currentPage,
  );
  const find = useAppSelector<string>((state) => state.painting.find);
  const authorValue = useAppSelector<string>(
    (state) => state.painting.authorValue,
  );
  const location = useAppSelector<string>((state) => state.painting.location);
  const authorId = useAppSelector<string>((state) => state.painting.authorId);
  const locationId = useAppSelector<string>(
    (state) => state.painting.locationId,
  );
  const fromCreated = useAppSelector<string>(
    (state) => state.painting.fromCreated,
  );
  const beforeCreated = useAppSelector<string>(
    (state) => state.painting.beforeCreated,
  );

  const search = useDebounce(find, 1000);
  const fCreated = useDebounce(fromCreated, 1000);
  const bCreated = useDebounce(beforeCreated, 1000);

  const { setTheme } = useTheme();

  const { data: paintingData, isLoading } = useGetPaintingQuery<PaintingData>({
    currentPage,
    search,
    authorId,
    locationId,
    fCreated,
    bCreated,
  });
  const { data: locationData } = useGetLocationQuery<LocationData>();
  const { data: authorData } = useGetAuthorsQuery<AuthorsData>();
  const { data } = useGetPaintingFullPageQuery<PaintingData>({
    search,
    authorId,
    locationId,
    fCreated,
    bCreated,
  });

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFind({ find: e?.target.value }));
    dispatch(changeCurrentPage({ currentPage: 1 }));
  };

  const onChangeAuthor = (value: string) => {
    const id = authorData
      ?.filter((el) => el.name === value)
      .map((el) => el.id)
      .join("");
    dispatch(changeAuthorId({ authorId: id }));
    dispatch(changeAuthorValue({ authorValue: value }));
    dispatch(changeCurrentPage({ currentPage: 1 }));
  };

  const onChangeLocation = (value: string) => {
    const id = locationData
      ?.filter((el) => el.location === value)
      .map((el) => el.id)
      .join("");
    dispatch(changeLocationId({ locationId: id }));
    dispatch(changeLocationValue({ location: value }));
    dispatch(changeCurrentPage({ currentPage: 1 }));
  };
  const onChangeFromCreated = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFromCreated({ fromCreated: e.currentTarget.value }));
  };
  const onChangeBeforeCreated = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeBeforeCreated({ beforeCreated: e.currentTarget.value }));
  };
  const handleThemeClick = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const removeValueLocation = () => {
    dispatch(changeLocationId({ locationId: "" }));
    dispatch(changeLocationValue({ location: "Location" }));
  };
  const removeValueAuthor = () => {
    dispatch(changeAuthorId({ authorId: "" }));
    dispatch(changeAuthorValue({ authorValue: "Author" }));
  };

  const pageNumber = Math.ceil(data?.length / ROWS_PER_PAGE);
  const onChangePagination = (value: number) => {
    dispatch(changeCurrentPage({ currentPage: value }));
  };

  if (isLoading) return <Loader />;
  return (
    <div className={s.App}>
      <div>
        <div className={s.IconBlock}>
          <LogoIcon className={s.logo} />
          <ThemeIcon onClick={handleThemeClick} className={s.arrowSvg} />
        </div>
        <div className={s.filtrationBlock}>
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
            value={authorValue}
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
        <div className={s.paginator}>
          {data?.length > 12 && (
            <Pagination
              currentPage={currentPage}
              onChange={onChangePagination}
              pageNumber={pageNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
