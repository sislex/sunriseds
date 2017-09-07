import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {AdminPanelTeamComponent} from "./components/admin-panel-team/admin-panel-team.component";

const ROUTES = [
    {path: '', component: AdminPanelComponent, children: [
        {path: 'team', component: AdminPanelTeamComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {
}


