import React, { useState } from "react";
import s from "./Painting.module.scss";
import { PaintingType } from "../services/base-api";

type Props = {
  paint: PaintingType;
};

export function Paint({ paint }: Props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div key={paint.id}>
      <img
        onMouseOver={handleMouseOver}
        onFocus={() => {}}
        onBlur={() => {}}
        onMouseOut={handleMouseOut}
        src={paint.imageUrl}
        className={s.paintingImage}
        alt="panting"
      />
      {isHovering ? (
        <div>
          <span className={s.nameBlog}>
            <div className={s.name}>{paint.name}</div>
            <div className={s.name}>{paint.name}</div>
            <div className={s.name}>{paint.name}</div>
          </span>
        </div>
      ) : (
        <div className={s.name}>{paint.name}</div>
      )}
    </div>
  );
}
