import * as React from "react";
import Page from "./page";

/**
 * @class Clase OwnerMain contenedor principal del propietario.
 */
export default class LendingMain extends React.Component { 

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return <Page />;
  }
}
