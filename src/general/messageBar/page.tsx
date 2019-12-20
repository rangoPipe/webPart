import * as React from "react";
import { MessageBar } from "office-ui-fabric-react";
import { IMessageBarGeneralProps } from "./IMessageBarGeneralProps";

/**
 * Retorna el HTML del componente MessageBar
 * @param {IMessageBarGeneralProps} props Atributos del componente MessageBar
 */
function Page(props: IMessageBarGeneralProps) {
  const { messageBar } = props;
  if (messageBar.hideMessage) return <div></div>;
  return (
    <MessageBar
      messageBarType={messageBar.messageBarType}
      isMultiline={messageBar.isMultiline}
      onDismiss={messageBar.onDismiss}
      dismissButtonAriaLabel={messageBar.dismissButtonAriaLabel}
      truncated={messageBar.truncated}
      overflowButtonAriaLabel={messageBar.overflowButtonAriaLabel}
    >
      {messageBar.value}
    </MessageBar>
  );
}

export default Page;
