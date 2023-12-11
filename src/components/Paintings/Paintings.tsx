import React from "react";
import s from "./Paintings/Painting.module.scss";
import { Painting } from "./Paintings/Painting";
import { PaintingRequest } from "../../services/base-api";

type Props = {
  paintingData: PaintingRequest[];
};

export function Paintings({ paintingData }: Props) {
  return (
    <div className={s.paintings}>
      {paintingData?.map((el) => {
        return <Painting key={el.id} painting={el} />;
      })}
    </div>
  );
}
