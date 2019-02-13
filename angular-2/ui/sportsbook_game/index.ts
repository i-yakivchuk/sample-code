/**
 * Created by ivan on 14.02.17.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {StoreHelper} from "../../services";

@Component({
  selector: 'sportsbook-game',
  templateUrl: './sportsbook_game.html',
  styles: [`div.item.active {background: lightgray}`]
})
export class SportsbookGame {
  constructor(
    private router: Router,
    private storeHelper: StoreHelper
  ) {}
  @Input() sport;
  @Input() editable: boolean;
  @Output() chooseToBet = new EventEmitter();
  @Output() getStakeTeam = new EventEmitter();
  homeTeam = 'home_team';
  awayTeam = 'away_team';
  drawLine = 'draw_line';
  typeStakeList = {
    [this.homeTeam]: '1',
    [this.awayTeam]: '2',
    [this.drawLine]: '0'
  };
  activeStake: any;
  isActiveGame: boolean = false;
  
  isActive(typeKey) {
    return this.typeStakeList[typeKey] === this.activeStake;
  }
  
  chooseGameStake(sport, typeKey, coef) {
    this.activeStake = this.editable ? this.typeStakeList[typeKey] : '';
    let game = Object.assign({}, sport, {team_name: sport[typeKey], coef});
    this.getStakeTeam.emit(game);
  }
  
  removeGame(id: number): void {
    this.storeHelper.findAndDelete('sportsbookGames', id);
  }
  
  chooseGame(event, sport) {
    this.chooseToBet.emit({sport, isDeleted: this.isActiveGame});
    this.isActiveGame = this.editable ? this.isActiveGame : !this.isActiveGame;
  }
}
