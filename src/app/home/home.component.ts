import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../@core/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  ngOnInit() {}
}
