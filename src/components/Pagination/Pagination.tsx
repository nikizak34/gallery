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
  onChange: (value: any) => void;
  currentPage: number;
  pageNumber: number;
};

export function Pagination({
  pageNumber,
  onChange,
  currentPage,
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

  const buttonLeft = clsx(Styles.page, disable.left && Styles.disabled);
  const buttonRight = clsx(Styles.page, disable.right && Styles.disabled);
  const arrayL = clsx(Styles.icon, disable.left && Styles.iconDisabled);
  const arrayR = clsx(Styles.icon, disable.right && Styles.iconDisabled);

  return (
    <div className={Styles.paginator}>
      <button
        type="button"
        disabled={disable.left}
        className={buttonLeft}
        onClick={handleFirstPageClick}
        aria-label="arrow left"
      >
        <ArrayDoubleL className={arrayL} />
      </button>
      <button
        className={buttonLeft}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
        aria-label="arrow left"
      >
        <ArrayL className={arrayL} />
      </button>
      {pages.map((el, index) => (
        <Page
          key={index}
          page={el}
          onChange={onChange}
          currentPage={currentPage}
        />
      ))}
      <button
        className={buttonRight}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
        aria-label="arrow right"
      >
        <ArrowR className={arrayR} />
      </button>
      <button
        onClick={handleLastPageClick}
        className={buttonRight}
        type="button"
        disabled={disable.right}
        aria-label="arrow right"
      >
        <ArrayDoubleR className={arrayR} />
      </button>
    </div>
  );
}
