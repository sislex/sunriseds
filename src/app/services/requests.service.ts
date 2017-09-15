import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class RequestsService {
    // private adress = 'http://sunrisapi/';//Local
    private adress = 'http://sunsite.datadizz.com/storage/';//Prodaction

    constructor(private httpClient:HttpClient) {
    }

    public getUsersJson() {
        return this.httpClient.get(this.adress + '?type=users&action=get');
    }

    public getTeamJson() {
        return this.httpClient.get(this.adress + '?type=team&action=get');
    }

    public getSpecializationsJson() {
        return this.httpClient.get(this.adress + '?type=specializations&action=get');
    }

    public getProjectsJson() {
        return this.httpClient.get(this.adress + '?type=projects&action=get');
    }

    public getContactsJson() {
        return this.httpClient.get(this.adress + '?type=contacts&action=get');
    }

    public getAboutJson() {
        return this.httpClient.get(this.adress + '?type=about&action=get');
    }
    
    public postSaveEditJSON(type, data) {
        const url:string = this.adress;
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


    public postSaveEditImage(type, data) {
        const url = this.adress;
            const headers = new HttpHeaders()
                .set('Content-Type', 'multipart/form-data');

            const params = new HttpParams()
                .set('type', type);

            const body = {
                // id: id,
                // data: layer
            };

            // return this.http.post(url, body, { headers, params });
        }

}
