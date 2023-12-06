import React, { ChangeEvent } from "react";
import * as Popover from "@radix-ui/react-popover";
import ArrowIcon from "../../assets/image/Vector 56.svg";
import s from "./Accordion.module.scss";

type Props = {
  valueFromCreated: string;
  valueBeforeCreated: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onChangeBeforeCreated: (value: ChangeEvent<HTMLInputElement>) => void;
};

export function AccordionComponent({
  valueFromCreated,
  onChange,
  onChangeBeforeCreated,
  valueBeforeCreated,
}: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className={s.AccordionTrigger}>
          <span className={s.label}>Created</span>
          <img
            src={ArrowIcon}
            alt=""
            className={s.AccordionChevron}
            aria-hidden
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className={s.AccordionContent}
          sideOffset={0}
        >
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
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
