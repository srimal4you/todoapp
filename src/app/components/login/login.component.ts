import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  private model: any = {};
  private error : string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  authUser() :void {
    this.authService.authenticateUser(this.model)
      .subscribe(result => {
        if(result === true ){
          this.router.navigate(['/dashboard']);
        }
        else{
          this.error = 'Username or password is incorrect';
        }
      })
  }

}
