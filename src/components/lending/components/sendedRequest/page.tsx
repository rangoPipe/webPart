import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack, TooltipHost } from "office-ui-fabric-react";
import { ISendedRequestProps } from "./ISendedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";

import DetailListGeneral from "../../../../general/detailList";
import CommandBar from "../../../../general/commandBar";
import Modal from "../../../../general/modal";
import Dialog from "../../../../general/dialog";
import Textfield from "../../../../general/textField";

/**
 * Retorna el HTML del principal del componente de busqueda para prestamos
 * @param {ISendedRequestProps} props Atributos del componente SendedRequestClass
 */
export default function Page(props:ISendedRequestProps) {  
  const { modalVisible } = props;
    return(
    <Stack>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm9 ms-md10 ms-lg9">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { commandBar: state.commandBarSended }; }} >
              <CommandBar />
            </SubspaceProvider>
          </div>
          <div className="ms-Grid-col ms-sm3 ms-md2 ms-lg3">
            <TooltipHost content="Buscar préstamos filtrando por ...">            
              <SubspaceProvider mapState={(state: IIOIPStore) => { return { textField: state.txtFilterDtlSended }; }} >
                <Textfield />
              </SubspaceProvider>
            </TooltipHost>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailListSended }; }} >
              <DetailListGeneral/>
            </SubspaceProvider>
          </div>
      </div>
      { modalVisible 
         ?  <SubspaceProvider mapState={(state: IIOIPStore) => { return { modal: state.modalSended }; }} >
              <Modal />
            </SubspaceProvider>
         : null
      }
      <SubspaceProvider mapState={(state: IIOIPStore) => { return { dialog: state.dialogSended }; }} >
        <Dialog />
      </SubspaceProvider>
    </Stack>
    );
}