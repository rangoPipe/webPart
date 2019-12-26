import * as React from "react";
import { DefaultButton, PrimaryButton, IconButton, ActionButton } from "office-ui-fabric-react";
import { IButtonGeneralProps } from "./IButtonGeneralProps";
import { ButtonStyle } from "../../redux/reducers/general/button/IButtonProps";

/**
 * Retorna el HTML del componente Button
 * @param {IButtonGeneralProps} props Atributos del componente Button
 */
function Page(props: IButtonGeneralProps) {
  const { button } = props;

  return (
    !button.hidden ? 
    
      (button.buttonStyle === ButtonStyle.PrimaryButton ) 
      ? <PrimaryButton
        text = { button.text }
        split = { button.split }
        splitButtonAriaLabel = { button.splitButtonAriaLabel }
        menuProps = { button.menuProps }
        onClick = { button.onClick }
        disabled = { button.disabled }
        hidden = { button.hidden }
        iconProps = { button.iconProps } /> 

      :(button.buttonStyle === ButtonStyle.IconButton ) 
      ? <IconButton
        text = { button.text }
        split = { button.split }
        splitButtonAriaLabel = { button.splitButtonAriaLabel }
        menuProps = { button.menuProps }
        onClick = { button.onClick }
        disabled = { button.disabled }
        hidden = { button.hidden }
        iconProps = { button.iconProps } />

      :(button.buttonStyle === ButtonStyle.ActionButton ) 
      ? <ActionButton
        text = { button.text }
        split = { button.split }
        splitButtonAriaLabel = { button.splitButtonAriaLabel }
        menuProps = { button.menuProps }
        onClick = { button.onClick }
        disabled = { button.disabled }
        hidden = { button.hidden }
        iconProps = { button.iconProps } />

      :<DefaultButton
        text = { button.text }
        split = { button.split }
        splitButtonAriaLabel = { button.splitButtonAriaLabel }
        menuProps = { button.menuProps }
        onClick = { button.onClick }
        disabled = { button.disabled }
        hidden = { button.hidden }
        iconProps = { button.iconProps } />

      : null
  );
}

export default Page;
