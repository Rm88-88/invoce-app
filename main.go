  ```go
   package main

   import (
       "encoding/json"
       "net/http"
       "sync"
       "time"
   )

   type Invoice struct {
       ID             int       `json:"id"`
       Name           string    `json:"name"`
       Phone          string    `json:"phone"`
       BusinessNumber string    `json:"business_number"`
       InvoiceNumber  int       `json:"invoice_number"`
       Items          []Item    `json:"items"`
       PaymentMethod  string    `json:"payment_method"`
       Total          float64   `json:"total"`
       CreatedAt      time.Time `json:"created_at"`
   }

   type Item struct {
       Description string  `json:"description"`
       Quantity    int     `json:"quantity"`
       Price       float64 `json:"price"`
       Subtotal    float64 `json:"subtotal"`
   }

   var (
       invoices []Invoice
       mu       sync.Mutex
   )

   func createInvoice(w http.ResponseWriter, r *http.Request) {
       var invoice Invoice
       if err := json.NewDecoder(r.Body).Decode(&invoice); err != nil {
           http.Error(w, err.Error(), http.StatusBadRequest)
           return
       }

       mu.Lock()
       invoice.ID = len(invoices) + 1
       invoice.CreatedAt = time.Now()
       invoices = append(invoices, invoice)
       mu.Unlock()

       w.WriteHeader(http.StatusCreated)
       json.NewEncoder(w).Encode(invoice)
   }

   func main() {
       http.HandleFunc("/invoices", createInvoice)
       http.ListenAndServe(":8080", nil)
   }
   ```
