import {Injectable} from '@angular/core';
import {RequestsService} from './requests.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StorageService {
    public teamObservable: Observable<any>;
    public team = [];
    public specializations = [];

    constructor(private requestsService: RequestsService) {
        this.getTeam();
        this.getSpecializations();
    }

    public getTeam() {
            this.teamObservable = this.requestsService.getTeamJson();
            this.teamObservable.subscribe((data: any) => {
                this.team = data;
            });
    }
    public getSpecializations() {
        this.teamObservable = this.requestsService.getSpecializationsJson();
        this.teamObservable.subscribe((data: any) => {
            this.specializations = data;
        });
    }
    
}
