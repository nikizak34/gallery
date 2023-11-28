import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { LocationType } from "../../services/base-api";

export type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  data: LocationType[];
} & ComponentPropsWithoutRef<typeof Select.Root>;

type ItemProps = {
  children: string;
};

export function Item(props: ItemProps) {
  const { children } = props;
  return (
    <Select.Item value={children}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

export const SelectS = forwardRef<ElementRef<typeof Select.Root>, SelectProps>(
  (props, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    const handlerOpenedMenu = () => {
      setOpen(!open);
    };

    return (
      <div>
        <Select.Root
          value={props.value}
          onOpenChange={handlerOpenedMenu}
          onValueChange={(value) => {
            props.onChange(value);
          }}
        >
          <Select.Trigger
            style={{
              width: "265px",
              height: "45px",
              borderRadius: "8px",
              border: "1px solid rgba(0, 0, 0, 0.30)",
              background: "#FFF",
            }}
            tabIndex={0}
            ref={ref}
          >
            <Select.Value />
            Location
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Select.Trigger>
          <Select.Content
            position="popper"
            sideOffset={1}
            style={{ backgroundColor: "white", textAlign: "center" }}
          >
            <Select.Viewport>
              <Select.Group>
                {props.data?.map((item) => {
                  return <Item key={item.id}>{item.location}</Item>;
                })}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>
    );
  },
);
