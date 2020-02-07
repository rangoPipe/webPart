import * as React from "react";
import Page from "./page";
import { IMainProps, IMainState } from "./IMain";
import { SubspaceProvider } from "react-redux-subspace";
import { IIOIPStore } from "../../redux/namespace";
import { EnumModules } from "../../common/enum/mainEnum";

import Owner from "../transfer/components/owner";

import PendingArchivist from "../transfer/components/archivist/pending";
import ApprovedArchivist from "../transfer/components/archivist/approved";
import RejectedArchivist from "../transfer/components/archivist/rejected";

import SendRequest from "../lending/components/sendedRequest";
import ReceivedRequest from "../lending/components/receivedRequest";
import Payback from "../lending/components/payback";
import Lending from "../lending/components/lending";
import Search from "../lending/components/search";
import Report from "../lending/components/report";

/**
 * @class Clase Main contenedor principal.
 */
export default class Main extends React.Component<IMainProps, IMainState> { 

  constructor(props:IMainProps) {
    super(props);

    this.state = {
      menu: null
    };
  }

  public changeState = (value:string) => {
    this.setState({ ...this.state, menu: value});
  }


  private _getComponent = (name: EnumModules) => {
    switch (name) {
      case EnumModules.Owner:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextSearch: state.contextOwner,
                dialogOwner: state.dialogOwner,
                textAreaOwner: state.textAreaOwner,
                commandBarOwner: state.commandBarOwner,
                detailListOwner: state.detailListOwner,
                messageBarOwner: state.messageBarOwner,
              };
            }}
          >
            <Owner key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.PendingArchivist:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextPendingArchivist: state.contextPendingArchivist,
                dialogPendingArchivist: state.dialogPendingArchivist,
                stextAreaPendingArchivists: state.textAreaPendingArchivist,
                messageBarPendingArchivist: state.messageBarPendingArchivist,
                commandBarPendingArchivist: state.commandBarPendingArchivist,
                detailListPendingArchivist: state.detailListPendingArchivist,
              };
            }}
          >
            <PendingArchivist key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.ApprovedArchivist:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {            
              return {
                contextApprovedArchivist: state.contextApprovedArchivist,
                detailListApprovedArchivist: state.detailListApprovedArchivist,
              };
            }}
          >
            <ApprovedArchivist key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.RejectedArchivist:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextRejectedArchivist: state.contextRejectedArchivist,
                detailListRejectedArchivist: state.detailListRejectedArchivist,
                chkRejectedReport: state.chkRejectedReport,
              };
            }}
          >
            <RejectedArchivist key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.SearchLending:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextSearch: state.contextSearch,
                detailListSearch: state.detailListSearch,
                dropDownSectionSearch: state.dropDownSectionSearch,
                dropDownSubsectionSearch: state.dropDownSubsectionSearch,
                dropDownSerieSearch: state.dropDownSerieSearch,
                dropDownSubserieSearch: state.dropDownSubserieSearch,
                buttonSearchSearch: state.buttonSearchSearch,
                buttonCancelSearch: state.buttonCancelSearch,
                buttonLendSearch: state.buttonLendSearch,
                buttonResponseSearch: state.buttonResponseSearch,
                modalSearch: state.modalSearch,
                textAreaSearch: state.textAreaSearch,
                messageBarSearch: state.messageBarSearch
              };
            }}
          >
            <Search key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.RequestLending:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextSended: state.contextSended,
                detailListSended: state.detailListSended,
                commandBarSended: state.commandBarSended,
                modalSended: state.modalSended,
                dialogSended: state.dialogSended,
                txtFilterDtlSended: state.txtFilterDtlSended
              };
            }}
          >
            <SendRequest key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.ReceivedLending:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextReceived: state.contextReceived,
                detailListReceived: state.detailListReceived,
                commandBarReceived: state.commandBarReceived,
                modalReceived: state.modalReceived,
                messageBarReceived: state.messageBarReceived,
                textAreaReceived: state.textAreaReceived,
                choiceGroupReceived: state.choiceGroupReceived,
                btnLeadReceived: state.btnLeadReceived,
                txtFilterDtlReceived: state.txtFilterDtlReceived
              };
            }}
          >
            <ReceivedRequest key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.PaybackLending:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextPayback: state.contextPayback,
                detailListPayback: state.detailListPayback,
                commandBarPayback: state.commandBarPayback,
                dialogPayback: state.dialogPayback,
                txtFilterDtlPayback: state.txtFilterDtlPayback
              };
            }}
          >
            <Payback key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.LendLending:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextLending: state.contextLending,
                detailListLending: state.detailListLending,
                commandBarLending: state.commandBarLending,
                dialogLending: state.dialogLending,
                modalLending: state.modalLending,
                messageBarLending: state.messageBarLending,
                textAreaLending: state.textAreaLending,
                txtFilterDtlLending: state.txtFilterDtlLending
              };
            }}
          >
            <Lending key={this.props.key} />
          </SubspaceProvider>
        );
      case EnumModules.ReportLending:
        return (
          <SubspaceProvider
            mapState={(state: IIOIPStore) => {
              return {
                contextReport: state.contextReport,
                detailListReport: state.detailListReport,
                buttonSearchReport: state.buttonSearchReport,
                buttonCancelReport: state.buttonCancelReport,
                datePickerStartReport: state.datePickerStartReport,
                datePickerEndReport: state.datePickerEndReport,
                chkSendedReport: state.chkSendedReport,
                chkRequestReport: state.chkRequestReport,
                chkAcceptedReport: state.chkAcceptedReport,
                chkRejectedReport: state.chkRejectedReport,
                chkLendedReport: state.chkLendedReport,
                chkPaybackReport: state.chkPaybackReport,
                txtFilterDtlReport: state.txtFilterDtlReport,
                commandBarReport: state.commandBarReport,
                modalReport: state.modalReport
              };
            }}
          >
            <Report key={this.props.key} />
          </SubspaceProvider>
        );
      default:
        return null;
    }
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return (
      <Page
        title={this.props.title}
        key={this.props.key}
        menu={this.state.menu}
        onClickMenu={this.changeState}
        getComponent={this._getComponent}
      />
    );
  }
}
