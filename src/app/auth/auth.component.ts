import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserServiceService } from '../main-page/user-service.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: 'auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  //users : any = null;
  constructor(private authService: AuthService, private router: Router, private UserServiceService: UserServiceService) {}
  
  onSubmit() {
    if (this.emailFormControl.valid) {
      const email = this.emailFormControl.value;
      if (email !== null) {
        this.authService.checkEmail(email).subscribe(
          (users: any) => {
            if (users.length > 0) {
              const user = users[0]; // это реально нужно
              this.authService.getUserModules(user.id).subscribe(
                (fullUser) => { 
                  this.UserServiceService.setUser(fullUser); 
                  this.router.navigate(['/']);
                  console.log(fullUser);
                   //this.UserServiceService.setUser(user);
                },
              )
             
            } else {
              console.log('Email not found');
            }
          },
          (error: any) => {
            console.error('Error checking email:', error);
          }
        );
      } else {
        console.error('Email value is null');
      }
    }
  }

// onSubmit() {
//   if (this.emailFormControl.valid) {
//     this.router.navigate(['/MainPage']);
//   }
// }
}
