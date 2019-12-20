import * as React from "react";
import { ShimmeredDetailsList } from "office-ui-fabric-react";
import { IDetailListGeneralProps } from "./IDetailListGeneralProps";

/**
 * Retorna el HTML del componente DetailList
 * @param {IDetailListGeneralProps} props Atributos del componente DetailList
 */
function Page(props: IDetailListGeneralProps) {
  const { detailList } = props;

  return (
    <div>
      <ShimmeredDetailsList
        items={detailList.items}
        columns={detailList.columns}
        checkboxVisibility={detailList.checkboxVisibility}
        groups={detailList.groups}
        groupProps={detailList.groupProps}
        selection={detailList.selection}
        enableShimmer ={detailList.enableShimmer}
        selectionMode = { detailList.selectionMode }
      />
    </div>
  );
}

export default Page;
