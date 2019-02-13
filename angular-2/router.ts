import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {
  Main,
  Auth,
  Personal,
  Friends,
  AllFriends,
  AllHistory,
  Profile,
  EditProfile,
  CompleteProfile,
  Wallet,
  Join,
  Dashboard,
  Total,
  History,
  Ranking,
  Stats,
  GameResult,
  Creating,
  CreatingBet,
  CreatingPallbet,
  CreatingPublicPallbet,
  CreatingFunPallbet,
  ActivateAccountByInvitation,
  ForgotPassword,
  ResetPassword,
  UpdatePassword,
  Palbets,
  Sportsbet,
  Funbets,
  PublicBets,
  JoinToPalbet,
  AllPalbets,
  NewPalbets,
  MyPalbets,
  NewBet,
  NewFunBet,
  EditFunBet,
  EditBet,
  Sportbook
} from './containers';
import { AuthService } from './services';

export const routes : ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: Main,
    canActivate: [
      AuthService
    ],
    children: [
      {
        path: '',
        component: Dashboard,
        children: [
          {
            path: '',
            component: Join,
          },
          {
            path: 'sportbook',
            component: Sportbook,
          },
          {
            path: 'creating',
            component: Creating
          }
        ],
      },
      {
        path: '',
        component: Personal,
        children: [
          {
            path: 'friends',
            component: Friends,
          },
          {
            path: 'profile',
            component: Profile,
          },
          {
            path: 'profile/update_password',
            component: UpdatePassword,
          },
          {
            path: 'wallet',
            component: Wallet,
          }
        ]
      },
      {
        path: 'all_friends',
        component: AllFriends,
      },
      {
        path: 'edit_profile',
        component: EditProfile,
      },
      {
        path: '',
        component: Sportsbet,
        children: [
          {
            path: 'creating_bet',
            component: CreatingBet,
          },
          {
            path: 'creating_pallbet',
            component: CreatingPallbet,
          },
          {
            path: 'creating_public_pallbet',
            component: CreatingPublicPallbet,
          }
        ]
      },
      {
        path: '',
        component: Funbets,
        children: [
          {
            path: 'creating_fun_pallbet',
            component: CreatingFunPallbet,
          }
        ]
      },
      {
        path: '',
        component: Total,
        children: [
          {
            path: 'history',
            component: History,
          },
          {
            path: 'ranking',
            component: Ranking,
          },
          {
            path: 'stats',
            component: Stats,
          }
        ]
      },
      {
        path: '',
        component: Palbets,
        children: [
          {
            path: 'palbets/all',
            component: AllPalbets
          },
          {
            path: 'palbets/new',
            component: NewPalbets,
          },
          {
            path: 'palbets/my',
            component: MyPalbets,
          }
        ]
      },
      {
        path: 'new_bet',
        component: NewBet
      },
      {
        path: 'new_funbet',
        component: NewFunBet
      },
      {
        path: 'edit_funbet',
        component: EditFunBet
      },
      {
        path: 'edit_bet',
        component: EditBet
      },
      {
        path: 'public_bets',
        component: PublicBets
      },
      {
        path: 'public_bets/join/:id',
        component: JoinToPalbet
      },
      {
        path: 'history/game_result/:id',
        component: GameResult,
      },
      {
        path: 'all_history/:type',
        component: AllHistory,
      },
    ]
  },
  {
    path: 'auth',
    component: Auth
  },
  {
    path: 'activate',
    component: CompleteProfile
  },
  {
    path: 'invitation',
    component: ActivateAccountByInvitation
  },
  {
    path: 'forgot_password',
    component: ForgotPassword
  },
  {
    path: 'reset_password',
    component: ResetPassword
  },
  {
    path: '**',
    redirectTo: ''
  }
]);