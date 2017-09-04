import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
    // public teamClone = JSON.parse(JSON.stringify(this.storageService.team));
    public employeeClone = null;
    public activeEmployee;

    constructor(
        private storageService: StorageService,
        public domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
    }

    public editingEmployee(employee) {
        console.log(this.storageService.team);
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
        for (let employee in this.storageService.team) {
            if(this.storageService.team[employee].firstName === this.activeEmployee.firstName) {
                this.storageService.team[employee] = this.employeeClone;
                break;
            }
        }
    }

}
