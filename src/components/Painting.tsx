import React from "react";
import { PaintingType, useGetPaintingQuery } from "../services/base-api";
import { Paint } from "./Paint";

type PaintingDataType = {
  data: PaintingType[];
};

export function Painting() {
  const { data } = useGetPaintingQuery<PaintingDataType>();
  return (
    <div>
      {data?.map((el) => {
        return <Paint paint={el} />;
      })}
    </div>
  );
}
