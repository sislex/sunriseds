import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RequestsService {

    constructor(private httpClient:HttpClient) {
    }

    public getUsersJson() {
        return this.httpClient.get('http://sunrisapi/?type=users&action=get');
    }

    public getTeamJson() {
        return this.httpClient.get('http://sunrisapi/?type=team&action=get');
    }
    public getSpecializationsJson() {
        return this.httpClient.get('http://sunrisapi/?type=specializations&action=get');
    }
    public getProjectsJson() {
        return this.httpClient.get('http://sunrisapi/?type=projects&action=get');
    }
    public getContactsJson() {
        return this.httpClient.get('http://sunrisapi/?type=contacts&action=get');
    }

    
    
    
    
    public postSaveEditEmployee(type, data) {
        // return this.httpClient.post('http://sunrisapi/?type=type&action=data');

        // console.log('postSaveEditEmployee() is called');
        // const url:string = 'http://sunrisapi/';
        // const headers = new HttpHeaders()
        //     .set('Content-Type', 'application/json');
        //
        // this.httpClient.post(url, '{"qwe": "qwe"}', {headers})
        //     .subscribe(
        //         (data) => {
        //             console.log('server returned data:');
        //             console.log(data);
        //         },
        //         (err) => {
        //             console.log('server error:');
        //             console.log(err);
        //         }
        //     );
        
    }


}
