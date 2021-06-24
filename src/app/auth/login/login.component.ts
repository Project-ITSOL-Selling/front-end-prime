import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {TokenService} from '../../@core/services/_service/auth/token.service';
import {AuthService} from '../../@core/services/_service/auth/auth.service';
import {FormProviderRequest} from '../../@core/utils/form-provider-req';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser;
  userLogged: SocialUser;
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: SocialAuthService,
    private service: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.disables('none');
    this.initForm();
  }

  disables(display: string) {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = display;
    }
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      const form = new FormProviderRequest();
      form.token = this.socialUser.idToken;
      this.spinner.show();
      this.service.google(form).subscribe(
        res => {
          this.spinner.hide();
          this.tokenService.setToken(res.data.jwt);
          this.router.navigate(['']);
        },
      );
    }).catch(
      err => {
        this.spinner.hide();
        this.toastr.error(err);
      },
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.socialUser = res;
      // console.log(res);
      // const tokenFacebook = new TokenDto(this.socialUser.authToken);
      // this.oauthService.facebook(tokenFacebook).subscribe(
      //   data=>{
      //     this.tokenService.setToken(data.data.value);
      //     console.log(data);
      //     this.isLogged = true;
      //   }
      // )
    }).catch(
      err => {
        // console.log(err);
      },
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.spinner.show();
      this.service.login(this.form.value).subscribe(res => {
        if (res.code === 'success') {
          // console.log(res);
          this.spinner.hide();
          this.tokenService.setToken(res.data);
          this.router.navigate(['']);
        } else {
          this.toastr.error(res.message);
          this.spinner.hide();
        }
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
