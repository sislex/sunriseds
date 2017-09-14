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

    public getAboutJson() {
        return this.httpClient.get('http://sunrisapi/?type=about&action=get');
    }
    
    public postSaveEditJSON(type, data) {
        const url:string = 'http://sunrisapi/';
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        this.httpClient.post(url, {type: type, data: data}, {headers})
            .subscribe(
                (data) => {
                    console.log('server returned data:');
                    console.log(data);
                },
                (err) => {
                    console.log('server error:');
                    console.log(err);
                }
            );
    }

}
