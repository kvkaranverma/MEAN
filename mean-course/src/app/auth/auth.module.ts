import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ], 
    imports: [
        CommonModule,
        FormsModule,
        AngularMaterialModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}