import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import * as Select from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import s from "./Select.module.scss";
import { ReactComponent as ArrowIconBottom } from "../../assets/image/Vector 56.svg";
import Del from "../../assets/image/Union.svg";

export type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: any;
  onClick: () => void;
  defaultValue: string;
} & ComponentPropsWithoutRef<typeof Select.Root>;

export const SelectComponent = forwardRef<
  ElementRef<typeof Select.Root>,
  SelectProps
>((props, ref) => {
  const { onClick, onChange, value, options, defaultValue } = props;
  const [open, setOpen] = useState<boolean>(false);

  const DeleteHandler = () => {
    debugger;
    onClick();
  };
  const handlerOpenedMenu = () => {
    setOpen(!open);
  };

  const onValueChangeHandler = (changeValue: string) => {
    onChange(changeValue);
  };

  return (
    <Select.Root
      value={value}
      onOpenChange={handlerOpenedMenu}
      onValueChange={onValueChangeHandler}
    >
      <div style={{ position: "relative" }}>
        <Select.Trigger className={s.Trigger} tabIndex={0} ref={ref}>
          <div className={s.SelectValue}>{value}</div>
          <ArrowIconBottom className={s.IconArrow} />
        </Select.Trigger>
        {value !== defaultValue && (
          <button
            style={{ position: "absolute" }}
            className={s.IconDel}
            onClick={DeleteHandler}
            type="button"
          >
            <img src={Del} alt="" />
          </button>
        )}
      </div>
      <Select.Content position="popper" sideOffset={0} className={s.Content}>
        <ScrollArea.Root className={s.ScrollAreaRoot} type="hover">
          <Select.Viewport asChild>
            <ScrollArea.Viewport className={s.ScrollAreaViewport}>
              <Select.Group>
                {options?.map((item: any) => {
                  if (item.location) {
                    return <Item key={item.id}>{item.location}</Item>;
                  }
                  return <Item key={item.id}>{item.name}</Item>;
                })}
              </Select.Group>
            </ScrollArea.Viewport>
          </Select.Viewport>
          <ScrollArea.Scrollbar
            className={s.ScrollAreaScrollbar}
            orientation="vertical"
          >
            <ScrollArea.Thumb className={s.ScrollAreaThumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Select.Content>
    </Select.Root>
  );
});

type ItemProps = {
  children: string;
};

export function Item(props: ItemProps) {
  const { children } = props;
  return (
    <Select.Item className={s.Item} value={children}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}
