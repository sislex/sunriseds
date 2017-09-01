import {Injectable} from '@angular/core';
import {RequestsService} from './requests.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StorageService {
    public teamObservable: Observable<any>;
    public team = [];

    constructor(private requestsService: RequestsService) {
        this.getTeam();
    }

    public getTeam() {
            this.teamObservable = this.requestsService.getTeamJson();
            this.teamObservable.subscribe((data: any) => {
                this.team = data;
            });
    }
    
}
