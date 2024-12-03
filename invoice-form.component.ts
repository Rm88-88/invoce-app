 ```typescript
   import { Component } from '@angular/core';
   import { HttpClient } from '@angular/common/http';

   @Component({
     selector: 'app-invoice-form',
     templateUrl: './invoice-form.component.html'
   })
   export class InvoiceFormComponent {
     invoice = {
       name: '',
       phone: '',
       businessNumber: '',
       invoiceNumber: 0,
       items: [],
       paymentMethod: '',
       total: 0
     };

     constructor(private http: HttpClient) {}

     addItem() {
       this.invoice.items.push({ description: '', quantity: 0, price: 0, subtotal: 0 });
     }

     calculateSubtotal(index: number) {
       const item = this.invoice.items[index];
       item.subtotal = item.quantity * item.price;
       this.invoice.total = this.invoice.items.reduce((sum, item) => sum + item.subtotal, 0);
     }

     onSubmit() {
       this.http.post('/invoices', this.invoice).subscribe(response => {
         console.log('Invoice saved', response);
       });
     }
   }
   ```
