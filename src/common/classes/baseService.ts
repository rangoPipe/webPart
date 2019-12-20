
export class BaseService {

    public async httpPost (body:object = {}) { 
        //const aadClient:AadHttpClient = new AadHttpClient(this._context.serviceScope, resourceEndPointApi);
        //const aadClient:HttpClient = new HttpClient(this._context.serviceScope);
    
       /* const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append("Accept","application/json");
    
        const requestOptions : IHttpClientOptions = {
          headers:requestHeaders,
          body: JSON.stringify(body)
        };
    
        let response:Promise<HttpClientResponse> = aadClient.post(`${apiTransferencia}/Api/Record/RecordExpired`,
          HttpClient.configurations.v1,
          requestOptions
        );  
    
        await response.then(
          async (_response: HttpClientResponse) => {
            let result = await _response.json();
            let data = result.map((x: ApiRecordItem, i: number) => {
              return x
            });
          },
          err => {
            console.log(err);
            throw err;
          });*/
      }

      public async FetchPost(url:string, body:object = {}){
        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append("Accept","application/json");

            const requestInit:RequestInit = { method: 'POST',
                       headers: requestHeaders,
                       body: JSON.stringify(body) };
        
           return fetch(url, requestInit)
            .then((_response) => {
                return _response.json();
            })
            .catch(error => console.error('Error:', error))
      }
}