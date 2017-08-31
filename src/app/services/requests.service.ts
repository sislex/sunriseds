import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RequestsService {

    constructor(private httpClient: HttpClient) {
    }
    
    public getUsersJson() {
        return this.httpClient.get('http://localhost:4200/assets/json/users.json');
    }

}
