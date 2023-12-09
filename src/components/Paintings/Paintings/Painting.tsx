import React, { useState } from "react";
import s from "./Painting.module.scss";
import { PaintingType } from "../../../services/base-api";
import { Author } from "./Author/Author";
import { Location } from "./Location/Location";

type Props = {
  painting: PaintingType;
};

export function Painting({ painting }: Props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={s.painting}
    >
      <img
        src={`https://test-front.framework.team/${painting.imageUrl}`}
        className={s.paintingImage}
        alt="panting"
      />
      {isHovering && (
        <div className={s.nameBlock}>
          <div className={s.nameTextBlock}>
            <div>{painting.name}</div>
            <Author painting={painting} />
            <div className={s.title}>
              Created: <span className={s.authorName}>{painting.created}</span>
            </div>
            <Location painting={painting} />
          </div>
        </div>
      )}
      {!isHovering && (
        <div className={s.name}>
          <span className={s.text}>{painting.name}</span>
        </div>
      )}
    </div>
  );
}
