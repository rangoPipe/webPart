import * as React from "react";
import * as moment from "moment";

import { Stack, Label } from "office-ui-fabric-react";
import { TextFieldGeneral as Textfield } from "../../../../general/textField";
import { ButtonGeneral as Button } from "../../../../general/button";

import { ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";
import { LendingDTO } from "../../../../interface/lending/lendingResult";
import "./style.css";

interface contentModalProps {
  items: LendingDTO[];
  onCancel: any;
}

/**
 * Retorna el HTML del formulario para la modal.
 * @param {contentModalProps} props Atributos del componente
 */
export default function Page(props: contentModalProps) {
  const { items, onCancel } = props;
  const format:string = "YYYY/MM/DD";
  return (
    <Stack>
      <div className="ms-Grid ms-depth-8 container">
        <div className="ms-Grid-row body">
          <div className="ms-Grid-col ms-sm10 ms-md8 ms-lg8 ms-smPush1 ms-mdPush2">
            <div className="ms-Grid">
              <div className="ms-Grid-row section">
                <div className="ms-Grid-row">                  
                    {
                      items.map((x:LendingDTO, i:number) => {
                        return (
                          <div className="ms-Grid-col ms-sm4" key = { i }>
                            <Label>Fecha de Solicitud: </Label>{ moment(x.fecha_solicitud).format(format) }
                            <Label>Estado: </Label>{ x.estado }
                            <Label>Usuario: </Label>{ x.userRequest }
                            <Textfield  textField={{ value: x.observacion, disabled: true, label: "Observación:", rows: 5, multiline: true }}/>
                          </div>)
                      })
                    }
                </div>
              </div>
            </div>
            <div className="ms-Grid-row footer">
              <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg6 ms-mdPush8">
                <Stack horizontal>
                  <Button
                    button={{
                      text: "Cerrar",
                      buttonStyle: ButtonStyle.DefaultButton,
                      onClick: onCancel
                    }}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
}
