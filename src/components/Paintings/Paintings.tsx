import React from "react";
import { PaintingType } from "../../services/base-api";
import { Painting } from "./Paintings/Painting";
import s from "./Paintings/Painting.module.scss";

type Props = {
  paintingData: PaintingType[];
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
