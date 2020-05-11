
export class BaseService {

  /** @private */ private _namespaceContext: string;
  ///** @private */ private _overlayController = subspace( (state: IStore) => state.overlay, overlayNamespace)(store);
  constructor(namespaceContext:string) {
    this._namespaceContext = namespaceContext;
  }

    
      public async FetchPost(url:string, body:object = {}):Promise<any> {
       
      }

      public async FetchLocalPost(url:string, body:object = {}):Promise<any> {
      }
}