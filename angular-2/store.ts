import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';


export interface User {
    id: string | number,
    email: string,
    fullname: string | null,
    photo: string | null,
    country: Country | string | null,
    city: string,
    birthday: number | string | null,
    age: number | null,
    is_friend: string | boolean
}

let user = {
  id: '',
  email: '',
  fullname: '',
  photo: '',
  country: {id: '', text: ''},
  city: '',
  birthday: '',
  age: 0,
  is_friend: false
};

export const defaultFunbet: Funbet = {
  id: '',
  stakes: [],
  participants: [],
  name: '',
  start_date: (new Date()).toISOString(),
  finish_date: (new Date()).toISOString(),
  condition: '',
  author_determines: true,
  rules: '',
  can_edit: true,
  can_join_user: true,
  from_srore: true
};

export interface Stake {
  type: string,
  name?: string,
  count: number,
  bet?: number
}

export interface Funbet {
  id?: string | number,
  stakes?: Stake[],
  participants: Object[],
  name?: string,
  finish_date: string,
  start_date: string,
  condition: string,
  author_determines: boolean,
  rules?: string,
  can_edit?: boolean,
  can_join_user?: boolean,
  from_srore?: boolean
}

export interface Country {
  id?: string,
  text?: string
}

export interface Game {
  away_team: string,
  home_team: string,
  id: number,
  is_multi_teams: boolean,
  league: string,
  odds: Object[],
  sport: string,
  sport_name: string,
  time: string,
  coef?: number,
  team?: string
}

export const defaultBetStakeMoney = {
  realMoney: {
    type: 'money',
    count: null
  },
  palcoins: {
    type: 'coins',
    count: null
  }
};

export const defaultCreateBetUrl = {
  url: 'creating_bet'
};

export interface State {
  user: User,
  friends: User[],
  stakes: Stake[],
  defaultStakes: Stake[],
  countries: Country[],
  pallbets: Funbet[],
  betFriends: User[],
  chosenBetFriends: User[],
  defaultBetFriends: User[],
  funbet: Funbet,
  newfunbet: {},
  palbet: {},
  sportsbookGames: Game[],
  betStakeMoney: Object,
  createBetUrl: Object,
  inviteCounter: {}
}

const defaultState: State = {
  user: user,
  friends: [],
  stakes: [],
  defaultStakes: [],
  countries: [],
  pallbets: [],
  betFriends: [],
  chosenBetFriends: [],
  defaultBetFriends: [],
  funbet: defaultFunbet,
  newfunbet: {},
  palbet: {},
  sportsbookGames: [],
  betStakeMoney: defaultBetStakeMoney,
  createBetUrl: defaultCreateBetUrl,
  inviteCounter: {}
};

const _store = new BehaviorSubject<State>(defaultState);
 
@Injectable()
export class Store {
  private store = _store;
  changes = this.store.asObservable()
    .distinctUntilChanged();
  
  setState(state: State) {
    this.store.next(state);
  }
  
  getState(): State {
    return this.store.value;
  }
  
  purge() {
    this.store.next(defaultState);
  }
  
}