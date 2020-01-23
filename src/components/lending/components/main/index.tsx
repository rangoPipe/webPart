import * as React from "react";
import Page from "./page";
import { ILendingMainProps, ILendingMainState } from "./ILendingMainProps";

/**
 * @class Clase LendingMain contenedor principal del propietario.
 */
export default class LendingMain extends React.Component<ILendingMainProps, ILendingMainState> { 

  constructor(props:ILendingMainProps) {
    super(props);

    this.state = {
      menu: null
    }
  }

  public changeState = (value:string) => {
    this.setState({ ...this.state, menu: value});
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return <Page title = { this.props.title } key = { this.props.key } menu = { this.state.menu } onClickMenu = { this.changeState } />;
  }
}
