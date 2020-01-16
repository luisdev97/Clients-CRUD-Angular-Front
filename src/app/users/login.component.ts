import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title: string = "Please, Sign in";
  user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
   }

  ngOnInit() {

  }

  login(): void {

    if(this.user.username == null || this.user.password == null){
      Swal.fire('Login Error', 'Username or password are empty!', 'error');
    }else{
      this.authService.login(this.user).subscribe(res => {
        const payload = JSON.parse(atob(res.access_token.split(".")[1]));
        console.log(payload);
        this.router.navigate(['/clients']);
        Swal.fire('Successful Authentication', `Welcome ${payload.name}`, 'success');
      })
    }
    
  }

}
