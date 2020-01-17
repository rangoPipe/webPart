import * as React from "react";

import { Stack } from "office-ui-fabric-react";
import { ButtonGeneral as Button } from "../../../../general/button";

import { ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";
import { LendingDTO } from "../../../../interface/lending/lendingResult";
import './style.css';

interface contentModalProps { 
    item?:LendingDTO; 
    onCancel:any; 
}


export default function Page(props : contentModalProps ) {
  const { onCancel } = props;
  
    return (
    <Stack>
        <div className="ms-Grid ms-depth-8 container">
          <div className="ms-Grid-row body">
            <div className="ms-Grid-col ms-sm10 ms-md8 ms-lg8 ms-smPush1 ms-mdPush2">
              <div className="ms-Grid">
                <div className="ms-Grid-row section">
                  <div className="ms-Grid-row">
                    


                  </div>
                </div>
                </div>
                <div className="ms-Grid-row footer">
                <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg6 ms-mdPush8">
                  <Stack horizontal>
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