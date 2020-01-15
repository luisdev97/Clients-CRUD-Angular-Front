import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title: string = "Please, Sign in";
  user: User;

  constructor() {
    this.user = new User();
   }

  ngOnInit() {

  }

  login(): void {
    console.log(this.user);
    if(this.user.username == null || this.user.password == null){
      Swal.fire('Login Error', 'Username or password are empty!', 'error');
    
    }
  }

}
