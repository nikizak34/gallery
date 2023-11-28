import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import s from "./Accordion.module.scss";

export function AccordionComponent({
  valueFromCreated,
  onChange,
  onChangeBeforeCreated,
  valueBeforeCreated,
}: any) {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger className={s.AccordionTrigger}>
            <span>Created</span>
            <ChevronDownIcon className={s.AccordionChevron} aria-hidden />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className={s.AccordionContent}>
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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
