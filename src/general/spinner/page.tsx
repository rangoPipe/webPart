import * as React from "react";
import { Spinner } from "office-ui-fabric-react";
import { ISpinnerGeneralProps } from "./ISpinnerGeneral";

/**
 * Retorna el HTML del componente Overlay
 * @param {ISpinnerGeneralProps} props Atributos del componente Spinner
 */
function Page(props: ISpinnerGeneralProps) {
  const { spinner } = props;
  
  return (
    <Spinner label = { spinner.label } style = { spinner.style } />
  );
}

export default Page;
