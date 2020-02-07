import * as React from "react";
import * as moment from "moment";

import { Stack } from "office-ui-fabric-react";
import { TextFieldGeneral as Textfield } from "../../../../general/textField";
import TextArea from "../../../../general/textField";
import MessageBar from "../../../../general/messageBar";
import ButtonLead from "../../../../general/button";

import { ButtonGeneral as Button } from "../../../../general/button";

import './style.css';
import { ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";
import { LendingDTO } from "../../../../interface/lending/lendingResult";
import { IIOIPStore } from "../../../../redux/namespace";
import { SubspaceProvider } from "react-redux-subspace";
import { EnumEstadoPrestamo } from "../../../../enum/lending/lendingEnum";

interface contentModalProps { 
    item:LendingDTO; 
    onCancel:any; 
}

/**
* Retorna el HTML del formulario para la modal.
* @param {contentModalProps} props Atributos del componente
*/
export default function Page(props : contentModalProps ) {
  const { item, onCancel } = props;
  console.log(item);
  
    return (
    <Stack>
        <div className="ms-Grid ms-depth-8 container">
          <div className="ms-Grid-row body">
            <div className="ms-Grid-col ms-sm10 ms-smPush1">
              <div className="ms-Grid">
                <div className="ms-Grid-row section">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <SubspaceProvider mapState={(state: IIOIPStore) => {
                             return { messageBar: state.messageBarReceived }; }} >
                            <MessageBar />
                        </SubspaceProvider>                   
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <Textfield textField={{ value : item.nroExpediente , disabled : true, label: "Número de expediente:"  }} />                   
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <Textfield textField={{ value : item.nombre_expediente , disabled : true, label: "Titulo de expediente:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <Textfield textField={{ value : moment(item.fecha_solicitud).format("YYYY/MM/DD"), disabled : true, label: "Fecha solicitud:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <Textfield textField={{ value : item.nombre_subseccion, disabled : true, label: "Subsección:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <Textfield textField={{ value : item.nombre_serie , disabled : true, label: "Serie:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <Textfield textField={{ value : "subserie", disabled : true, label: "Subserie:" }} />
                    </div>
                  </div>
                  <div className="ms-Grid-row">                    
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                          <Textfield textField={{ value : item.userName, disabled : true, label: "Usuario solicitud:" }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <Textfield textField={{ value : item.estado, disabled : true, label: "Estado:" }} />
                    </div>
                    {
                      (item.idEstado === EnumEstadoPrestamo.Renovar)
                      ? <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                          <Textfield textField={{ value : moment(item.fecha_solicitud_anterior).format("YYYY/MM/DD"), disabled : true, label: "Fecha solicitud anterior:" }} />
                      </div>
                      :null
                    }
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">                        
                      <Textfield textField={{ value : item.observacion, disabled : true, label: "Observación solicitud:", rows: 5, multiline: true }} />
                    </div>
                  </div>
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg12">
                        <SubspaceProvider mapState={(state: IIOIPStore) => { return { textField: state.textAreaReceived }; }} >
                          <TextArea />
                        </SubspaceProvider>
                    </div>
                  </div>
                </div>
                </div>
                <div className="ms-Grid-row footer">
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg6 ms-mdPush6">
                  <Stack horizontal reversed>
                      <Button button = { { text : "Cancelar", buttonStyle: ButtonStyle.DefaultButton, onClick : onCancel }}  />                      
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { button: state.btnLeadReceived }; }} >
                          <ButtonLead />
                      </SubspaceProvider>
                  </Stack>
                </div>
              </div>
              </div>
            </div>
          </div>
        </Stack>
        );
}