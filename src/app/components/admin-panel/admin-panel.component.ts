import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
    
    

    constructor() {}

    ngOnInit() {}
    

    public getColor(event, name) {
        // const color = document.getElementById(name);
        // color.style.backgroundColor = event.target.value;
    }

    
    
    
    
    
}
