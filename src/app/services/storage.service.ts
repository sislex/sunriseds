import {Injectable} from '@angular/core';
import {RequestsService} from './requests.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StorageService {
    public teamObservable: Observable<any>;
    public specializationsObservable: Observable<any>;
    public projectsObservable: Observable<any>;
    public contactsObservable: Observable<any>;
    public aboutObservable: Observable<any>;
    public team = [];
    public teamClone = [];
    public specializations = [];
    public specializationsClone = [];
    public projects = [];
    public projectsClone = [];
    public contacts = [];
    public contactsClone = [];
    public about = [];
    public aboutClone = [];
    public aboutImages = [];

    constructor(private requestsService: RequestsService) {
        this.getTeam();
        this.getSpecializations();
        this.getProjects();
        this.getContacts();
        this.getAbout();
    }

    public getTeam() {
        this.teamObservable = this.requestsService.getTeamJson();
        this.teamObservable.subscribe((data: any) => {
            this.team = data;
            this.teamClone = JSON.parse(JSON.stringify(this.team));
        });
    }
    public getSpecializations() {
        this.specializationsObservable = this.requestsService.getSpecializationsJson();
        this.specializationsObservable.subscribe((data: any) => {
            this.specializations = data;
            this.specializationsClone = JSON.parse(JSON.stringify(this.specializations));
        });
    }
    public getProjects() {
        this.projectsObservable = this.requestsService.getProjectsJson();
        this.projectsObservable.subscribe((data: any) => {
            this.projects = data;
            this.projectsClone = JSON.parse(JSON.stringify(this.projects));
        });
    }
    public getContacts() {
        this.contactsObservable = this.requestsService.getContactsJson();
        this.contactsObservable.subscribe((data: any) => {
            this.contacts = data;
            this.contactsClone = JSON.parse(JSON.stringify(this.contacts));
        });
    }
    
    public saveChanges() {
        // this.requestsService.postSaveEditImage();
        this.about = JSON.parse(JSON.stringify(this.aboutClone));
        this.postSaveEditJSON('about', this.about);
    }
    
    public getAbout() {
        this.aboutObservable = this.requestsService.getAboutJson();
        this.aboutObservable.subscribe((data: any) => {
            this.about = data;
            this.aboutClone = JSON.parse(JSON.stringify(this.about));
        });
    }
    
    public postSaveEditJSON(type, data) {
        this.requestsService.postSaveEditJSON(type, data);
    }
}
