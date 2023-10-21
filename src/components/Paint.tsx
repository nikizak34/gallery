import React, { useState } from "react";
import s from "./Painting.module.scss";
import { PaintingType, useGetAuthorsQuery } from "../services/base-api";

type Props = {
  painting: PaintingType;
};
type AuthorsType = {
  id: number;
  name: string;
};
type AuthorsDataType = {
  data: AuthorsType[];
};

export function Painting({ painting }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const { data: authorData } = useGetAuthorsQuery<AuthorsDataType>();
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const mapAuthor = authorData?.map((el) =>
    el.id === painting.authorId ? <span key={el.id}>{el.name}</span> : null,
  );
  return (
    <div
      onBlur={() => {}}
      onFocus={() => {}}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={s.painting}
    >
      <img src={painting.imageUrl} className={s.paintingImage} alt="panting" />
      {isHovering ? (
        <div className={s.nameBlog}>
          <div>{painting.name}</div>
          {mapAuthor}
        </div>
      ) : (
        <div className={s.name}>{painting.name}</div>
      )}
    </div>
  );
}
