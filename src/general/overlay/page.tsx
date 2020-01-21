import * as React from "react";
import { Overlay, Stack } from "office-ui-fabric-react";
import { IOverlayGeneralProps } from "./IOverlayGeneral";

/**
 * Retorna el HTML del componente Overlay
 * @param {IOverlayGeneralProps} props Atributos del componente Overlay
 */
function Page(props: IOverlayGeneralProps) {
  const { overlay } = props;
  
  return (
    <Stack>
      { ( !overlay.hidden )
        ? 
        <Overlay hidden = { overlay.hidden }>
          { overlay.content }
        </Overlay>
        : null
      }
    </Stack>
  );
}

export default Page;
