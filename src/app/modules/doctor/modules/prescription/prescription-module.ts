import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing-module';
import { AddPrescription } from './add-prescription/add-prescription';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddPrescription
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    FormsModule    
  ]
})
export class PrescriptionModule { }
