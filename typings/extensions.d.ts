declare module "calcite-web" {
  export const dropdown: () => void;
}

declare module "esri/moment" {
  import moment from "moment";
  export = moment;
}

// dojo
declare module "dojo/i18n!*" {
  const i18n: any;
  export = i18n;
}
