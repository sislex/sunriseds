import {Injectable} from '@angular/core';
import {RequestsService} from './requests.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StorageService {
    public teamObservable: Observable<any>;
    public team = [];
    public specializations = [];
    public specializationsClone = [];
    public projects = [];
    public contacts = [];
    public contactsClone = [];

    constructor(private requestsService: RequestsService) {
        this.getTeam();
        this.getSpecializations();
        this.getProjects();
        this.getContacts();
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
            this.specializationsClone = JSON.parse(JSON.stringify(this.specializations));
        });
    }
    public getProjects() {
        this.teamObservable = this.requestsService.getProjectsJson();
        this.teamObservable.subscribe((data: any) => {
            this.projects = data;
        });
    }
    public getContacts() {
        this.teamObservable = this.requestsService.getContactsJson();
        this.teamObservable.subscribe((data: any) => {
            this.contacts = data;
            this.contactsClone = JSON.parse(JSON.stringify(this.contacts));
        });
    }
    
}
