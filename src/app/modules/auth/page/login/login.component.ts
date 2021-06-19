import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from 'src/app/core/interface/user/user.interface';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  group: FormGroup | any;
  subscription: Subscription = new Subscription;
  send: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.send = false
    this.setForm();
    this.group.valueChanges.pipe(debounceTime(300)).subscribe(
      () => {
        for (let key in this.group.controls) {
          const control = this.group.get(key);
          if (control) {
            if (control.value == null || control.value == "") {
              this.send = false
              return;
            }
            this.send = true
          }
        }
      }
    );
  }

  setForm() {
    this.group = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
    });
  }

  handleClickLogin(event: any) {
    const { request } = event
    if (request && this.send) {
      const user: UserInterface = this.group.value;
      this.authService.login(user);
    }
  }

  redirectToRegister() {
    this.router.navigate(['auth/register']);
  }

}
