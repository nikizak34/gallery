import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectGroup from "@radix-ui/react-select";
import { AuthorsType } from "../../services/base-api";

export type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  data: AuthorsType[];
} & ComponentPropsWithoutRef<typeof SelectGroup.Root>;

type ItemProps = {
  children: string;
};

export function Item(props: ItemProps) {
  const { children } = props;
  return (
    <SelectGroup.Item value={children}>
      <SelectGroup.ItemText>{children}</SelectGroup.ItemText>
    </SelectGroup.Item>
  );
}

export const Select = forwardRef<
  ElementRef<typeof SelectGroup.Root>,
  SelectProps
>((props, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerOpenedMenu = () => {
    setOpen(!open);
  };

  return (
    <div>
      <SelectGroup.Root
        value={props.value}
        onOpenChange={handlerOpenedMenu}
        onValueChange={(value) => {
          props.onChange(value);
        }}
      >
        <SelectGroup.Trigger
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
          <div>
            <div>
              <SelectGroup.Value placeholder={props.placeholder} />
            </div>
            <div>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
          </div>
        </SelectGroup.Trigger>
        <SelectGroup.Content position="popper">
          <SelectGroup.Viewport>
            <SelectGroup.Group>
              {props.data?.map((item) => {
                return <Item key={item.id}>{item.name}</Item>;
              })}
            </SelectGroup.Group>
          </SelectGroup.Viewport>
        </SelectGroup.Content>
      </SelectGroup.Root>
    </div>
  );
});
