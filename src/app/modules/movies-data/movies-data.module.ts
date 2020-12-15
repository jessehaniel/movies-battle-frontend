import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { DataManagerRoutingModule } from './data-manager/data-manager-routing.module';
import { DataManagerService } from './data-manager/data-manager.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DataManagerComponent],
  imports: [
    CommonModule,
    DataManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbPaginationModule,
  ],
  providers: [
    DataManagerService
  ]
})
export class MoviesDataModule {
  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
