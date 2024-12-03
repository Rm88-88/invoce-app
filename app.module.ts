   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { FormsModule } from '@angular/forms';
   import { HttpClientModule } from '@angular/common/http';
   import { InvoiceFormComponent } from './invoice-form/invoice-form.component';

   @NgModule({
     declarations: [
       InvoiceFormComponent,
     ],
     imports: [
       BrowserModule,
       FormsModule,
       HttpClientModule,
     ],
     providers: [],
     bootstrap: [InvoiceFormComponent]
   })
   export class AppModule { }
