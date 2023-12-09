import React from "react";
import s from "../Painting.module.scss";
import {
  LocationDataType,
  PaintingType,
  useGetLocationQuery,
} from "../../../../services/base-api";

type Props = {
  painting: PaintingType;
};
export function Location({ painting }: Props) {
  const { data: locationData } = useGetLocationQuery<LocationDataType>();
  return (
    <>
      {locationData?.map((el) =>
        el.id === painting.locationId ? (
          <span key={el.id}>
            <div className={s.title}>
              Location: <span className={s.authorName}>{el.location}</span>
            </div>
          </span>
        ) : null,
      )}
    </>
  );
}
