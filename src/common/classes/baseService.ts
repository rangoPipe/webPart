import * as React from 'react';
import { subspace } from "redux-subspace";
import { IIOIPStore } from "../../redux/namespace";
import { overlay as overlayNamespace } from "../../redux/namespace";
import { hideOverlay, createOverlay } from "../../redux/actions/general/overlay/_actionName";
import store from "../../redux/store";
import { SpinnerGeneral as Spinner } from "../../general/spinner";


export class BaseService {

  /** @private */ private _namespaceContext: string;
  /** @private */ private _overlayController = subspace( (state: IIOIPStore) => state.overlay, overlayNamespace)(store);

  constructor(namespaceContext:string) {
    this._namespaceContext = namespaceContext;
  }

      public async FetchPost(url:string, body:object = {}):Promise<any> {
        this._overlayController.dispatch({ type: createOverlay, payload: {
          hidden:false,
          content: this._createLoader()
        }});        
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append("Accept","application/json");

        const requestInit:RequestInit = { method: 'POST', headers: requestHeaders,  body: JSON.stringify(body) };
        
        return await fetch(url, requestInit)
        .then((_response) => {          
            this._overlayController.dispatch({ type: hideOverlay, payload: true});
            return _response.json();
        })
        .catch(error => {
          console.error('Error:', error);          
          this._overlayController.dispatch({ type: hideOverlay, payload: true});
        });
      }


      private _createLoader(): React.ReactElement {        
        return React.createElement(Spinner, { spinner : { label : "Cargando..."} });
      }
}