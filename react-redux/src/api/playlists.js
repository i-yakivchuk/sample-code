/**
 * Created by nazarco on 11.03.17.
 */
import Api from './api';
const path = '/PlayList';

export function contentGroups() {
  return Api.get(`${path}/GetDefaultCustomerData`, {credentials: "sso"});
}

export function playlists(params) {
  return Api.get(`${path}/GetPlayList?customerId=${params.customerId}`, {credentials: "sso"});
}

export function savePlaylist(params) {
  return Api.post(`${path}/SavePlaylist?customerId=${params.customerId}`, {...params.playlist}, {credentials: "sso"});
}

export function savePlaylistList(params) {
  return Api.post(`${path}/SaveArrayPlaylist?customerId=${params.customerId}`, params.playlists, {credentials: "sso"});
}

export function deletePlaylist(params) {
  return Api.delete(`${path}/DeletePlaylist?playListId=${params.playListId}`, {credentials: "sso"});
}

export function channels(params) {
  return Api.get(`${path}/GetChannels?customerId=${params.customerId}`, {credentials: "sso"});
}

export function activePlaylist(params) {
  return Api.post(`${path}/ActivePlaylist1?customerId=${params.customerId}`, {}, {credentials: "sso"});
}

export function saveActivePlaylist(params) {
  return Api.post(`${path}/SaveActivePlaylist?playListId=${params.playListId}`, {}, {credentials: "sso"});
}