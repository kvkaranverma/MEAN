import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { format } from 'path';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
 
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

 
  onSignup(signupForm: NgForm) {
    if(signupForm.invalid) {
      return
    }
    this.authService.createUser(signupForm.value.email, signupForm.value.password);
  }

}
