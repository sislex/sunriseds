import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {RequestsService} from '../../services/requests.service';

@Component({
    selector: 'app-admin-panel-team',
    templateUrl: './admin-panel-team.component.html',
    styleUrls: ['./admin-panel-team.component.scss']
})
export class AdminPanelTeamComponent implements OnInit {
    public employeeClone = null;
    public activeEmployee;
    public specializationEmployee;

    constructor(
        private storageService: StorageService,
        private requestsService: RequestsService,
        public domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
    }

    public editingEmployee(employee) {
        this.employeeClone = JSON.parse(JSON.stringify(employee));
        this.activeEmployee = JSON.parse(JSON.stringify(employee));
        this.specializationEmployee = [];
        console.log(employee);
        for (const employeeTechnology of employee.technologies) {
            for (const technology of this.storageService.specializations) {
                if (employeeTechnology.id === technology.id) {
                    let tech = {
                        id: technology.id,
                        name: technology.name,
                        experience: employeeTechnology.experience
                    };
                    this.specializationEmployee.push(tech);
                    break;
                }
            }
        }
    }

    public getFileName(event) {
        let file = event.target.files[0];
        this.employeeClone.image = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    }

    public deliteTechnology(technology) {
        const technologies = [];
        for (const item of this.specializationEmployee) {
            if (technology !== item) {
                technologies.push(item);
            }
        }
        this.specializationEmployee = technologies;
    }
    public addTechnology() {
        console.log(this.specializationEmployee);
        this.specializationEmployee.push({
            id: "",
            name: "",
            experience: ""
        });
    }
    public saveChanges() {
        const specializations = [];
        for (const specialization of this.specializationEmployee) {
            for (const technology of this.storageService.specializations) {
                if (specialization.name === technology.name) {
                    specializations.push({
                        id: technology.id,
                        experience: specialization.experience
                    });
                }
            }
        }
        this.employeeClone.technologies = specializations;
        console.log(this.employeeClone);
        for (const employee in this.storageService.team) {
            if(this.storageService.team[employee].id === this.activeEmployee.id) {
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

}
