import * as React from "react";
import Page from "./page";
import { ILendingMainProps } from "./ILendingMainProps";

/**
 * @class Clase LendingMain contenedor principal del propietario.
 */
export default class LendingMain extends React.Component<ILendingMainProps> { 

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return <Page title = { this.props.title } key = { this.props.key } />;
  }
}
