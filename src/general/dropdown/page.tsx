import * as React from "react";
import { Dropdown } from "office-ui-fabric-react";
import { IDropdownGeneralProps } from "./IDropdownGeneralProps";

/**
 * Retorna el HTML del componente Dropdown
 * @param {IDropdownGeneralProps} props Atributos del componente Dropdown
 */
function Page(props: IDropdownGeneralProps) {
  const { dropdown } = props;

  return (
      <Dropdown
      label = { dropdown.label }
      options = { dropdown.options }
      placeholder = { dropdown.placeholder }
      onChange = { dropdown.onChange } />
  );
}

export default Page;
