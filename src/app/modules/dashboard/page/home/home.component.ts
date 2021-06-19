import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlInterface, UrlResponseInterface } from 'src/app/core/interface/url/url.interface';
import { AuthService } from 'src/app/core/service/auth.service';
import { UrlService } from 'src/app/core/service/url.service';
import { UserService } from 'src/app/core/service/user.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  group: FormGroup | any;
  urls: UrlResponseInterface[] = [];
  profileUser: UrlInterface | any;
  send: boolean = false;
  constructor(
    private readonly urlService: UrlService,
    public readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
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
    this.getUrls()
    this.getInformationProfile('1')
  }

  setForm() {
    this.group = new FormGroup({
      url: new FormControl(null, [Validators.required]),
      name: new FormControl(null, Validators.required),
    });
  }

  handleClickRegisterUrl(event: any) {
    const { request } = event
    if (request && this.send) {
      const url: UrlInterface = this.group.value
      this.urlService.saveUrl(url).subscribe(() => {
        this.getUrls()
      });
    }
  }

  getUrls() {
    this.urlService.getUrl().subscribe(data => {
      this.urls = data
    })
  }

  deleteUrl(id: string) {
    this.urlService.deleteUrl(id).subscribe(() => {
      this.getUrls()
    })
  }

  getInformationProfile(id: string) {
    this.userService.getUser(id).subscribe((data: UrlInterface) => {
      this.profileUser = data
    })
  }

}
