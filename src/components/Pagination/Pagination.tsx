import React from "react";
import clsx from "clsx";
import Styles from "./Pagination.module.scss";
import ArrowR from "../../assets/image/ArrayR.svg?react";
import ArrayDoubleR from "../../assets/image/ArrayDoubleR.svg?react";
import ArrayDoubleL from "../../assets/image/ArrayDoubleL.svg?react";
import ArrayL from "../../assets/image/ArrayL.svg?react";
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

  const classNames = {
    buttonLeft: clsx(Styles.page, disable.left && Styles.disabled),
    buttonRight: clsx(Styles.page, disable.right && Styles.disabled),
    arrayL: clsx(Styles.icon, disable.left && Styles.iconDisabled),
    arrayR: clsx(Styles.icon, disable.right && Styles.iconDisabled),
  };

  return (
    <div className={Styles.paginator}>
      <button
        type="button"
        disabled={disable.left}
        className={classNames.buttonLeft}
        onClick={handleFirstPageClick}
        aria-label="arrow left"
      >
        <ArrayDoubleL className={classNames.arrayL} />
      </button>
      <button
        className={classNames.buttonLeft}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
        aria-label="arrow left"
      >
        <ArrayL className={classNames.arrayL} />
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
        className={classNames.buttonRight}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
        aria-label="arrow right"
      >
        <ArrowR className={classNames.arrayR} />
      </button>
      <button
        onClick={handleLastPageClick}
        className={classNames.buttonRight}
        type="button"
        disabled={disable.right}
        aria-label="arrow right"
      >
        <ArrayDoubleR className={classNames.arrayR} />
      </button>
    </div>
  );
}
