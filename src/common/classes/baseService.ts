
export class BaseService {

  /** @private */ private _namespaceContext: string;
  constructor(namespaceContext:string) {
    this._namespaceContext = namespaceContext;
  }


      public async FetchPost(url:string, body:object = {}):Promise<any> {
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
}