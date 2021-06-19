import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { HomeComponent } from './page/home/home.component';



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [DashboardRoutingModule, SharedModule],
    exports: [],
    providers: [],
    entryComponents: []
})
export class DashboardModule { }
