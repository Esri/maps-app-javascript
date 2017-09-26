// dojo
declare module "dojo/i18n!*" {
  const i18n: any;
  export = i18n;
}

declare module "styles/main.css" {
  const css: any;
  export default css;
}

// material

declare module "@material/drawer/index" {
  /*
  export module drawer {
    interface MDCTemporaryDrawer {
      open: boolean
    }
    export class MDCTemporaryDrawer {
      constructor(params?: any)
      open: boolean
    }
  }
  */
  export class MDCTemporaryDrawer {
    constructor(params?: any)
    open: boolean
  }
}
