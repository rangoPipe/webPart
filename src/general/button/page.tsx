import * as React from "react";
import { Button } from "office-ui-fabric-react";
import { IButtonGeneralProps } from "./IButtonGeneralProps";

/**
 * Retorna el HTML del componente Button
 * @param {IButtonGeneralProps} props Atributos del componente Button
 */
function Page(props: IButtonGeneralProps) {
  const { button } = props;

  return (
      <Button
      text = { button.text }
      split = { button.split }
      splitButtonAriaLabel = { button.splitButtonAriaLabel }
      menuProps = { button.menuProps }
      onClick = { button.onClick }
      disabled = { button.disabled }
      checked = { button.checked }
      primary = { button.primary }
      iconProps = { button.iconProps } />
  );
}

export default Page;
