import React from "react";
import { PaintingsType, useGetPaintingQuery } from "../services/base-api";
import s from "./Painting.module.scss";

type DataType = {
  data: PaintingsType[];
};

export function Painting() {
  const { data } = useGetPaintingQuery<DataType>();

  return (
    <div>
      <div className="App">
        {data?.map((el) => {
          return (
            <div key={el.id} className={s.paintings}>
              <img
                className={s.paintingImage}
                src={el.imageUrl}
                alt="panting"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
