import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
    public id;
    public firstName;
    public lastName;
    public sity;
    public image;
    public position;
    public technologies;

    constructor(
        private storageService: StorageService,
        public domSanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
    }

    public editingEmployee(employee) {
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.sity = employee.sity;
        this.image = employee.image;
        this.position = employee.position;
        this.technologies = employee.technologies;
        console.log(employee);
    }

    public getFileName(event) {
        let file = event.target.files[0];
        this.image = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    }

    public getColor(event, name) {
        const color = document.getElementById(name);
        color.style.backgroundColor = event.target.value;
    }

}
