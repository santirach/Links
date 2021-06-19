import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { UserInterface } from '../interface/user/user.interface';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLogged = false;
    constructor(
        private readonly httpClient: HttpClient,
        private readonly storage: StorageService,
        private readonly router: Router
    ) { }

    login(user: UserInterface) {
        this.httpClient
            .post(`https://private-anon-a61d72ecb8-henrybravo.apiary-mock.com/login`, {
                "email": user.correo,
                "password": user.contrasena
            })
            .pipe(take(1))
            .subscribe(
                (data: any) => {
                    this.isLogged = true;
                    this.storage.save('accessToken', data.token);
                },
                () => {
                    this.storage.save('accessToken', {
                        "token": "213123adsdsa21123ww"
                    });
                },
                () => {
                    this.router.navigate(['dashboard/home']);
                });
    }

    register(user: UserInterface) {
        this.httpClient
            .post(`${environment.pathAPI}/register`, {
                "email": user.correo,
                "password": user.contrasena,
                "nombre": user.nombre
            })
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigate(['auth/login']);
            });
    }

    logout() {
        this.isLogged = false;
        this.storage.clear();
        this.router.navigate(['/auth']);
    }

    get userIsLogged(): boolean {
        const accessToken = this.storage.get('accessToken');
        return this.isLogged || !!accessToken;
    }


}
