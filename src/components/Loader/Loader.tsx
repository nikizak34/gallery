import React from "react";
import style from "./Loader.module.scss";

export function Loader() {
  return (
    <div className={style.loaderBlock}>
      <span className={style.loader} />
    </div>
  );
}
