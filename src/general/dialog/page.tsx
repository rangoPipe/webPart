import * as React from "react";
import { Dialog } from "office-ui-fabric-react";
import { IDialogGeneralProps } from "./IDialogGeneralProps";

/**
 * Retorna el HTML del componente Dialog
 * @param {IDialogGeneralProps} props Atributos del componente Dialog
 */
function Page(props: IDialogGeneralProps) {
  const { dialog } = props;
  return (
    <Dialog
      hidden={dialog.hideDialog}
      dialogContentProps={{
        type: dialog.type,
        title: dialog.title,
        subText: dialog.subText
      }}
      modalProps={{
        isBlocking: true,
        isDarkOverlay: true
      }}
    >
      {dialog.body}
      {dialog.footer}
    </Dialog>
  );
}

export default Page;
