import React from "react";
import clsx from "clsx";
import Styles from "../Pagination.module.scss";

type Props = {
  page: number;
  onChange: (currentPage: number) => void;
  currentPage: number;
};
export function Page({ page, onChange, currentPage }: Props) {
  const pageClass = clsx(
    Styles.page,
    currentPage === page && Styles.pageActive,
  );
  return (
    <>
      <button
        type="button"
        onClick={() => onChange(page)}
        className={pageClass}
      >
        {page}
      </button>
    </>
  );
}
