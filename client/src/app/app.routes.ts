import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'verify-otp', component: VerifyotpComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: '**', component: PageNotFoundComponent } 
];
