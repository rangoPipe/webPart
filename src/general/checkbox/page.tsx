import * as React from "react";
import { Checkbox } from "office-ui-fabric-react";
import { ICheckboxGeneralProps } from "./ICheckboxGeneralProps";

/**
 * Retorna el HTML del componente Checkbox
 * @param {ICheckboxGeneralProps} props Atributos del componente Checkbox
 */
function Page(props: ICheckboxGeneralProps) {
  const { checkbox } = props;
  return (
    <Checkbox
        label = { checkbox.label }
        onChange = { checkbox.onChange }
        disabled = { checkbox.disabled }
        defaultChecked = { checkbox.defaultChecked }
        checked = { checkbox.checked }
    />
  );
}

export default Page;
