import * as React from "react";

import { Stack } from "office-ui-fabric-react";
import { TextFieldGeneral as Textfield } from "../../../../general/textField";
import TextArea from "../../../../general/textField";
import MessageBar from "../../../../general/messageBar";

import { ButtonGeneral as Button } from "../../../../general/button";

import './style.css';
import { ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";
import { LendingDTO } from "../../../../interface/lending/lendingResult";
import { IIOIPStore } from "../../../../redux/namespace";
import { SubspaceProvider } from "react-redux-subspace";

interface contentModalProps { 
    item:LendingDTO; 
    onCancel:any; 
    onAccept:any;
}

/**
 * Retorna el HTML del formulario para la modal.
 * @param {contentModalProps} props Atributos del componente
 */
export default function Page(props : contentModalProps ) {
  const { item, onCancel, onAccept} = props;
    return (
    <Stack>
        <div className="ms-Grid ms-depth-8 container">
          <div className="ms-Grid-row body">
            <div className="ms-Grid-col ms-sm10 ms-md8 ms-lg8 ms-smPush1 ms-mdPush2">
              <div className="ms-Grid">
                <div className="ms-Grid-row section">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <SubspaceProvider mapState={(state: IIOIPStore) => {
                             return { messageBar: state.messageBar }; }} >
                            <MessageBar />
                        </SubspaceProvider>                   
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Textfield textField={{ value : item.nroExpediente , disabled : true, label: "Número de expediente:"  }} />                   
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Textfield textField={{ value : item.nombre_expediente , disabled : true, label: "Titulo de expediente:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Textfield textField={{ value : item.nombre_subseccion, disabled : true, label: "Subsección:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Textfield textField={{ value : item.nombre_serie , disabled : true, label: "Serie:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <Textfield textField={{ value : item.nombre_subserie, disabled : true, label: "Subserie:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg12">
                        <SubspaceProvider mapState={(state: IIOIPStore) => { return { textField: state.textField }; }} >
                            <TextArea />
                        </SubspaceProvider>
                    </div>
                </div>
                </div>
                <div className="ms-Grid-row footer">
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg6 ms-mdPush8">
                  <Stack horizontal>
                      <Button button = { { text : "Enviar solicitud", buttonStyle: ButtonStyle.PrimaryButton, onClick : onAccept }} />
                      <Button button = { { text : "Cancelar", buttonStyle: ButtonStyle.DefaultButton, onClick : onCancel }}  />
                  </Stack>
                </div>
              </div>
              </div>
            </div>
          </div>
        </Stack>
        );
}