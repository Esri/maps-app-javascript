import { tsx } from "esri/widgets/support/widget";

const upper: (s: string) => string = s => s.toUpperCase();

interface UserMenuProps {
  userName: string;
  sessionDuration: string;
  menuItems: JSX.Element[];
}

const CSS = {
  menu: "dropdown-menu dropdown-right",
  title: "dropdown-title",
  link: "dropdown-link"
};

export const userMenu = (props: UserMenuProps, context: any) => (
  <nav class={CSS.menu} role="menu">
    <span class={CSS.title}>
      {props.userName}
      <br />
      <small>
        {props.userName
          ? `Session expires in ${upper(props.sessionDuration)}`
          : "Please sign in"}
      </small>
    </span>
    {props.menuItems}
  </nav>
);
