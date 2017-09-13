import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-admin-panel-contacts',
    templateUrl: './admin-panel-contacts.component.html',
    styleUrls: ['./admin-panel-contacts.component.scss']
})
export class AdminPanelContactsComponent implements OnInit {
    public contactActive;
    public keyActive;

    constructor( private storageService: StorageService ) {}

    ngOnInit() {}

    public addContact() {
        this.contactActive = [];
        let id: number;
        if (this.storageService.contactsClone.length) {
            id = parseInt(this.storageService.contactsClone[this.storageService.contactsClone.length - 1].id) + 1;
        } else {
            id = 1;
        }
        this.contactActive.push({
            id: id,
            country: '',
            longitude: '',
            latitude: '',
            address: '',
            emails: []
        });
        this.editingContact(this.contactActive[this.contactActive.length - 1], this.storageService.contactsClone.length);
    }

    public editingContact(contact, i) {
        this.keyActive = i;
        this.contactActive = JSON.parse(JSON.stringify(contact));
    }

    public delContact(key) {
        this.storageService.contactsClone.splice(key, 1);
        this.storageService.contacts = JSON.parse(JSON.stringify(this.storageService.contactsClone));
    }
    
    public undoModalWindows() {
        this.storageService.contactsClone = JSON.parse(JSON.stringify(this.storageService.contacts));
    }

    public delEmail(emails, i) {
        emails.splice(i, 1);
    }
    
    public addEmail(emails) {
        emails.push({
            email: ''
        });
    }

    public saveChanges() {
        this.storageService.contactsClone.splice(this.keyActive, 1, this.contactActive);
        this.storageService.contacts = JSON.parse(JSON.stringify(this.storageService.contactsClone));
    }

}
