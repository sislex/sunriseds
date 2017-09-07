import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";

const ROUTES = [
    {path: '', component: AdminPanelComponent, children: [
        {path: '', component: AdminPanelComponent},
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {
}


