import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../services/authentication.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gifts-client-portal-pages-wishlist-settings-login-form',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);

  public readonly authenticationService: AuthenticationService = inject(
    AuthenticationService
  );

  public passwordCtrl = new FormControl('', Validators.required);

  public login(): void {
    if (this.passwordCtrl.invalid) {
      return;
    }
    this.authenticationService
      .login(
        this._route.snapshot.params['wishlist'],
        this.passwordCtrl.value as string
      )
      .subscribe();
  }
}
