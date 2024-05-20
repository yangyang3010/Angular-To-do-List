import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/userservice";
import {User} from "../../core/dtos/user";
import {ResponseDto} from "../../core/dtos/response";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usernameValue = "";
  passwordValue = "";
  confirmpasswordValue = "";
  constructor(private router: Router, private userService: UserService) {
  }

  goToLogin() {
    this.router.navigate([''])
  }

  checkRegister() {
      if (this.usernameValue === "")
        alert("username khong de trong");
      else if (this.passwordValue === "")
        alert("password khong de trong");
      else if (this.confirmpasswordValue === "" || this.confirmpasswordValue !== this.passwordValue) {
        alert("password khong dung");
      }
      else {
        let user = new User();
        user.username = this.usernameValue;
        user.password = this.passwordValue;
        this.userService.addUser(user).subscribe(
          res => {
            // Handle the response
            this.checkRegisterComplete(res);
            console.log(res);
          },
          error => {
            // Handle error
            console.error('Error:', error);
          }
        );

      }
  }

  checkRegisterComplete(res:ResponseDto<User>) {
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
      alert("user nay da ton tai");
    }
    else {
        localStorage.setItem('user_id', user!.id);
        localStorage.setItem('name', user!.username);
        localStorage.setItem('password', user!.password);
      this.router.navigate(['/homepage']);
    }
  }
}
