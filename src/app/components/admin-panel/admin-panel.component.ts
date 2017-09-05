import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {RequestsService} from '../../services/requests.service';


@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
    // public teamClone = JSON.parse(JSON.stringify(this.storageService.team));
    public employeeClone = null;
    public activeEmployee;
    public specializationClone = null;
    public activeSpecialization;

    constructor(
        private storageService: StorageService,
        public domSanitizer: DomSanitizer,
        public requestsService: RequestsService
    ) {}

    ngOnInit() {
    }

    public editingEmployee(employee) {
        this.employeeClone = JSON.parse(JSON.stringify(employee));
        this.activeEmployee = JSON.parse(JSON.stringify(employee));
    }

    public getFileName(event) {
        let file = event.target.files[0];
        this.employeeClone.image = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    }

    public getColor(event, name) {
        const color = document.getElementById(name);
        color.style.backgroundColor = event.target.value;
    }

    public deliteTechnology(technology) {
        const technologies = [];
        for (const item of this.employeeClone.technologies) {
            if (technology.name !== item.name) {
                technologies.push(item);
            }
        }
        this.employeeClone.technologies = technologies;
    }
    public addTechnology() {
        this.employeeClone.technologies.push({
            name: '',
            experience: '',
            ico: '',
            color: ''
        });
    }
    public saveChanges() {
        for (const employee in this.storageService.team) {
            if(this.storageService.team[employee].firstName === this.activeEmployee.firstName) {
                this.storageService.team[employee] = this.employeeClone;
                break;
            }
        }
        this.requestsService.postSaveEditEmployee('team', this.storageService.team);
    }

    public addEmployee() {
        const newEmploee = {
            firstName: '',
            lastName: '',
            sity: '',
            image: '',
            position: '',
            technologies: []
        };
        this.storageService.team.push(newEmploee);
        this.editingEmployee(newEmploee);
    }
    public delEmployee(employeeDel) {
        const mass = [];
        for (const employee of this.storageService.team) {
            if(employee !== employeeDel) {
                mass.push(employee);
            }
        }
        this.storageService.team = mass;
    }

    
    public editingSpecialization(specialization) {
        this.specializationClone = JSON.parse(JSON.stringify(specialization));
        this.activeSpecialization = JSON.parse(JSON.stringify(specialization));
    }

    public saveChangesSpecialization() {
        for (const specialization in this.storageService.specializations) {
            console.log(this.storageService.specializations[specialization].name);
            if(this.storageService.specializations[specialization].name === this.activeSpecialization.name) {
                this.storageService.specializations[specialization] = this.specializationClone;
                break;
            }
        }
    }
    
}
