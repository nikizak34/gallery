import React from "react";
import s from "../Painting.module.scss";

type Props = {
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
};

export function Paginator({ setCurrentPage, currentPage }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginRight: "20px",
        marginBottom: "90px",
      }}
    >
      <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>
      <div className={s.page}>{currentPage}</div>
      <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}
