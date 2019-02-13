/**
 * Created by ivan on 15.12.16.
 */
import {Component} from '@angular/core';
import {SportsbookService, StoreHelper, BroadcastService} from '../../services';
import {Router} from "@angular/router";
import {defaultBetStakeMoney, Store} from '../../store';
import {NO_CHOSEN_GAME} from "../../config";

@Component({
  selector: 'sportbook-container',
  templateUrl: './sportbook.html'
})
export class Sportbook {
  defaultSportsbook;
  sportsbookResult;
  filterTimeout;
  proceedGamesCount: number = 0;
  tabUrl;
  
  constructor(
    private store: Store,
    private sportsbookService: SportsbookService,
    private router: Router,
    private storeHelper: StoreHelper,
    private broadcastService: BroadcastService
  ) {
    this.getSportsbook({limit: 20})
    this.broadcastService.broadcast('resetCounter');
  }
  
  getSportsbook(options) {
    this.sportsbookService.getSportsbook(options)
      .subscribe(
        response => {
          this.defaultSportsbook = response.results;
        },
        error => {
          this.defaultSportsbook = [];
        }
      )
  }
  
  searchHandler(searchResult: string) {
    if (this.filterTimeout) clearTimeout(this.filterTimeout);

    this.filterTimeout = setTimeout(() => {
      if (Boolean(searchResult)) {
        this.getSportsbook({search: searchResult, limit: 20});
      } else {
        this.getSportsbook({limit: 20});
      }
    }, 1000);
  }

  chooseToBet({sport, isDeleted}) {
    if (this.proceedGamesCount == 0) {
      this.storeHelper.update('betStakeMoney', defaultBetStakeMoney);
      this.storeHelper.update('sportsbookGames', []);
      this.storeHelper.update('betFriends', []);
    }

    const sportsbookGames = 'sportsbookGames';
    isDeleted ?
      this.storeHelper.findAndDelete(sportsbookGames, sport.id) :
      this.storeHelper.add(sportsbookGames, sport);
    this.proceedGamesCount = this.storeHelper.getLength(sportsbookGames);
  }

  goToSingleBet() {
    if (this.proceedGamesCount == 0) {
      this.broadcastService.broadcast('error', NO_CHOSEN_GAME);
      return false;
    }

    this.tabUrl = this.store.getState().createBetUrl;
    switch (this.tabUrl.url) {
      case 'creating_pallbet':
        this.router.navigate(['creating_pallbet']);
        break;
      case 'creating_public_pallbet':
        this.router.navigate(['creating_public_pallbet']);
        break;
      default: {
        this.router.navigate(['creating_bet']);
      }
    }
  }
}
