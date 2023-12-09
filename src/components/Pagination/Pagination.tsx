import React from "react";
import clsx from "clsx";
import Styles from "./Pagination.module.scss";
import { ReactComponent as ArrowR } from "../../assets/image/ArrayR.svg";
import { ReactComponent as ArrayDoubleR } from "../../assets/image/ArrayDoubleR.svg";
import { ReactComponent as ArrayDoubleL } from "../../assets/image/ArrayDoubleL.svg";
import { ReactComponent as ArrayL } from "../../assets/image/ArrayL.svg";
import { createPages } from "../../utils/create-pages";
import { Page } from "./Page/Page";

type PaginationProps = {
  onChange: (currentPage: number) => void;
  currentPage: number;
  pageNumber: number;
  isDark: boolean;
};

export function Pagination({
  pageNumber,
  onChange,
  currentPage,
  isDark,
}: PaginationProps) {
  const disable = {
    left: currentPage === 1,
    right: currentPage === pageNumber,
  };
  const pages: number[] = [];
  createPages(pages, pageNumber, currentPage);

  const handleNextPageClick = () => {
    onChange(currentPage + 1);
  };
  const handlePrevPageClick = () => {
    onChange(currentPage - 1);
  };
  const handleFirstPageClick = () => {
    onChange(1);
  };
  const handleLastPageClick = () => {
    onChange(pageNumber);
  };

  const buttonLeft = clsx(
    Styles.page,
    disable.left && Styles.disabled,
    isDark && Styles.dark,
  );
  const buttonRight = clsx(
    Styles.page,
    disable.right && Styles.disabled,
    isDark && Styles.dark,
  );
  const arrayL = clsx(
    Styles.icon,
    disable.left && Styles.iconDisabled,
    isDark && Styles.darkIcon,
  );
  const arrayR = clsx(
    Styles.icon,
    disable.right && Styles.iconDisabled,
    isDark && Styles.darkIcon,
  );

  return (
    <div className={Styles.paginator}>
      <button
        type="button"
        disabled={disable.left}
        className={buttonLeft}
        onClick={handleFirstPageClick}
      >
        <ArrayDoubleL className={arrayL} />
      </button>
      <button
        className={buttonLeft}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        <ArrayL className={arrayL} />
      </button>
      {pages.map((el, index) => (
        <Page
          key={index}
          page={el}
          onChange={onChange}
          currentPage={currentPage}
          isDark={isDark}
        />
      ))}
      <button
        className={buttonRight}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        <ArrowR className={arrayR} />
      </button>
      <button
        onClick={handleLastPageClick}
        className={buttonRight}
        type="button"
        disabled={disable.right}
      >
        <ArrayDoubleR className={arrayR} />
      </button>
    </div>
  );
}
