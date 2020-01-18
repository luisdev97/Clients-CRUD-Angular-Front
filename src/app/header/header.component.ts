import { Component } from '@angular/core';
import { AuthService } from '../users/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'Header',
    templateUrl: './header.component.html',
})

export class HeaderComponent {
    title: string = 'Angular Spring';

    constructor(private authService: AuthService, private router: Router){

    }

    logout(): void {
        this.authService.logout();
        Swal.fire("Logout", 'Session closed successfully', 'info');
        this.router.navigate(['/login']);
    }
    
} 