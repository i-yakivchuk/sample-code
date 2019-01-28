import Api from './api';
const path = '/Settings';
const mobileUsersManagementPath = '/MobileUsersManagement';
const mobileUserJobPath = '/MobileUserJob';
const mobileUserDepartmentPath = '/MobileUserDepartment';
const mobileUserCompanyPath = '/MobileUserCompany';

export function getUsers({ customerId }) {
	return Api.get(`${path}/GetUsers`, { params: { customerId }, credentials: 'sso' });
}

export function saveUser({ data, customerId }) {
	return Api.post(`${path}/SaveUser`, data, { params: { customerId }, credentials: 'sso' });
}

export function deleteUser({ Id }) {
	return Api.post(`${path}/DisableUser/${Id}`, {}, { credentials: 'sso' });
}

export function getUserById({ userId }) {
	return Api.get(`${path}/GetUsersByID`, { params: { userId }, credentials: 'sso' });
}

export function getUserTypes() {
	return Api.get(`${path}/GetUserTypes`, { credentials: 'sso' });
}

export function getUserRights() {
	return Api.get(`${path}/GetUserRights`, { credentials: 'sso' });
}

export function getUserGroups({ withUserCount }) {
	return Api.get(`${path}/GetUserGroups`, { params: { withUserCount }, credentials: 'sso' });
}

export function saveUserGroup({ data }) {
	return Api.post(`${path}/SaveNewUserGroup`, data, { credentials: 'sso' });
}

export function deleteUserGroup({ Id }) {
	return Api.delete(`${path}/DeleteUserGroup`, { params: { groupId: Id }, credentials: 'sso' });
}

export function getGroupForUser({ userId }) {
	return Api.get(`${path}/GetUserGroup`, { params: { userId }, credentials: 'sso' });
}

export function saveGroupForUser({ userId, groupId }) {
	return Api.post(`${path}/SaveUserGroup`, {}, { params: { userId, groupId }, credentials: 'sso' });
}

export function getPlayers({ customerId }) {
	return Api.get(`${path}/GetPlayers`, { params: { customerId }, credentials: 'sso' });
}

export function savePlayer({ data }) {
	return Api.post(`${path}/SavePlayer`, data, { credentials: 'sso' });
}

export function activatePlayer({ data, customerId }) {
	return Api.post(`${path}/ActivatePlayer`, data, { params: { customerId }, credentials: 'sso' });
}

export function deletePlayer({ Id }) {
	return Api.delete(`${path}/DeletePlayer/${Id}`, { credentials: 'sso' });
}

export function getPlaylistGroups({ customerId }) {
	return Api.get(`${path}/GetChannels`, { params: { customerId }, credentials: 'sso' });
}

export function savePlaylistGroup({ data }) {
	return Api.post(`${path}/SaveChannel`, data, { credentials: 'sso' });
}

export function deletePlaylistGroup({ Id }) {
	return Api.delete(`${path}/DeleteChannel`, { params: { channelId: Id }, credentials: 'sso' });
}

export function getCategories({ customerId }) {
	return Api.get(`${path}/GetCategory`, { params: { customerId }, credentials: 'sso' });
}

export function saveCategory({ data, customerId }) {
	return Api.post(`${path}/SaveCategory`, data, { params: { customerId }, credentials: 'sso' });
}

export function deleteCategory({ Id }) {
	return Api.delete(`${path}/DeleteCategory/${Id}`, { credentials: 'sso' });
}

export function getTagTypes({ customerId }) {
	return Api.get(`${path}/GetTagTypes`, { params: { customerId }, credentials: 'sso' });
}

export function saveTagType({ data }) {
	return Api.post(`${path}/SaveTagType`, data, { credentials: 'sso' });
}

export function deleteTagType({ Id }) {
	return Api.delete(`${path}/DeleteTagType`, { params: { tagtypeId: Id }, credentials: 'sso' });
}

export function getTagValues({ tagTypeId }) {
	return Api.get(`${path}/GetTags`, { params: { tagTypeId }, credentials: 'sso' });
}

export function saveTagValue({ data }) {
	return Api.post(`${path}/SaveTag`, data, { credentials: 'sso' });
}

export function deleteTagValue({ Id }) {
	return Api.delete(`${path}/DeleteTag`, { params: { tagId: Id }, credentials: 'sso' });
}

export function getCustomerInfo({ customerId }) {
	return Api.get(`${path}/GetCustomerInfo`, { params: { customerId }, credentials: 'sso' });
}

export function savePublicationFrequency({ pubfreq, customerId }) {
	return Api.post(`${path}/SavePublicationFrequency`, {}, { params: { pubfreq, customerId }, credentials: 'sso' });
}

// Mobile users management

export function getMobileUsers({ customerId }) {
	return Api.get(`${mobileUsersManagementPath}/GetMobileUserList`, { params: { customerId }, credentials: 'sso' });
}

export function saveMobileUser({ data, customerId }) {
	return Api.post(`${mobileUsersManagementPath}/SaveMobileUser`, data, { params: { customerId }, credentials: 'sso' });
}

export function deleteMobileUser({ Id }) {
	return Api.delete(`${mobileUsersManagementPath}/DeleteMobileUser/${Id}`, { credentials: 'sso' });
}

export function checkEmail({ email }) {
	return Api.post(`${mobileUsersManagementPath}/CheckEmail`, {}, { params: { email }, credentials: 'sso' });
}

export function sendInvites({ mobileUserIds }) {
	return Api.post(`${mobileUsersManagementPath}/SendInvite`, mobileUserIds, { credentials: 'sso' });
}

export function sendInviteReminders({ mobileUserIds }) {
	return Api.post(`${mobileUsersManagementPath}/SendInviteReminder`, mobileUserIds, { credentials: 'sso' });
}

export function getLastImportInfo() {
	return Api.post(`${mobileUsersManagementPath}/LastImport`, {}, { credentials: 'sso' });
}

export function importUsers({ fileUpload }) {
	const formData = new FormData();
	formData.append('fileUpload', fileUpload);
	return Api.post(`${mobileUsersManagementPath}/Import`, formData, { credentials: 'sso' });
}

export function getMobileUserJobs() {
	return Api.get(`${mobileUserJobPath}/GetMobileUserJobs`, { credentials: 'sso' });
}

export function saveMobileUserJob({ data }) {
	return Api.post(`${mobileUserJobPath}/SaveMobileUserJob`, data, { credentials: 'sso' });
}

export function deleteMobileUserJob({ Id }) {
	return Api.delete(`${mobileUserJobPath}/DeleteMobileUserJob/${Id}`, { credentials: 'sso' });
}

export function retagMobileUserJob({ retagFromId, retagToId }) {
	return Api.post(`${mobileUserJobPath}/Retag`, { retagFromId, retagToId }, { credentials: 'sso' });
}

export function getMobileUserDepartments() {
	return Api.get(`${mobileUserDepartmentPath}/GetMobileUserDepartment`, { credentials: 'sso' });
}

export function saveMobileUserDepartment({ data }) {
	return Api.post(`${mobileUserDepartmentPath}/SaveMobileUserDepartment`, data, { credentials: 'sso' });
}

export function deleteMobileUserDepartment({ Id }) {
	return Api.delete(`${mobileUserDepartmentPath}/DeleteMobileUserDepartment/${Id}`, { credentials: 'sso' });
}

export function retagMobileUserDepartment({ retagFromId, retagToId }) {
	return Api.post(`${mobileUserDepartmentPath}/Retag`, { retagFromId, retagToId }, { credentials: 'sso' });
}

export function getMobileUserCompanies() {
	return Api.get(`${mobileUserCompanyPath}/GetMobileUserCompany`, { credentials: 'sso' });
}

export function saveMobileUserCompany({ data }) {
	return Api.post(`${mobileUserCompanyPath}/SaveMobileUserCompany`, data, { credentials: 'sso' });
}

export function deleteMobileUserCompany({ Id }) {
	return Api.delete(`${mobileUserCompanyPath}/DeleteMobileUserCompany/${Id}`, { credentials: 'sso' });
}

export function retagMobileUserCompany({ retagFromId, retagToId }) {
	return Api.post(`${mobileUserCompanyPath}/Retag`, { retagFromId, retagToId }, { credentials: 'sso' });
}
