import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-admin-panel-about',
    templateUrl: './admin-panel-about.component.html',
    styleUrls: ['./admin-panel-about.component.scss']
})
export class AdminPanelAboutComponent implements OnInit {

    constructor( private storageService: StorageService ) {}

    ngOnInit() {}

    public cancelChanges() {
        this.storageService.aboutClone = JSON.parse(JSON.stringify(this.storageService.about));
    }

    public saveChanges() {
        this.storageService.about = JSON.parse(JSON.stringify(this.storageService.aboutClone));
    }

}
