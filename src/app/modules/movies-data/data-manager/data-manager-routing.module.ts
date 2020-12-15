import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagerComponent } from './data-manager.component';

const routes: Routes = [
  { path: '', component: DataManagerComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ]
})
export class DataManagerRoutingModule {
}
