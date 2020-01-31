import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack, TooltipHost } from "office-ui-fabric-react";
import { IIOIPStore } from "../../../../redux/namespace";
import { IReportProps } from "./IReport";

import Button from "../../../../general/button";
import DetailList from "../../../../general/detailList";
import CommandBar from "../../../../general/commandBar";
import DatePicker from "../../../../general/datePicker";
import Textfield from "../../../../general/textField";
import Checkbox from "../../../../general/checkbox";
import Modal from "../../../../general/modal";

import './style.css';

/**
 * Retorna el HTML del principal del componente de reportes para prestamos
 * @param {IReportProps} props Atributos del componente ReportClass
 */
export default function Page(props:IReportProps) {
  const { resultVisible, modalVisible } = props;
    return (
      <Stack>
        <div className="ms-Grid ms-depth-8 container">
          <div className="ms-Grid-row body">
            <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10 ms-smPush1">
              <div className="ms-Grid">

                <div className="ms-Grid-row section">
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <SubspaceProvider mapState={(state: IIOIPStore) => {
                       return { datePicker: state.datePickerStartReport }; }} >
                        <DatePicker />
                      </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { datePicker: state.datePickerEndReport }; }} >
                        <DatePicker />
                      </SubspaceProvider>
                  </div>
                </div>
                <div className="ms-Grid-row section">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { checkbox: state.chkSendedReport }; }} >
                        <Checkbox />
                      </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">                      
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { checkbox: state.chkRequestReport }; }} >
                        <Checkbox />
                      </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">                      
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { checkbox: state.chkAcceptedReport }; }} >
                        <Checkbox />
                      </SubspaceProvider>
                  </div>
                </div>
                <div className="ms-Grid-row section">
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { checkbox: state.chkRejectedReport }; }} >
                        <Checkbox />
                      </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">                      
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { checkbox: state.chkLendedReport }; }} >
                        <Checkbox />
                      </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">                      
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { checkbox: state.chkPaybackReport }; }} >
                        <Checkbox />
                      </SubspaceProvider>
                  </div>
                </div>

                <div className="ms-Grid-row footer">
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 ms-mdPush6">
                    <Stack horizontal>
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { button: state.buttonSearchReport }; }} >
                        <Button />
                      </SubspaceProvider>
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { button: state.buttonCancelReport }; }} >
                        <Button />
                      </SubspaceProvider>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        { resultVisible ? (
          <div className="ms-Grid ms-depth-8 container resultReport">
            <div className="ms-Grid-row body">
              <div className="ms-Grid-col ms-sm12">
                <div className="ms-Grid">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm9 ms-md10 ms-lg9">
                      <SubspaceProvider mapState={(state: IIOIPStore) => {
                       return { commandBar: state.commandBarReport }; }} >
                        <CommandBar />
                      </SubspaceProvider>
                    </div>
                    <div className="ms-Grid-col ms-sm3 ms-md2 ms-lg3">
                      <TooltipHost content="Buscar préstamos filtrando por ...">            
                        <SubspaceProvider mapState={(state: IIOIPStore) => { return { textField: state.txtFilterDtlReport }; }} >
                          <Textfield />
                        </SubspaceProvider>
                      </TooltipHost>
                    </div>
                    <div className="ms-Grid-col ms-sm12">
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailListReport }; }} >
                        <DetailList />
                      </SubspaceProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null }
        { modalVisible 
         ?  <SubspaceProvider mapState={(state: IIOIPStore) => { return { modal: state.modalReport }; }} >
              <Modal />
            </SubspaceProvider>
         : null
         }
      </Stack>
    );
}