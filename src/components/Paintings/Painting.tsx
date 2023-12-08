import React, { useState } from "react";
import s from "./Painting.module.scss";
import {
  AuthorsDataType,
  LocationDataType,
  PaintingType,
  useGetAuthorsQuery,
  useGetLocationQuery,
} from "../../services/base-api";

type Props = {
  painting: PaintingType;
};

export function Painting({ painting }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const { data: locationData } = useGetLocationQuery<LocationDataType>();
  const { data: authorData } = useGetAuthorsQuery<AuthorsDataType>();
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const mappedLocation = locationData?.map((el) =>
    el.id === painting.locationId ? (
      <span key={el.id}>
        <div className={s.author}>
          Location: <span className={s.authorName}>{el.location}</span>
        </div>
      </span>
    ) : null,
  );
  const mappedAuthor = authorData?.map((el) =>
    el.id === painting.authorId ? (
      <span key={el.id}>
        <div className={s.author}>
          Author: <span className={s.authorName}>{el.name}</span>
        </div>
      </span>
    ) : null,
  );
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
      {isHovering ? (
        <div className={s.nameBlog}>
          <div>{painting.name}</div>
          {mappedAuthor}
          <div className={s.author}>
            Created: <span className={s.authorName}>{painting.created}</span>
          </div>
          {mappedLocation}
        </div>
      ) : (
        <div className={s.name}>{painting.name}</div>
      )}
    </div>
  );
}
