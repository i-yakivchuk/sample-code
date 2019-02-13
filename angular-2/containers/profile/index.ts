/**
 * Created by ivan on 15.12.16.
 */
import { Component } from '@angular/core';
import { Store } from '../../store';
import 'rxjs/Rx';
import { AuthService, BroadcastService } from '../../services';
import { Router } from "@angular/router";

@Component({
  selector: 'profile-container',
  templateUrl: './profile.html'
})
export class Profile {
  JWT: string = 'auth_token';
  user: {};
  constructor(
    private store: Store,
    private auth: AuthService,
    private router: Router,
    private broadcastService: BroadcastService
  ) {
    this.store.changes
      .map(data => data.user)
      .subscribe(user => {
        this.user = user;
      });

    this.broadcastService.broadcast('resetCounter');
  }
  
  logout() {
    this.auth.signout().subscribe(() => {
      this.router.navigate(['auth']);
    });
  }
}
