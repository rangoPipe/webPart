import * as React from "react";
import { ChoiceGroup } from "office-ui-fabric-react";
import { IChoiceGroupGeneralProps } from "./IChoiceGroupProps";

/**
 * Retorna el HTML del componente ChoiceGroup
 * @param {IChoiceGroupGeneralProps} props Atributos del componente ChoiceGroup
 */
function Page(props: IChoiceGroupGeneralProps) {
  const { choiceGroup } = props;

  return (
      <ChoiceGroup
        defaultSelectedKey = { choiceGroup.defaultSelectedKey }
        options = { choiceGroup.options }
       />
  );
}

export default Page;
