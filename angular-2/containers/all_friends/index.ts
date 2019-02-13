/**
 * Created by ivan on 19.12.16.
 */
import {Component, OnDestroy} from '@angular/core';
import { FriendsService } from '../../services';

@Component({
  selector: 'all-friends-container',
  templateUrl: './all_friends.html'
})
export class AllFriends implements OnDestroy {
  limitCount: number = 20;
  friends;

  constructor(
    private friendsService: FriendsService
  ) {
    this.getFriends();
  }

  getFriends(options?) {
    this.friendsService.getFriends(options)
      .subscribe(
        response => {
          this.friends = response.results;
        }
      )
  }

  searchHandler(searchResult: string) {
    if (Boolean(searchResult)) {
      this.getFriends({limit: this.limitCount, search: searchResult});
    } else {
      this.getFriends({limit: this.limitCount});
    }
  }

  ngOnDestroy() {}
}
