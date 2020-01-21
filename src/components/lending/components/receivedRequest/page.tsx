import * as React from "react";
import {IReceivedRequestProps} from "./IReceivedRequestProps";
import { SubspaceProvider } from "react-redux-subspace";

import DetailList from "../../../../general/detailList";
import CommandBar from "../../../../general/commandBar";
import Modal from "../../../../general/modal";
import Textfield from "../../../../general/textField";

import { IIOIPStore } from "../../../../redux/namespace";
import { Stack, TooltipHost } from "office-ui-fabric-react";

/**
 * Retorna el HTML del principal del componente de peticiones en prestamos.
 * @param {IReceivedRequestProps} props Atributos del componente ReceivedRequesClass
 */
export default function Page(props:IReceivedRequestProps) {
  const { modalVisible }  = props;
    return(
    <Stack>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm9 ms-md10 ms-lg9">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { commandBar: state.commandBarReceived }; }} >
              <CommandBar />
            </SubspaceProvider>
          </div>
          <div className="ms-Grid-col ms-sm3 ms-md2 ms-lg3">
            <TooltipHost content="Buscar préstamos filtrando por ...">            
              <SubspaceProvider mapState={(state: IIOIPStore) => { return { textField: state.txtFilterDtlReceived }; }} >
                <Textfield />
              </SubspaceProvider>
            </TooltipHost>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailListReceived }; }} >
              <DetailList />
            </SubspaceProvider>
          </div>
      </div>
      { modalVisible 
         ?  <SubspaceProvider mapState={(state: IIOIPStore) => {
              return { 
                modal: state.modalReceived, 
                textAreaReceived : state.textAreaReceived, 
                messageBarReceived: state.messageBarReceived,
                choiceGroupReceived : state.choiceGroupReceived,
                btnLeadReceived: state.btnLeadReceived }; }} >
              <Modal />
            </SubspaceProvider>
         : null
         }
    </Stack>
    );
}