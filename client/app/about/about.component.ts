import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product.model';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {

  constructor(private productService: ProductService, public toast: ToastComponent, private auth: AuthService, private userService: UserService) { }

  product = new Product();
  products = [];
  isLoading = true;
  user: User;
  admin: any;

    ngOnInit() {
      this.getProduct();
      this.getUser();
      this.getAdmin();
    }

    getUser() {
      this.userService.getUser(this.auth.currentUser).subscribe(
        (data) => {
          this.user = data;
          console.log(this.user.sold);
        },
        error => console.log(error),
        () => this.isLoading = false,
      );
    }

    getAdmin() {
      this.userService.getUsers().subscribe(
        (data) => {
          this.admin = data.filter(user => user.role === 'admin');
          this.admin = this.admin[0];
          console.log(this.admin);
        },
        error => console.log(error),
        () => this.isLoading = false,
      );
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

    editUser() {
      this.userService.editUser(this.user).subscribe(
        (res) => {
          this.toast.setMessage('account settings saved!', 'success');
        },
        error => console.log(error),
      );
    }

    editAdmin() {
      this.userService.editUser(this.admin).subscribe(
        (res) => {
          this.toast.setMessage('account settings saved!', 'success');
        },
        error => console.log(error),
      );
    }
  
    editProduct(product) {
      this.productService.editProduct(product).subscribe(
        (res) => {
          this.toast.setMessage('account settings saved!', 'success');
        },
        error => console.log(error),
      );
    }


    buyProduct(product){
      if (product.price > this.user.sold) {
        alert('recharge your account');
      } else {
        this.user.sold -= product.price;
        this.admin.sold += product.price;
      }
      this.editUser();
      this.editAdmin();
      this.editProduct(product);
    }
}
