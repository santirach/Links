import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserInterface } from 'src/app/core/interface/user/user.interface';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  group: FormGroup | any;
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
      nombre: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
    });
  }

  handleClickRegister(event: any) {
    const { request } = event
    if (request && this.send) {
      const user: UserInterface = this.group.value;
      this.authService.register(user);
    }
  }

  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }

}
