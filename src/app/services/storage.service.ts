import {Injectable} from '@angular/core';
import {RequestsService} from './requests.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StorageService {
    public teamObservable: Observable<any>;
    public team = [];
    public specializations = [];
    public projects = [];

    constructor(private requestsService: RequestsService) {
        this.getTeam();
        this.getSpecializations();
        this.getProjects();
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
    public getProjects() {
        this.teamObservable = this.requestsService.getProjectsJson();
        this.teamObservable.subscribe((data: any) => {
            this.projects = data;
        });
    }
    
}
