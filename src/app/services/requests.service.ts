import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RequestsService {

    constructor(private httpClient: HttpClient) {
    }
    
    public getUsersJson() {
        return this.httpClient.get('http://sunrisapi/?type=users&action=get');
    }
    
    public getTeamJson() {
        return this.httpClient.get('http://sunrisapi/?type=team&action=get');
    }

}
