import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product.model';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {

  constructor(private productService: ProductService, private userService: UserService) { }

  newProduct: Product = new Product();
  product = new Product();
  products: Product[] = [];
  isLoading = true;
  sold

    // Développeurs

    ngOnInit() {
      this.getProduct();
    }

    getProduct() {
      this.productService.getProducts().subscribe(
        (data) => {
          this.products = data;
        },
        error => console.log(error),
        () => this.isLoading = false,
      );
    }

    buyProduct(){
      this.sold = this.sold - this.product.price;
    }
}
