import * as React from 'react';
import { AadHttpClient, IHttpClientOptions, HttpClientResponse } from "@microsoft/sp-http";
import { Subspace, subspace } from "redux-subspace";

import { IContextProps } from "../../redux/reducers/common/IContextProps";
import { IStore } from "../../redux/namespace";
//import { overlay as overlayNamespace } from "../../redux/namespace";
//import { createOverlay } from "../../redux/actions/general/overlay/_actionName";
import store from "../../redux/store";
import { ProgressIndicator } from 'office-ui-fabric-react';

export class BaseService {

  /** @private */ private _namespaceContext: string;
  ///** @private */ private _overlayController = subspace( (state: IStore) => state.overlay, overlayNamespace)(store);
  constructor(namespaceContext:string) {
    this._namespaceContext = namespaceContext;
  }
  /** @private */ private _contextController: Subspace<IContextProps, any, IStore> = subspace((state: IStore) => state[this._namespaceContext], this._namespaceContext)(store);

    
      public async FetchPost(url:string, body:object = {}):Promise<any> {
        //this._showLoader(false);
        const aadClient:AadHttpClient = new AadHttpClient(this._contextController.getState().context.serviceScope, this._contextController.getState().resourceEndPointApi);
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append("Accept","application/json");
    
        const requestOptions : IHttpClientOptions = {
          headers:requestHeaders,
          body: JSON.stringify(body)
        };
    
        let response:Promise<HttpClientResponse> = aadClient.post(url,
          AadHttpClient.configurations.v1,
          requestOptions
        );
    
        return response.then((_response) => {
            //this._showLoader(true);
            return _response.json();
        })
        .catch(error => {
          console.error('Error:', error);
          //this._showLoader(true);
        });
      }

      public async FetchLocalPost(url:string, body:object = {}):Promise<any> {
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append("Accept","application/json");

        const requestInit:RequestInit = { method: 'POST', headers: requestHeaders,  body: JSON.stringify(body) };
        
        return fetch(url, requestInit)
        .then((_response) => {
            return _response.json();
        })
        .catch(error => console.error('Error:', error));
      }

      /*private _showLoader(hidden) {
        this._overlayController.dispatch({ type: createOverlay, payload: {
          hidden,
          content:  this._createLoader(),
          isDarkThemed: true
        }})
      };*/

      private _createLoader(): React.ReactElement { 
        let loader:React.ReactElement;
        
        if(this._contextController.getState().iconLoader.trim().length > 0) {
          loader = React.createElement('img', { src:this._contextController.getState().iconLoader, alt:"Cargando..." });         
        } else {
          loader =  React.createElement(ProgressIndicator, { barHeight:5 });
        }
        return React.createElement("div",{ style: { position:"absolute", top:"45%", width:"100%" }  },loader);
      }
}