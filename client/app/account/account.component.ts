import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {

  user: User;
  isLoading = true;
  sold = 0;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      (data) => {
        this.user = data;
        // this.getWTF();
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  save(user: User) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error),
    );
  }

  addWTF() {
    if (this.user.sold !== 0) {
      this.sold = this.user.sold;
    }
    this.sold += 1;
  }

  // getWTF() {
  // this.user.sold = 50;
  // }

}
