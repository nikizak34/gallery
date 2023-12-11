import React from "react";
import s from "../Painting.module.scss";
import {
  AuthorsData,
  PaintingRequest,
  useGetAuthorsQuery,
} from "../../../../services/base-api";

type Props = {
  painting: PaintingRequest;
};
export function Author({ painting }: Props) {
  const { data: authorData } = useGetAuthorsQuery<AuthorsData>();
  return (
    <div>
      {authorData?.map((el) =>
        el.id === painting.authorId ? (
          <span key={el.id}>
            <div className={s.title}>
              Author: <span className={s.authorName}>{el.name}</span>
            </div>
          </span>
        ) : null,
      )}
    </div>
  );
}
