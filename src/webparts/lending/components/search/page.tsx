import React from "react";
import { ISearchProps, SectionVisibleEnum } from "./ISearchProps";

import { Separator, Stack, ITheme, createTheme } from "office-ui-fabric-react";
import { TextFieldGeneral as Textfield } from "../../../../general/textField";
import { ChoiceGroupGeneral as ChoiceGroup } from "../../../../general/choiceGroup";

import Button from "../../../../general/button";
import Dropdown from "../../../../general/dropdown";
import DetailList from "../../../../general/detailList";
import Modal from "../../../../general/modal";

import './style.css';
import { SubspaceProvider } from "react-redux-subspace";
import { IIOIPStore } from "../../../../redux/namespace";

export default function Page(props:ISearchProps) {
  
  const { sectionVisible, resultVisible, modalVisible } = props;

  const theme: ITheme = createTheme({
    fonts: {
      medium: {
        fontFamily: 'Monaco, Menlo, Consolas',
        fontSize: '30px',
      }
    }
  });
    return (
      <Stack>
        <div className="ms-Grid ms-depth-8 container">
          <div className="ms-Grid-row body">
            <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10 ms-smPush1">
              <div className="ms-Grid">
                <div className="ms-Grid-row section">
                  <div className="ms-Grid-col ms-lg12">
                    <Stack horizontal>Solicitar:</Stack>
                  </div>
                  <div className="ms-Grid-col ms-lg12">
                    <Stack horizontal>
                      {<ChoiceGroup choiceGroup={props.choiceGroup} />}
                    </Stack>
                  </div>
                </div>

                <div className="ms-Grid-row section">
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Sección:
                    <SubspaceProvider
                      mapState={(state: IIOIPStore) => {
                        return {
                          dropdown: state.dropDownSectionSearch
                        };
                      }}
                    >
                      <Dropdown />
                    </SubspaceProvider>
                    
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Subsección:
                    <SubspaceProvider
                      mapState={(state: IIOIPStore) => {
                        return {
                          dropdown: state.dropDownSubsectionSearch
                        };
                      }}
                    >
                      <Dropdown />
                    </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Serie:
                    <SubspaceProvider
                      mapState={(state: IIOIPStore) => {
                        return {
                          dropdown: state.dropDownSerieSearch
                        };
                      }}
                    >
                      <Dropdown />
                    </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Subserie:
                    <SubspaceProvider
                      mapState={(state: IIOIPStore) => {
                        return {
                          dropdown: state.dropDownSubserieSearch
                        };
                      }}
                    >
                      <Dropdown />
                    </SubspaceProvider>
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Usuario Responsable:
                    <Textfield textField={{ onChange: e => {} }} />
                  </div>
                </div>

                {sectionVisible === SectionVisibleEnum.Record ? (
                  <div className="ms-Grid-row section">
                    <Stack>
                      <Separator theme={theme}>Expediente</Separator>
                    </Stack>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      Número Expediente:
                      <Textfield textField={{ onChange: e => {} }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      Titulo Expediente:
                      <Textfield textField={{ onChange: e => {} }} />
                    </div>
                  </div>
                ) : null}

                {sectionVisible === SectionVisibleEnum.Filed ? (
                  <div className="ms-Grid-row section">
                    <Stack>
                      <Separator theme={theme}>Radicado</Separator>
                    </Stack>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      Número Radicado:
                      <Textfield textField={{ onChange: e => {} }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      Asunto Radicado:
                      <Textfield textField={{ onChange: e => {} }} />
                    </div>
                  </div>
                ) : null}

                {sectionVisible === SectionVisibleEnum.DocumentalType ? (
                  <div className="ms-Grid-row section">
                    <Stack>
                      <Separator theme={theme}>Tipo Documental</Separator>
                    </Stack>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      Número Tipo Documental:
                      <Textfield textField={{ onChange: e => {} }} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      Titulo Tipo Documental:
                      <Textfield textField={{ onChange: e => {} }} />
                    </div>
                  </div>
                ) : null}

                <div className="ms-Grid-row footer">
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6 ms-mdPush6">
                    <Stack horizontal>
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { button: state.buttonSearchSearch }; }} >
                        <Button />
                      </SubspaceProvider>
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { button: state.buttonLendSearch }; }} >
                        <Button />
                      </SubspaceProvider>
                      <SubspaceProvider mapState={(state: IIOIPStore) => { return { button: state.buttonCancelSearch }; }} >
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
          <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailList }; }} >
            <DetailList />
          </SubspaceProvider>
        ) : null}

        { modalVisible 
         ?  <SubspaceProvider mapState={(state: IIOIPStore) => { return { modal: state.modalSearch }; }} >
              <Modal />
            </SubspaceProvider>
         : null
         }
      </Stack>
    );
}