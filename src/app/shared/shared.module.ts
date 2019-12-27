import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule, NgbDropdownModule, NgbDatepickerModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbDropdownModule,
    NgbDatepickerModule
  ],
  exports: [
    HeaderComponent,
    NgbModule,
    NgbDropdownModule,
    NgbDatepickerModule
  ],
  providers: []
})
export class SharedModule { }
