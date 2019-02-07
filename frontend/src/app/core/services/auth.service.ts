import { of as observableOf, Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AppState } from '../../interfaces';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../auth/actions/auth.actions';
import { AuthService as OauthService } from 'ng2-ui-auth';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http/src/request';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user';
import { RatingCategory } from '../models/rating_category';


@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @param {HttpService} http
   * @param {AuthActions} actions
   * @param {Store<AppState>} store
   *
   * @memberof AuthService
   */
  constructor(
    private http: HttpClient,
    private actions: AuthActions,
    private store: Store<AppState>,
    private oAuthService: OauthService,
    private toastrService: ToastrService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  /**
   *
   *
   * @param {Authenticate} { email, password }
   * @returns {Observable<User>}
   * @memberof AuthService
   */

  login({ email, password }): Observable<User> {
    const params = { 'email': email, 'password': password };
    return this.http.post<{data: User}>('login', params).pipe (
      map(data => {
        console.log(data);
        this.setTokenInLocalStorage(data, 'user');
        this.store.dispatch(this.actions.getCurrentUserSuccess(JSON.parse(localStorage.getItem('user'))));
        this.store.dispatch(this.actions.loginSuccess())
        return data;
      }),
      tap(
        _ => this.router.navigate(['/']),
        error => this.toastrService.error(error.error.errors.detail, 'ERROR!')
      ),
      catchError(error => {
        return of(error);
      }) as any
    );
  }


  /**
   *
   *
   * @param {User} data
   * @returns {Observable<User>}
   *
   * @memberof AuthService
   */
  register(data: User): Observable<User> {
    const params = data;
    return this.http.post<{data: User}>('register', params).pipe(
      map(({data: user}) => {
        // console.log(user);
        return user;
      }),
      tap(
        _ => {
          this.toastrService.success('You are successfully registerd!', 'Success!!')
          this.router.navigate(['auth', 'login']);
        },
        _ => this.toastrService.error('Invalid/Existing data', 'ERROR!!')
      )
    );
  }

  /**
   *
   *
   * @param {anyUser} data
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  forgetPassword(data: User): Observable<any> {
    return this.http.post('auth/passwords', { spree_user: data }).pipe(
      map(_ =>
        this.toastrService.success(
          'Password reset link has be sent to your email.',
          'Success'
        )
      ),
      tap(
        _ => _,
        _ => this.toastrService.error('Not a valid email/user', 'ERROR!!')
      )
    );
  }

  /**
   *
   *
   * @param {User} data
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  updatePassword(data: User): Observable<void | ActiveToast<any>> {
    return this.http
      .put(`auth/passwords/${data.id}`, { spree_user: data })
      .pipe(
        map(_ =>
          this.toastrService.success(
            'Password updated success fully!',
            'Success'
          )
        ),
        tap(
          _ => _,
          _ => this.toastrService.error('Unable to update password', 'ERROR!')
        )
      );
  }

  /**
   *
   *
   * @returns {Observable<any>}
   *
   * @memberof AuthService
   */
  authorized(): Observable<any> {
    return observableOf(this.getUserToken() != null);
  }

  /**
   *
   *
   * @returns
   *
   * @memberof AuthService
   */
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.store.dispatch(this.actions.logoutSuccess());
    return;
  }

  /**
   *
   *
   * @returns {{}}
   * @memberof AuthService
   */
  getTokenHeader(request: HttpRequest<any>): HttpHeaders {
    if (this.getUserToken()) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getUserToken()}`,
        'Accept': '*/*'
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      });
    }

  }

  /**
   *
   *
   * @private
   * @param {any} user_data
   *
   * @memberof AuthService
   */
  private setTokenInLocalStorage(user_data: any, keyName: string): void {
    const jsonData = JSON.stringify(user_data);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(keyName, jsonData);
    }
  }


  getUserToken() {
    if (isPlatformBrowser(this.platformId)) {
      const user: User = JSON.parse(localStorage.getItem('user'))
      return user ? user.token : null
    } else {
      return null;
    }
  }

  getRatingCategories(): Observable<Array<RatingCategory>> {
    return this.http.get<{data: Array<RatingCategory>}>(`api/v1/ratings/`).pipe(map(resp => resp.data));
  }
}
