import React from "react";
import { PaintingType } from "../../services/base-api";
import { Painting } from "./Paintings/Painting";

type Props = {
  paintingData: PaintingType[];
};

export function Paintings({ paintingData }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "40px",
      }}
    >
      {paintingData?.map((el) => {
        return <Painting key={el.id} painting={el} />;
      })}
    </div>
  );
}
