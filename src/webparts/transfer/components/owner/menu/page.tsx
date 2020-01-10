import * as React from "react";
import { IOwnerMenuProps } from "./IOwnerMenuProps";
import { SubspaceProvider } from "react-redux-subspace";
import { IIOIPStore } from "../../../../../redux/namespace";

import CommandBar from "../../../../../general/commandBar";

/**
 * Retorna el HTML del menu para el Propietario
 * @param {IOwnerMenuProps} props Atributos del componente OwnerMenu
 */
function Page(props: IOwnerMenuProps) {
  return (
    <div>
        <SubspaceProvider  mapState={(state: IIOIPStore) => { return { commandBar: state.commandBar }; }} >
          <CommandBar />
        </SubspaceProvider>
    </div>
  );
}

export default Page;
