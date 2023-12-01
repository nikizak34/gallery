import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import * as Select from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import s from "./Select.module.scss";
import ArrowIcon from "../../assets/image/Vector 56.svg";
import Del from "../../assets/image/Union.svg";

export type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  data: any;
  onClick: (value: string) => void;
} & ComponentPropsWithoutRef<typeof Select.Root>;

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

export const SelectS = forwardRef<ElementRef<typeof Select.Root>, SelectProps>(
  (props, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    const DeleteHandler = () => {
      debugger;
      props.onClick("");
    };
    const handlerOpenedMenu = () => {
      setOpen(!open);
    };
    return (
      <Select.Root
        value={props.value}
        onOpenChange={handlerOpenedMenu}
        onValueChange={(value) => {
          props.onChange(value);
        }}
      >
        <Select.Trigger className={s.Trigger} tabIndex={0} ref={ref}>
          <div className={s.SelectValue}>{props.value}</div>
          {open ? (
            <>
              <button className={s.Del} onClick={DeleteHandler} type="button">
                <img src={Del} alt="" />
              </button>

              <img
                style={{
                  transform: "rotate(180deg)",
                  marginRight: "15px",
                }}
                src={ArrowIcon}
                alt=""
              />
            </>
          ) : (
            <img
              style={{
                marginRight: "15px",
              }}
              src={ArrowIcon}
              alt=""
            />
          )}
        </Select.Trigger>
        <Select.Content position="popper" sideOffset={1} className={s.Content}>
          <ScrollArea.Root className={s.ScrollAreaRoot} type="hover">
            <Select.Viewport asChild>
              <ScrollArea.Viewport className={s.ScrollAreaViewport}>
                <Select.Group>
                  {props.data?.map((item: any) => {
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
  },
);
