import * as React from "react";
import Page from "./page";
import { IArchivistMainProps } from "./IArchivistMain";

/**
 * @class Clase ArchivistMain contenedor principal del propietario.
 */
export default class ArchivistMain extends React.Component<IArchivistMainProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return <Page key = { this.props.key } title = { this.props.title } />;
  }
}
