import React from "react";
import clsx from "clsx";
import Styles from "../Pagination.module.scss";

type Props = {
  page: number;
  onChange: (currentPage: number) => void;
  currentPage: number;
  isDark: boolean;
};
export function Page({ page, onChange, currentPage, isDark }: Props) {
  const pageClass = clsx(
    Styles.page,
    currentPage === page && Styles.pageActive,
    currentPage === page &&
      isDark &&
      Styles.pageActive &&
      Styles.darkActivePage,
    isDark && Styles.dark,
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
