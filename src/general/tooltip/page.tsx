import * as React from "react";
import { TooltipHost } from "office-ui-fabric-react";
import { ITooltipGeneralProps } from "./ITooltipGeneral";

/**
 * Retorna el HTML del componente Tooltip
 * @param {ITooltipGeneralProps} props Atributos del componente Tooltip
 */
function Page(props: ITooltipGeneralProps) {
  const { tooltip } = props;
  return (
    <TooltipHost>
      { tooltip.content }
    </TooltipHost>
  );
}

export default Page;
