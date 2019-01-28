import { createSelector } from 'reselect';

import { pathOr, pick, prop, propEq } from 'ramda';

const getNameProp = prop('Name');

function customerIdSelector(state) {
	return state.user.current.CustomerId;
}

function usersByIdSelector(state) {
	return state.settings.users.byId;
}

function usersIdsListSelector(state) {
	return state.settings.users.idsList;
}

export const activeUsersListSelector = createSelector(
	[usersByIdSelector, usersIdsListSelector, userTypesByIdSelector],
	(usersById, usersIdsList, userTypesById) =>
		usersIdsList
			.map(Id => usersById[Id])
			.filter(propEq('IsEnabled', true))
			.map(user => ({
				...pick(['Id', 'FirstName', 'LastName', 'Login', 'Email'], user),
				UserTypeName: getNameProp(userTypesById[user.UserType])
			}))
);

function userByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[usersByIdSelector, idSelector],
		(usersById, id) => id === 0
			? {
				Id: 0,
				IsEnabled: true,
				Dirty: true
			}
			: usersById[id]
	);
}

export function escapedUserSelectorFactory({ idSelector, escape }) {
	return createSelector(
		[userByIdSelectorFactory({ idSelector })],
		user => user && escape(user)
	);
}

function userTypesByIdSelector(state) {
	return state.settings.userTypes.byId;
}

function userTypesIdsListSelector(state) {
	return state.settings.userTypes.idsList;
}

export function selectableUserTypesListSelectorFactory({ Names }) {
	return createSelector(
		[userTypesByIdSelector, userTypesIdsListSelector],
		(userTypesById, userTypesIdsList) =>
			userTypesIdsList
				.map(Id => userTypesById[Id])
				.filter(({ Name }) => Names.includes(Name))
	);
}

export function userTypeByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[userTypesByIdSelector, idSelector],
		(userTypesById, id) => userTypesById[id]
	);
}

function userRightsByIdSelector(state) {
	return state.settings.userRights.byId;
}

export function userRightsByCodeSelectorFactory({ Codes }) {
	return createSelector(
		[userRightsByIdSelector],
		userRights => {
			const userRightsEntities = Object.values(userRights);

			return Codes.reduce(
				(previousMap, Code) => ({
					...previousMap,
					[Code]: userRightsEntities.find(
						propEq('Code', Code)
					)
				}),
				{}
			);
		}
	);
}

function userGroupsByIdSelector(state) {
	return state.settings.userGroups.byId;
}

function userGroupsIdsListSelector(state) {
	return state.settings.userGroups.idsList;
}

export const userGroupsSelector = createSelector(
	[userGroupsByIdSelector, userGroupsIdsListSelector],
	(userGroupsById, userGroupsIdsList) => userGroupsIdsList.map(Id => userGroupsById[Id])
);

export function userGroupByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[userGroupsByIdSelector, idSelector],
		(userGroupsById, id) => id === 0 ? { Id: 0 } : userGroupsById[id]
	);
}

function playersByIdSelector(state) {
	return state.settings.players.byId;
}

function playersListSelector(state) {
	return state.settings.players.idsList;
}

export const playersSelector = createSelector(
	[playersByIdSelector, playersListSelector],
	(playersById, playersIdsList) => playersIdsList.map(Id => playersById[Id])
);

function playerByIdSelectorFactory({ idSelector, sampleIdSelector }) {
	return createSelector(
		[playersByIdSelector, idSelector, sampleIdSelector],
		(playersById, id, sampleId) => id === 0
			? {
				Id: 0,
				IsEnabled: true,
				Dirty: true,
				...pick(['Channels', 'Description', 'Name', 'Tags'], playersById[sampleId] || {})
			}
			: playersById[id]
	);
}

export function escapedPlayerSelectorFactory({ idSelector, sampleIdSelector, escape }) {
	return createSelector(
		[playerByIdSelectorFactory({ idSelector, sampleIdSelector })],
		player => player && escape(player)
	);
}

function playlistGroupsByIdSelector(state) {
	return state.settings.playlistGroups.byId;
}

function playlistGroupsIdsListSelector(state) {
	return state.settings.playlistGroups.idsList;
}

export const playlistGroupsSelector = createSelector(
	[playlistGroupsByIdSelector, playlistGroupsIdsListSelector],
	(playlistGroupsById, playlistGroupsIdsList) => playlistGroupsIdsList.map(Id => playlistGroupsById[Id])
);

export function playlistGroupsByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[playlistGroupsByIdSelector, idSelector],
		(playlistGroupsById, Id) => Id === 0 ? { Id: 0 } : playlistGroupsById[Id]
	);
}

function categoriesByIdSelector(state) {
	return state.settings.categories.byId;
}

function categoriesIdsListSelector(state) {
	return state.settings.categories.idsList;
}

export function categoryByIdSelectorFactory({ idSelector, categoryTypeSelector }) {
	return createSelector(
		[categoriesByIdSelector, idSelector, categoryTypeSelector],
		(categoriesById, id, CategoryType) => id === 0 ? { Id: 0, CategoryType } : categoriesById[id]
	);
}

export function categoriesListSelectorFactory({ categoryTypeSelector  }) {
	return createSelector(
		[
			categoriesByIdSelector,
			categoriesIdsListSelector,
			categoryTypeSelector
		],
		(categoriesById, categoriesIdsList, categoryType) =>
			categoriesIdsList
				.map(Id => categoriesById[Id])
				.filter(propEq('CategoryType', categoryType))
	);
}

function tagTypesByIdSelector(state) {
	return state.settings.tagTypes.byId;
}

function tagTypesIdsListSelector(state) {
	return state.settings.tagTypes.idsList;
}

export const tagTypesSelector = createSelector(
	[tagTypesByIdSelector, tagTypesIdsListSelector],
	(tagTypesById, tagTypesIdsList) => tagTypesIdsList.map(Id => tagTypesById[Id])
);

export function tagTypeByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[tagTypesByIdSelector, idSelector, customerIdSelector],
		(tagTypesById, Id, CustomerId) => Id === 0 ? { Id: 0, Dirty: false, CustomerId } : tagTypesById[Id]
	);
}

function tagValuesByIdSelector(state) {
	return state.settings.tagValues.byId;
}

export function tagTypeValuesSelectorFactory({ tagTypeIdSelector }) {
	return createSelector(
		[tagValuesByIdSelector, tagTypesByIdSelector, tagTypeIdSelector],
		(tagValuesById, tagTypesById, tagTypeId) => pathOr([], [tagTypeId, 'Values'], tagTypesById).map(Id => tagValuesById[Id])
	);
}

export function tagValueByIdSelectorFactory({ idSelector, tagTypeIdSelector }) {
	return createSelector(
		[tagValuesByIdSelector, idSelector, tagTypeIdSelector],
		(tagValuesById, Id, TagTypeId) => Id === 0 ? { Id: 0, Dirty: false, TagTypeId } : tagValuesById[Id]
	);
}

export function generalSettingsSelector(state) {
	return state.settings.general.data;
}

function mobileUsersByIdSelector(state) {
	return state.settings.mobileUsers.byId;
}

function mobileUsersIdsListSelector(state) {
	return state.settings.mobileUsers.idsList;
}

export function mobileUsersListSelectorFactory({ allowedStatuses }) {
	return createSelector(
		[
			mobileUsersByIdSelector,
			mobileUsersIdsListSelector,
			mobileUserJobsByIdSelector,
			mobileUserDepartmentsByIdSelector,
			mobileUserCompaniesByIdSelector
		],
		(mobileUsersById, mobileUsersIdsList, mobileUserJobsById, mobileUserDepartmentsById, mobileUserCompaniesById) =>
			mobileUsersIdsList
				.map(Id => mobileUsersById[Id])
				.filter(({ StatusName }) => allowedStatuses.includes(StatusName))
				.map(
					({ Id, Name, Email, JobId, DepartmentId, CompanyId, StatusName }) => ({
						Id,
						Name,
						Email,
						Job: getNameProp(mobileUserJobsById[JobId]),
						Department: getNameProp(mobileUserDepartmentsById[DepartmentId]),
						Company: getNameProp(mobileUserCompaniesById[CompanyId]),
						Status: StatusName
					})
				)
	);
}

function mobileUserByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[mobileUsersByIdSelector, idSelector],
		(mobileUsersById, Id) => Id === 0 ? { Id: 0 } : mobileUsersById[Id]
	);
}

export function escapedMobileUserSelectorFactory({ idSelector, escape }) {
	return createSelector(
		[mobileUserByIdSelectorFactory({ idSelector })],
		mobileUser => mobileUser && escape(mobileUser)
	);
}

function mobileUserJobsByIdSelector(state) {
	return state.settings.mobileUserJobs.byId;
}

function mobileUserJobsIdsListSelector(state) {
	return state.settings.mobileUserJobs.idsList;
}

export const mobileUserJobsSelector = createSelector(
	[mobileUserJobsByIdSelector, mobileUserJobsIdsListSelector],
	(mobileUserJobsById, mobileUserJobsIdsList) => mobileUserJobsIdsList.map(Id => mobileUserJobsById[Id])
);

export function mobileUserJobByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[mobileUserJobsByIdSelector, idSelector],
		(mobileUserJobsById, Id) => Id === 0 ? { Id: 0, InUse: 0 } : mobileUserJobsById[Id]
	);
}

function mobileUserDepartmentsByIdSelector(state) {
	return state.settings.mobileUserDepartments.byId;
}

function mobileUserDepartmentsIdsListSelector(state) {
	return state.settings.mobileUserDepartments.idsList;
}

export const mobileUserDepartmentsSelector = createSelector(
	[mobileUserDepartmentsByIdSelector, mobileUserDepartmentsIdsListSelector],
	(mobileUserDepartmentsById, mobileUserDepartmentsIdsList) => mobileUserDepartmentsIdsList.map(Id => mobileUserDepartmentsById[Id])
);

export function mobileUserDepartmentByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[mobileUserDepartmentsByIdSelector, idSelector],
		(mobileUserDepartmentsById, Id) => Id === 0 ? { Id: 0, InUse: 0 } : mobileUserDepartmentsById[Id]
	);
}

function mobileUserCompaniesByIdSelector(state) {
	return state.settings.mobileUserCompanies.byId;
}

function mobileUserCompaniesIdsListSelector(state) {
	return state.settings.mobileUserCompanies.idsList;
}

export const mobileUserCompaniesSelector = createSelector(
	[mobileUserCompaniesByIdSelector, mobileUserCompaniesIdsListSelector],
	(mobileUserCompaniesById, mobileUserCompaniesIdsList) => mobileUserCompaniesIdsList.map(Id => mobileUserCompaniesById[Id])
);

export function mobileUserCompanyByIdSelectorFactory({ idSelector }) {
	return createSelector(
		[mobileUserCompaniesByIdSelector, idSelector],
		(mobileUserCompaniesById, Id) => Id === 0 ? { Id: 0, InUse: 0 } : mobileUserCompaniesById[Id]
	);
}
