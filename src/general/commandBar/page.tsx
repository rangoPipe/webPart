import * as React from "react";
import { CommandBar } from "office-ui-fabric-react";
import { ICommandBarGeneralProps } from "./ICommandBarGeneralProps";

/**
 * Retorna el HTML del componente CommandBar
 * @param {ICommandBarGeneralProps} props Atributos del componente CommandBar
 */
function Page(props: ICommandBarGeneralProps) {
  const { commandBar } = props;

  return (
    <div>
      <CommandBar
        items={ commandBar.items }
        farItems={ commandBar.farItems }
      />
    </div>
  );
}

export default Page;
