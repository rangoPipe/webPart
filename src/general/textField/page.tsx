import * as React from "react";
import { TextField } from "office-ui-fabric-react";
import { ITextFieldGeneralProps } from "./ITextFieldGeneralProps";

/**
 * Retorna el HTML del componente TextField
 * @param {ITextFieldGeneralProps} props Atributos del componente TextField
 */
function Page(props: ITextFieldGeneralProps) {
  const { textField } = props;

  return (
    <div>
      <TextField
        label={textField.label}
        multiline={textField.multiline}
        rows={textField.rows}
        disabled={textField.disabled}
        defaultValue={textField.defaultValue}
        value={textField.value}
        onChange={textField.onChange}
      />
    </div>
  );
}

export default Page;
