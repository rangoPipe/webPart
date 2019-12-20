import * as React from "react";
import { Modal } from "office-ui-fabric-react";
import { IModalGeneralProps } from "./IModalGeneralProps";

/**
 * Retorna el HTML del componente Modal
 * @param {IModalGeneralProps} props Atributos del componente Modal
 */
function Page(props: IModalGeneralProps) {
  const { modal } = props;

  return (
      <Modal
        isOpen = { modal.isOpen }
        onDismiss = { modal.onDismiss }
      >
        { modal.header }
        { modal.content }
      </Modal>
  );
}

export default Page;
