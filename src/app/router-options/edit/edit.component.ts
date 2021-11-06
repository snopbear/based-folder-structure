import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/@core/@models/@interfaces/base-component/base-component';
import { Product, ProductResolved } from '../@core/@models/interface/product';
import { ProductsService } from '../@core/@service/products/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, BaseComponent {
  form!: FormGroup;
  isFormSubmitted = false;
  isFormValid = () => this.isFormSubmitted || !this.form?.dirty;
  pageTitle = 'Product Edit';
  errorMessage: string;

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return (
      JSON.stringify(this.originalProduct) !==
      JSON.stringify(this.currentProduct)
    );
  }

  private currentProduct: Product;
  private originalProduct: Product;

  get product(): Product {
    return this.currentProduct;
  }
  set product(value: Product) {
    this.currentProduct = value;
    // Clone the object to retain a copy
    this.originalProduct = value ? { ...value } : null;
  }

  constructor(
    private productService: ProductsService,
    // private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolvedData: ProductResolved = data['resolvedProductData'];
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.product);
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product.productName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentProduct = null;
    this.originalProduct = null;
  }

  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The new ${this.product.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        // this.productService.updateProduct(this.product).subscribe({
        //   next: () =>
        //     this.onSaveComplete(
        //       `The updated ${this.product.productName} was saved`
        //     ),
        //   error: (err) => (this.errorMessage = err),
        // });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
    this.isFormSubmitted = true;
  }

  onSaveComplete(message?: string): void {
    if (message) {
      // this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (
      this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode
    ) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.category && this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}