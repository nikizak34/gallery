import React from "react";
import clsx from "clsx";
import Styles from "./Pagination.module.scss";
import { ReactComponent as ArrowR } from "../../assets/image/ArrayR.svg";
import { ReactComponent as ArrayDoubleR } from "../../assets/image/ArrayDoubleR.svg";
import { ReactComponent as ArrayDoubleL } from "../../assets/image/ArrayDoubleL.svg";
import { ReactComponent as ArrayL } from "../../assets/image/ArrayL.svg";
import { createPages } from "../../utils/create-pages";

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

  const buttonLeft = disable.left
    ? `${Styles.page} ${Styles.disabled}`
    : Styles.page;
  const buttonRight = disable.right
    ? `${Styles.page} ${Styles.disabled}`
    : Styles.page;
  const arrayL = disable.left
    ? `${Styles.icon} ${Styles.iconDisabled}`
    : Styles.icon;
  const arrayR = disable.right
    ? `${Styles.icon} ${Styles.iconDisabled}`
    : Styles.icon;
  const mappedPage = pages.map((el, index) => (
    <button
      type="button"
      key={index}
      onClick={() => onChange(el)}
      /*    currentPage === el
          ? Styles.pageActive
: isDark
        ? `${Styles.page} ${Styles.dark}`
        : Styles.page */
      className={clsx(
        Styles.page,
        currentPage === el && Styles.pageActive,
        currentPage === el &&
          isDark &&
          Styles.pageActive &&
          Styles.darkActivePage,
        isDark && Styles.dark,
      )}
    >
      {el}
    </button>
  ));

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
      {mappedPage}
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
