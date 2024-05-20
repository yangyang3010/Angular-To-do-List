import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/userservice";
import {User} from "../../core/dtos/user";
import {ResponseDto} from "../../core/dtos/response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  usernameValue = "";
  passwordValue = "";

  constructor(private router: Router, private userService: UserService) {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToHomepage(){
    let user = new User();
    user.username = this.usernameValue;
    user.password = this.passwordValue;
    this.userService.checkUserLogin(user).subscribe(
      res => {
        // Handle the response
        this.checkUserComplete(res);
        console.log(res);
      },
      error => {
        // Handle error
        console.error('Error:', error);
      }
    );
  }

  checkUserComplete(res:ResponseDto<User>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    let user = res.result;
    if (user === null) {
      alert("Khong tim thay user");
    }
    else {
    if(user.password !== this.passwordValue) {
          alert("Sai mat khau");
          return
    }
    localStorage.setItem('user_id', user!.id);
    localStorage.setItem('name', user!.username);
    localStorage.setItem('password', user!.password);

      this.router.navigate(['/homepage']);
    }
  }

}
