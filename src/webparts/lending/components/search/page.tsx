import React from "react";
import { ISearchProps, SectionVisibleEnum, IdDropdownsEnum } from "./ISearchProps";

import { Separator, Stack, ITheme, createTheme } from "office-ui-fabric-react";
import { ButtonGeneral as  Button } from "../../../../general/button";
import { TextFieldGeneral as Textfield } from "../../../../general/textField";
import { DropdownGeneral as Dropdown } from "../../../../general/dropdown";
import DetailList  from "../../../../general/detailList";
import { ChoiceGroupGeneral as ChoiceGroup } from "../../../../general/choiceGroup";

import './style.css';
import { IButtonProps } from "../../../../redux/reducers/general/button/IButtonProps";
import { SubspaceProvider } from "react-redux-subspace";
import { IIOIPStore } from "../../../../redux/namespace";

export default function Page(props:ISearchProps) {

  const { sectionVisible } = props;

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
                    <Dropdown
                      dropdown={
                        props.dropdowns.filter(
                          x => x.id === IdDropdownsEnum.ddlSection.toString()
                        )[0]
                      }
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Subsección:
                    <Dropdown
                      dropdown={
                        props.dropdowns.filter(
                          x => x.id === IdDropdownsEnum.ddlSubsection.toString()
                        )[0]
                      }
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Serie:
                    <Dropdown
                      dropdown={
                        props.dropdowns.filter(
                          x => x.id === IdDropdownsEnum.ddlSerie.toString()
                        )[0]
                      }
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                    Subserie:
                    <Dropdown
                      dropdown={
                        props.dropdowns.filter(
                          x => x.id === IdDropdownsEnum.ddlSubserie.toString()
                        )[0]
                      }
                    />
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
                      {props.buttons.map((item: IButtonProps, key: number) => {
                        return !item.hidden ? (
                          <Button key={key} button={item} />
                        ) : null;
                      })}
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {props.resultVisible ? (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                detailList: state.detailList
              };
            }}
          >
            <DetailList />
          </SubspaceProvider>
        ) : null}
      </Stack>
    );
}