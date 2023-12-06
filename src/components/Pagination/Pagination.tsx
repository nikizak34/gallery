import React from "react";
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
  const dark = false;
  const mapped = pages.map((el, index) => (
    <button
      type="button"
      key={index}
      onClick={() => onChange(el)}
      className={
        // eslint-disable-next-line no-nested-ternary
        currentPage === el
          ? Styles.pageActive
          : dark
          ? `${Styles.dark} ${Styles.page}`
          : Styles.page
      }
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
      {mapped}
      <button
        className={buttonRight}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        <ArrowR className={arrayR} />
      </button>
      <button className={buttonRight} type="button" disabled={disable.right}>
        <ArrayDoubleR onClick={handleLastPageClick} className={arrayR} />
      </button>
    </div>
  );
}
