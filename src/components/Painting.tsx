import React from "react";
import { PaintingType, useGetPaintingQuery } from "../services/base-api";
import { Painting } from "./Paint";

type PaintingDataType = {
  data: PaintingType[];
};
type Props = {
  currentPage: number;
};

export function Paintings({ currentPage }: Props) {
  const { data: paintingData } =
    useGetPaintingQuery<PaintingDataType>(currentPage);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {paintingData?.map((el) => {
        return <Painting key={el.id} painting={el} />;
      })}
    </div>
  );
}
