import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../@core/@models/@interface/product';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @ViewChild(NgForm) productForm: NgForm;

  errorMessage: string;
  product: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // debugger;
    this.route.parent.data.subscribe((data) => {
      debugger;
      if (this.productForm) {
        this.productForm.reset();
      }
      this.product = data['resolvedProductData'].product;
    });
  }
}
