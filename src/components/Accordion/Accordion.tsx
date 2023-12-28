import React, { ChangeEvent } from "react";
import * as Popover from "@radix-ui/react-popover";
import ArrowIcon from "./../../assets/image/Vector 56.svg?react";
import s from "./Accordion.module.scss";

type Props = {
  valueFromCreated: string;
  valueBeforeCreated: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onChangeBeforeCreated: (value: ChangeEvent<HTMLInputElement>) => void;
};

export function Accordion({
  valueFromCreated,
  onChange,
  onChangeBeforeCreated,
  valueBeforeCreated,
}: Props) {
  const onChangeAutoFocus = (e: Event) => {
    e.preventDefault();
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className={s.AccordionTrigger}>
          <span className={s.label}>Created</span>
          <ArrowIcon className={s.AccordionChevron} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={onChangeAutoFocus}
          className={s.AccordionContent}
          sideOffset={0}
        >
          <div className={s.inputBlock}>
            <input
              placeholder="from"
              onChange={onChange}
              className={s.input}
              type="number"
              value={valueFromCreated}
            />
            <div className={s.dash} />
            <input
              placeholder="before"
              onChange={onChangeBeforeCreated}
              className={s.input}
              type="number"
              value={valueBeforeCreated}
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
