import { User } from './../../core/models/user';
import { filter, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { Observable } from 'rxjs';
import { CheckoutActions } from '../../checkout/actions/checkout.actions';
import { RatingCategory } from '../../core/models/rating_category';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  Authorized$ = this.actions$
    .pipe(
      ofType(AuthActions.AUTHORIZE),
      switchMap(() => this.authService.authorized()),
      filter(data => data == true),
      map(() => this.authActions.loginSuccess())
    );


  @Effect()
  AfterLogoutSuccess$: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActions.LOGOUT_SUCCESS),
      map(_ => this.checkoutActions.orderCompleteSuccess())
    );

  // ToDo
  // Needs to move in seprate effects.
  @Effect()
  GetRatingCategories$ = this.actions$
    .pipe(
      ofType(AuthActions.GET_RATING_CATEGEORY),
      switchMap<Action, Array<RatingCategory>>(_ => {
        return this.authService.getRatingCategories();
      }),
      map(ratingCategory => this.authActions.getRatingCategoriesSuccess(ratingCategory))
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authActions: AuthActions,
    private checkoutActions: CheckoutActions
  ) { }
}
