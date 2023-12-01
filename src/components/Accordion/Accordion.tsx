import React, { useState } from "react";
import s from "./Accordion.module.scss";
import ArrowIcon from "../../assets/image/Vector 56.svg";

export function AccordionComponent({
  valueFromCreated,
  onChange,
  onChangeBeforeCreated,
  valueBeforeCreated,
}: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.Root}>
      {!open ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/button-has-type
        <button
          onClick={() => setOpen(!open)}
          className={s.AccordionTrigger}
          onBlur={() => {
            debugger;
          }}
        >
          <span className={s.label}>Created</span>
          <img
            src={ArrowIcon}
            alt=""
            className={s.AccordionChevron}
            aria-hidden
          />
        </button>
      ) : (
        <>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <button
            type="button"
            onBlur={() => {
              setOpen(false);
            }}
            onClick={() => setOpen(!open)}
            className={s.AccordionTriggerOpen}
          >
            <span className={s.label}>Created</span>
            <img
              src={ArrowIcon}
              alt=""
              className={s.AccordionChevron}
              aria-hidden
            />
          </button>
          <div className={s.AccordionContent}>
            <input
              placeholder="from"
              onChange={onChange}
              className={s.input}
              type="number"
              value={valueFromCreated}
            />
            —
            <input
              placeholder="before"
              onChange={onChangeBeforeCreated}
              className={s.input}
              type="number"
              value={valueBeforeCreated}
            />
          </div>
        </>
      )}
    </div>
  );
}
