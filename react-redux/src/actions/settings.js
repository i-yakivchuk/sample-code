import { error as errorNotification } from 'react-notification-system-redux';

import { path } from 'ramda';

import {
	GET_USERS,
	GET_USERS_SUCCESS,
	GET_USERS_ERROR,
	SAVE_USER_SUCCESS,
	DELETE_USER_SUCCESS,
	GET_USER_TYPES,
	GET_USER_TYPES_SUCCESS,
	GET_USER_TYPES_ERROR,
	GET_USER_RIGHTS,
	GET_USER_RIGHTS_SUCCESS,
	GET_USER_RIGHTS_ERROR,
	GET_USER_GROUPS,
	GET_USER_GROUPS_SUCCESS,
	GET_USER_GROUPS_ERROR,
	SAVE_USER_GROUP_SUCCESS,
	DELETE_USER_GROUP_SUCCESS,
	GET_GROUP_FOR_USER_SUCCESS,
	GET_PLAYERS,
	GET_PLAYERS_SUCCESS,
	GET_PLAYERS_ERROR,
	SAVE_PLAYER_SUCCESS,
	DELETE_PLAYER_SUCCESS,
	GET_PLAYLIST_GROUPS,
	GET_PLAYLIST_GROUPS_SUCCESS,
	GET_PLAYLIST_GROUPS_ERROR,
	SAVE_PLAYLIST_GROUP_SUCCESS,
	DELETE_PLAYLIST_GROUP_SUCCESS,
	GET_SETTINGS_CATEGORIES,
	GET_SETTINGS_CATEGORIES_SUCCESS,
	GET_SETTINGS_CATEGORIES_ERROR,
	SAVE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_SUCCESS,
	GET_PLAYER_TAG_TYPES,
	GET_PLAYER_TAG_TYPES_SUCCESS,
	GET_PLAYER_TAG_TYPES_ERROR,
	SAVE_PLAYER_TAG_TYPE_SUCCESS,
	DELETE_PLAYER_TAG_TYPE_SUCCESS,
	GET_PLAYER_TAG_VALUES_SUCCESS,
	SAVE_PLAYER_TAG_VALUE_SUCCESS,
	DELETE_PLAYER_TAG_VALUE_SUCCESS,
	GET_GENERAL_SETTINGS,
	GET_GENERAL_SETTINGS_SUCCESS,
	GET_GENERAL_SETTINGS_ERROR,
	SAVE_GENERAL_SETTINGS_SUCCESS,
	GET_MOBILE_USERS,
	GET_MOBILE_USERS_SUCCESS,
	GET_MOBILE_USERS_ERROR,
	SAVE_MOBILE_USER_SUCCESS,
	DELETE_MOBILE_USER_SUCCESS,
	GET_MOBILE_USER_JOBS,
	GET_MOBILE_USER_JOBS_SUCCESS,
	GET_MOBILE_USER_JOBS_ERROR,
	SAVE_MOBILE_USER_JOB_SUCCESS,
	DELETE_MOBILE_USER_JOB_SUCCESS,
	RETAG_MOBILE_USER_JOB_SUCCESS,
	GET_MOBILE_USER_DEPARTMENTS,
	GET_MOBILE_USER_DEPARTMENTS_SUCCESS,
	GET_MOBILE_USER_DEPARTMENTS_ERROR,
	SAVE_MOBILE_USER_DEPARTMENT_SUCCESS,
	DELETE_MOBILE_USER_DEPARTMENT_SUCCESS,
	RETAG_MOBILE_USER_DEPARTMENT_SUCCESS,
	GET_MOBILE_USER_COMPANIES,
	GET_MOBILE_USER_COMPANIES_SUCCESS,
	GET_MOBILE_USER_COMPANIES_ERROR,
	SAVE_MOBILE_USER_COMPANY_SUCCESS,
	DELETE_MOBILE_USER_COMPANY_SUCCESS,
	RETAG_MOBILE_USER_COMPANY_SUCCESS,
    GET_GENERAL_SETTIGNS
} from '../constants/actions';

import { SERVER_ERROR } from '../constants/errors';

import {
	getUsers as apiGetUsers,
	saveUser as apiSaveUser,
	deleteUser as apiDeleteUser,
	getUserById as apiGetUserById,
	getUserTypes as apiGetUserTypes,
	getUserRights as apiGetUserRights,
	getUserGroups as apiGetUserGroups,
	saveUserGroup as apiSaveUserGroup,
	deleteUserGroup as apiDeleteUserGroup,
	getGroupForUser as apiGetGroupForUser,
	saveGroupForUser as apiSaveGroupForUser,
	getPlayers as apiGetPlayers,
	savePlayer as apiSavePlayer,
	deletePlayer as apiDeletePlayer,
	activatePlayer as apiActivatePlayer,
	getPlaylistGroups as apiGetPlaylistGroups,
	savePlaylistGroup as apiSavePlaylistGroup,
	deletePlaylistGroup as apiDeletePlaylistGroup,
	getCategories as apiGetCategories,
	saveCategory as apiSaveCategory,
	deleteCategory as apiDeleteCategory,
	getTagTypes as apiGetTagTypes,
	saveTagType as apiSaveTagType,
	deleteTagType as apiDeleteTagType,
	getTagValues as apiGetTagValues,
	saveTagValue as apiSaveTagValue,
	deleteTagValue as apiDeleteTagValue,
	getCustomerInfo as apiGetCustomerInfo,
	savePublicationFrequency as apiSavePublicationFrequency,
	getMobileUsers as apiGetMobileUsers,
	saveMobileUser as apiSaveMobileUser,
	deleteMobileUser as apiDeleteMobileUser,
	checkEmail as apiCheckEmail,
	getMobileUserJobs as apiGetMobileUserJobs,
	saveMobileUserJob as apiSaveMobileUserJob,
	deleteMobileUserJob as apiDeleteMobileUserJob,
	retagMobileUserJob as apiRetagMobileUserJob,
	getMobileUserDepartments as apiGetMobileUserDepartments,
	saveMobileUserDepartment as apiSaveMobileUserDepartment,
	deleteMobileUserDepartment as apiDeleteMobileUserDepartment,
	retagMobileUserDepartment as apiRetagMobileUserDepartment,
	getMobileUserCompanies as apiGetMobileUserCompanies,
	saveMobileUserCompany as apiSaveMobileUserCompany,
	deleteMobileUserCompany as apiDeleteMobileUserCompany,
	retagMobileUserCompany as apiRetagMobileUserCompany
} from '../api/settings';

function createErrorNotificationAction(error) {
	const responseData = path(['response', 'data'], error);

	return errorNotification({
		title: SERVER_ERROR,
		message: !responseData ? SERVER_ERROR : typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
		position: 'tc',
		autoDismiss: 3
	});
}

export function getUsers() {
	return async (dispatch, getState) => {
		dispatch({ type: GET_USERS });

		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data } = await apiGetUsers({ customerId: CustomerId });
			dispatch({ type: GET_USERS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_USERS_ERROR });
		}
	};
}

export function saveUser({
	Compositions,
	CustomerId,
	Dirty,
	Email,
	FirstName,
	Id,
	IsEnabled,
	LastName,
	Login,
	MessageCategories,
	Password,
	PasswordChangedOn,
	Rights,
	SSO,
	Tags,
	Title,
	UserGroup,
	UserRights,
	UserType
}) {
	return async (dispatch, getState) => {
		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data: { Id: savedUserId } } = await apiSaveUser({
				data: {
					Compositions,
					CustomerId,
					Dirty,
					Email,
					FirstName,
					Id,
					IsEnabled,
					LastName,
					Login,
					MessageCategories,
					Password,
					PasswordChangedOn,
					Rights,
					SSO,
					Tags,
					Title,
					UserRights,
					UserType
				},
				customerId: CustomerId
			});

			await Promise.all([
				apiGetUserById({ userId: savedUserId })
					.then(
						({ data }) => {
							dispatch({ type: SAVE_USER_SUCCESS, payload: data });
						}
					),
				apiSaveGroupForUser({ userId: savedUserId, groupId: UserGroup })
					.then(() => {
						dispatch({ type: GET_GROUP_FOR_USER_SUCCESS, userId: savedUserId, payload: UserGroup });
					})
			]);

			return savedUserId;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteUser({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteUser({ Id });
			dispatch({ type: DELETE_USER_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function getUserTypes() {
	return async dispatch => {
		dispatch({ type: GET_USER_TYPES });

		try {
			const { data } = await apiGetUserTypes();
			dispatch({ type: GET_USER_TYPES_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_USER_TYPES_ERROR });
		}
	};
}

export function getUserRights() {
	return async dispatch => {
		dispatch({ type: GET_USER_RIGHTS });

		try {
			const { data } = await apiGetUserRights();
			dispatch({ type: GET_USER_RIGHTS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_USER_RIGHTS_ERROR });
		}
	};
}

export function getUserGroups({ withUserCount = true } = {}) {
	return async dispatch => {
		dispatch({ type: GET_USER_GROUPS });

		try {
			const { data } = await apiGetUserGroups({ withUserCount });
			dispatch({ type: GET_USER_GROUPS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_USER_GROUPS_ERROR });
		}
	};
}

export function saveUserGroup({ Id, Name }) {
	return async (dispatch, getState) => {
		try {
			const { data } = await apiSaveUserGroup({ data: { groupId: Id, groupName: Name } });
			dispatch({ type: SAVE_USER_GROUP_SUCCESS, payload: { ...data, ...(Id === 0 ? { Count: 0 } : {}) } });

			return data.Id;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteUserGroup({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteUserGroup({ Id });
			dispatch({ type: DELETE_USER_GROUP_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function getGroupForUser({ userId }) {
	return async dispatch => {
		const { data } = await apiGetGroupForUser({ userId });
		dispatch({ type: GET_GROUP_FOR_USER_SUCCESS, userId, payload: data });
	};
}

export function getPlayers() {
	return async (dispatch, getState) => {
		dispatch({ type: GET_PLAYERS });

		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data: players } = await apiGetPlayers({ customerId: CustomerId });
			dispatch({ type: GET_PLAYERS_SUCCESS, payload: players });
		} catch (error) {
			dispatch({ type: GET_PLAYERS_ERROR });
		}
	};
}

export function savePlayer(value) {
	return async (dispatch, getState) => {
		try {
			const { Id } = value;

			if (Id) {
				await apiSavePlayer({ data: value });
				dispatch({ type: SAVE_PLAYER_SUCCESS, payload: value });
			} else {
				const { user: { current: { CustomerId } } } = getState();

				await apiActivatePlayer({ data: value, customerId: CustomerId });
			}

			dispatch(getPlayers());

			return Id || undefined;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deletePlayer({ Id }) {
	return async dispatch => {
		try {
			await apiDeletePlayer({ Id });
			dispatch({ type: DELETE_PLAYER_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function getPlaylistGroups() {
	return async (dispatch, getState) => {
		dispatch({ type: GET_PLAYLIST_GROUPS });

		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data: playlistGroups } = await apiGetPlaylistGroups({ customerId: CustomerId });
			dispatch({ type: GET_PLAYLIST_GROUPS_SUCCESS, payload: playlistGroups });
		} catch (error) {
			dispatch({ type: GET_PLAYLIST_GROUPS_ERROR });
		}
	};
}

export function savePlaylistGroup({ Id, Name }) {
	return async (dispatch, getState) => {
		try {
			const { data } = await apiSavePlaylistGroup({ data: { Id, Name } });
			dispatch({ type: SAVE_PLAYLIST_GROUP_SUCCESS, payload: { ...data, ...(Id === 0 ? { Count: 0 } : {}) } });

			return data.Id;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deletePlaylistGroup({ Id }) {
	return async dispatch => {
		try {
			await apiDeletePlaylistGroup({ Id });
			dispatch({ type: DELETE_PLAYLIST_GROUP_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function getCategories() {
	return async (dispatch, getState) => {
		dispatch({ type: GET_SETTINGS_CATEGORIES });

		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data: playlistGroups } = await apiGetCategories({ customerId: CustomerId });
			dispatch({ type: GET_SETTINGS_CATEGORIES_SUCCESS, payload: playlistGroups });
		} catch (error) {
			dispatch({ type: GET_SETTINGS_CATEGORIES_ERROR });
		}
	};
}

export function saveCategory(value) {
	return async (dispatch, getState) => {
		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data } = await apiSaveCategory({ customerId: CustomerId, data: value });
			dispatch({ type: SAVE_CATEGORY_SUCCESS, payload: data});

			return data.Id;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteCategory({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteCategory({ Id });
			dispatch({ type: DELETE_CATEGORY_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function getTagTypes() {
	return async (dispatch, getState) => {
		dispatch({ type: GET_PLAYER_TAG_TYPES });

		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data: tagTypes } = await apiGetTagTypes({ customerId: CustomerId });
			dispatch({ type: GET_PLAYER_TAG_TYPES_SUCCESS, payload: tagTypes });

			try {
				await Promise.all(
					tagTypes.map(async ({ Id: tagTypeId }) => {
						const { data: tagValues } = await apiGetTagValues({ tagTypeId });
						dispatch({ type: GET_PLAYER_TAG_VALUES_SUCCESS, payload: tagValues, tagTypeId });
					})
				);
			} catch (error) {}
		} catch (error) {
			dispatch({ type: GET_PLAYER_TAG_TYPES_ERROR });
		}
	};
}

export function saveTagType(value) {
	return async (dispatch, getState) => {
		try {
			const { data } = await apiSaveTagType({ data: value });
			dispatch({ type: SAVE_PLAYER_TAG_TYPE_SUCCESS, payload: data });

			return data.Id;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteTagType({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteTagType({ Id });
			dispatch({ type: DELETE_PLAYER_TAG_TYPE_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function saveTagValue(value) {
	return async (dispatch, getState) => {
		try {
			const { data } = await apiSaveTagValue({ data: value });
			dispatch({ type: SAVE_PLAYER_TAG_VALUE_SUCCESS, payload: data });

			return data.Id;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteTagValue({ Id, tagTypeId }) {
	return async dispatch => {
		try {
			await apiDeleteTagValue({ Id });
			dispatch({ type: DELETE_PLAYER_TAG_VALUE_SUCCESS, Id, tagTypeId });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function getGeneralSettings() {
	return async (dispatch, getState) => {
		dispatch({ type: GET_GENERAL_SETTINGS });

		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data } = await apiGetCustomerInfo({ customerId: CustomerId });
			dispatch({ type: GET_GENERAL_SETTINGS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_GENERAL_SETTINGS_ERROR });
		}
	};
}

export function saveGeneralSettings({ PubFrequency }) {
	return async (dispatch, getState) => {
		try {
			const { user: { current: { CustomerId } } } = getState();

			if (await apiSavePublicationFrequency({ pubfreq: PubFrequency, customerId: CustomerId })) {
				dispatch({ type: SAVE_GENERAL_SETTINGS_SUCCESS, payload: { PubFrequency } });
			}

			try {
				dispatch(getGeneralSettings());
			} catch (error) {}
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function getMobileUsers() {
	return async (dispatch, getState) => {
		dispatch({ type: GET_MOBILE_USERS });

		try {
			const { user: { current: { CustomerId } } } = getState();

			const { data } = await apiGetMobileUsers({ customerId: CustomerId });
			dispatch({ type: GET_MOBILE_USERS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_MOBILE_USERS_ERROR });
		}
	};
}

export function saveMobileUser(value) {
	const { Id, Name, Email } = value;

	return async (dispatch, getState) => {
		try {
			if (Id === 0) {
				const { data: { EmailInUse } } = await apiCheckEmail({ email: Email });

				if (EmailInUse) {
					throw Object.assign(new Error(), { response: { data: 'Email is used already' } });
				}
			}

			const { user: { current: { CustomerId } } } = getState();

			const { data: { Id: savedId } } = await apiSaveMobileUser({
				data: value,
				customerId: CustomerId
			});
			dispatch({ type: SAVE_MOBILE_USER_SUCCESS, payload: { Id: savedId, Name, Email } });

			dispatch(getMobileUsers());

			return savedId;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteMobileUser({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteMobileUser({ Id });
			dispatch({ type: DELETE_MOBILE_USER_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function getMobileUserJobs() {
	return async dispatch => {
		dispatch({ type: GET_MOBILE_USER_JOBS });

		try {
			const { data } = await apiGetMobileUserJobs();
			dispatch({ type: GET_MOBILE_USER_JOBS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_MOBILE_USER_JOBS_ERROR });
		}
	};
}

export function saveMobileUserJob({ Id, Name, InUse }) {
	return async dispatch => {
		try {
			const { data: savedId } = await apiSaveMobileUserJob({
				data: { Id, Name, InUse }
			});
			dispatch({ type: SAVE_MOBILE_USER_JOB_SUCCESS, payload: { Id: savedId, Name, InUse } });

			return savedId;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteMobileUserJob({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteMobileUserJob({ Id });
			dispatch({ type: DELETE_MOBILE_USER_JOB_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function retagMobileUserJob({ retagFromId, retagToId }) {
	return async dispatch => {
		try {
			const { data: isDone } = await apiRetagMobileUserJob({ retagFromId, retagToId });
			if (isDone) {
				dispatch({ type: RETAG_MOBILE_USER_JOB_SUCCESS, retagFromId, retagToId });
			}
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function getMobileUserDepartments() {
	return async dispatch => {
		dispatch({ type: GET_MOBILE_USER_DEPARTMENTS });

		try {
			const { data } = await apiGetMobileUserDepartments();
			dispatch({ type: GET_MOBILE_USER_DEPARTMENTS_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_MOBILE_USER_DEPARTMENTS_ERROR });
		}
	};
}

export function saveMobileUserDepartment({ Id, Name, InUse }) {
	return async dispatch => {
		try {
			const { data: savedId } = await apiSaveMobileUserDepartment({
				data: { Id, Name, InUse }
			});
			dispatch({ type: SAVE_MOBILE_USER_DEPARTMENT_SUCCESS, payload: { Id: savedId, Name, InUse } });

			return savedId;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteMobileUserDepartment({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteMobileUserDepartment({ Id });
			dispatch({ type: DELETE_MOBILE_USER_DEPARTMENT_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function retagMobileUserDepartment({ retagFromId, retagToId }) {
	return async dispatch => {
		try {
			const { data: isDone } = await apiRetagMobileUserDepartment({ retagFromId, retagToId });
			if (isDone) {
				dispatch({ type: RETAG_MOBILE_USER_DEPARTMENT_SUCCESS, retagFromId, retagToId });
			}
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function getMobileUserCompanies() {
	return async dispatch => {
		dispatch({ type: GET_MOBILE_USER_COMPANIES });

		try {
			const { data } = await apiGetMobileUserCompanies();
			dispatch({ type: GET_MOBILE_USER_COMPANIES_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: GET_MOBILE_USER_COMPANIES_ERROR });
		}
	};
}

export function saveMobileUserCompany({ Id, Name, InUse }) {
	return async dispatch => {
		try {
			const { data: savedId } = await apiSaveMobileUserCompany({
				data: { Id, Name, InUse }
			});
			dispatch({ type: SAVE_MOBILE_USER_COMPANY_SUCCESS, payload: { Id: savedId, Name, InUse } });

			return savedId;
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}

export function deleteMobileUserCompany({ Id }) {
	return async dispatch => {
		try {
			await apiDeleteMobileUserCompany({ Id });
			dispatch({ type: DELETE_MOBILE_USER_COMPANY_SUCCESS, Id });
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
		}
	};
}

export function retagMobileUserCompany({ retagFromId, retagToId }) {
	return async dispatch => {
		try {
			const { data: isDone } = await apiRetagMobileUserCompany({ retagFromId, retagToId });
			if (isDone) {
				dispatch({ type: RETAG_MOBILE_USER_COMPANY_SUCCESS, retagFromId, retagToId });
			}
		} catch (error) {
			dispatch(createErrorNotificationAction(error));
			throw error;
		}
	};
}
