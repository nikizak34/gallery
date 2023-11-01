import React from "react";
import { PaintingType } from "../../services/base-api";
import { Painting } from "./Painting";

type Props = {
  paintingData: PaintingType[];
};

export function Paintings({ paintingData }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "40px",
      }}
    >
      {paintingData?.map((el) => {
        return <Painting key={el.id} painting={el} />;
      })}
    </div>
  );
}
