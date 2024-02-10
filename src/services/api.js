import axios from "axios";

//#region URLs

//const baseUrl = "https://api1.d-ludo.com/api/";
const baseUrl = "https://api1.d-ludo.com/api/";

//my code starts ...



//my code ends...
//Stats
const getStats_URL = baseUrl + "Admin/Stats/GetStats";


//my code starts ....
//Tournaments Urls
const createTournament_URL = baseUrl + "Tournaments";
const getTournaments_URL = baseUrl + "Tournaments";
const updateUserDetailsInTournament_URL  = baseUrl + "Tournaments/update-user-details";
// http://localhost:6505/api/


//my code ends ....


//Admin Users
const verifyUser_URL = baseUrl + "Admin/AdminUsers/VerifyUser";
const getUserDetails_URL = baseUrl + "Admin/AdminUsers/GetUserDetails";
const getUsers_URL = baseUrl + "Admin/AdminUsers/GetUsers";
const createUser_URL = baseUrl + "Admin/AdminUsers/CreateUser";
const updateUser_URL = baseUrl + "Admin/AdminUsers/UpdateUser";
const deleteUser_URL = baseUrl + "Admin/AdminUsers/DeleteUser";

//Bundles
const getBundles_URL = baseUrl + "Admin/Bundles/GetBundles";
const createBundle_URL = baseUrl + "Admin/Bundles/CreateBundle";
const updateBundle_URL = baseUrl + "Admin/Bundles/UpdateBundle";
const deleteBundle_URL = baseUrl + "Admin/Bundles/DeleteBundle";

//Categories
const getCategories_URL = baseUrl + "Admin/Categories/GetCategories";
const createCategory_URL = baseUrl + "Admin/Categories/CreateCategory";
const updateCategory_URL = baseUrl + "Admin/Categories/UpdateCategory";
const deleteCategory_URL = baseUrl + "Admin/Categories/DeleteCategory";
const sortCategory_URL = baseUrl + "Admin/Categories/SortCategory";

//Games
const getGames_URL = baseUrl + "Admin/Games/GetGames";
const createGame_URL = baseUrl + "Admin/Games/CreateGame";
const updateGame_URL = baseUrl + "Admin/Games/UpdateGame";
const deleteGame_URL = baseUrl + "Admin/Games/DeleteGame";
const sortGame_URL = baseUrl + "Admin/Games/SortGames";

//Game Variations
const getGameVariations_URL = baseUrl + "Admin/GameVariations/GetGameVariations";
const createGameVariation_URL = baseUrl + "Admin/GameVariations/CreateGameVariation";
const updateGameVariation_URL = baseUrl + "Admin/GameVariations/UpdateGameVariation";
const deleteGameVariation_URL = baseUrl + "Admin/GameVariations/DeleteGameVariation";
const sortGameVariation_URL = baseUrl + "Admin/GameVariations/SortGameVariations";

//Game Parameters
const getGameParameters_URL = baseUrl + "Admin/GameParameters/GetGameParameters";
const createGameParameter_URL = baseUrl + "Admin/GameParameters/CreateGameParameter";
const updateGameParameter_URL = baseUrl + "Admin/GameParameters/UpdateGameParameter";
const deleteGameParameter_URL = baseUrl + "Admin/GameParameters/DeleteGameParameter";
const sortGameParameter_URL = baseUrl + "Admin/GameParameters/SortGameParameters";
const setPlayGameParameter_URL = baseUrl + "Admin/GameParameters/SetPlayGameParameter";

//Game Rooms
const getGameRooms_URL = baseUrl + "Admin/GameRooms/GetGameRooms";
const createGameRoom_URL = baseUrl + "Admin/GameRooms/CreateGameRoom";
const updateGameRoom_URL = baseUrl + "Admin/GameRooms/UpdateGameRoom";
const deleteGameRoom_URL = baseUrl + "Admin/GameRooms/DeleteGameRoom";
const sortGameRoom_URL = baseUrl + "Admin/GameRooms/SortGameRooms";

//Game Users
const getGameUserDetails_URL = baseUrl + "Admin/GameUsers/GetUserDetails";
const getGameUsers_URL = baseUrl + "Admin/GameUsers/GetUsers";
const banUser_URL = baseUrl + "Admin/GameUsers/BanUser";
const unbanUser_URL = baseUrl + "Admin/GameUsers/UnBanUser";
const uploadAadharFront_URL = baseUrl + "Admin/GameUsers/UploadAadharFront";
const uploadAadharBack_URL = baseUrl + "Admin/GameUsers/UploadAadharBack";
const uploadPanCard_URL = baseUrl + "Admin/GameUsers/UploadPanCard";
const uploadPhoto_URL = baseUrl + "Admin/GameUsers/UploadPhoto";

//Game History
const getGameHistory_URL = baseUrl + "Admin/GameHistory/GetGameHistory";
const getGameHistoryById_URL = baseUrl + "Admin/GameHistory/GetGameHistoryById";
const getGameLogs_URL = baseUrl + "Admin/GameHistory/GetGameLogs";

//Transactions
const getTransactions_URL = baseUrl + "Admin/Transactions/GetTransactions";
const getTransactionsById_URL = baseUrl + "Admin/Transactions/GetTransactionsById";
const createTransaction_URL = baseUrl + "Admin/Transactions/CreateTransaction";

//Bot Transactions
const getBotTransactions_URL = baseUrl + "Admin/BotTransactions/GetBotTransactions";
const createBotTransaction_URL = baseUrl + "Admin/BotTransactions/CreateBotTransaction";

//Earnings
const getEarnings_URL = baseUrl + "Admin/Earnings/GetEarnings";

//Withdrawals
const getWithdrawals_URL = baseUrl + "Admin/Withdrawals/GetWithdrawals";
const approveWithdrawal_URL = baseUrl + "Admin/Withdrawals/ApproveWithdrawal";
const rejectWithdrawal_URL = baseUrl + "Admin/Withdrawals/RejectWithdrawal";

//WithdrawCommissions
const getWithdrawCommissions_URL = baseUrl + "Admin/WithdrawCommissions/GetWithdrawCommissions";
const createWithdrawCommission_URL = baseUrl + "Admin/WithdrawCommissions/CreateWithdrawCommission";
const updateWithdrawCommission_URL = baseUrl + "Admin/WithdrawCommissions/UpdateWithdrawCommission";
const deleteWithdrawCommission_URL = baseUrl + "Admin/WithdrawCommissions/DeleteWithdrawCommission";

//Settings
const getSettings_URL = baseUrl + "Admin/Settings/GetSettings";
const updateSettings_URL = baseUrl + "Admin/Settings/UpdateSettings";

//Reports
const getReports_URL = baseUrl + "Admin/Reports/GetReports";

//Master Server Credentials
const getMasterServerCredentials_URL = baseUrl + "Admin/MasterServerCredentials/GetMasterServerCredentials";
const createMasterServerCredential_URL = baseUrl + "Admin/MasterServerCredentials/CreateMasterServerCredential";
const updateMasterServerCredential_URL = baseUrl + "Admin/MasterServerCredentials/UpdateMasterServerCredential";
const deleteMasterServerCredential_URL = baseUrl + "Admin/MasterServerCredentials/DeleteMasterServerCredential";

//Game Server Credentials
const getGameServerCredentials_URL = baseUrl + "Admin/GameServerCredentials/GetGameServerCredentials";
const createGameServerCredential_URL = baseUrl + "Admin/GameServerCredentials/CreateGameServerCredential";
const updateGameServerCredential_URL = baseUrl + "Admin/GameServerCredentials/UpdateGameServerCredential";
const deleteGameServerCredential_URL = baseUrl + "Admin/GameServerCredentials/DeleteGameServerCredential";

//API Credentials
const getApiCredentials_URL = baseUrl + "Admin/ApiCredentials/GetApiCredentials";
const createApiCredential_URL = baseUrl + "Admin/ApiCredentials/CreateApiCredential";
const updateApiCredential_URL = baseUrl + "Admin/ApiCredentials/UpdateApiCredential";
const deleteApiCredential_URL = baseUrl + "Admin/ApiCredentials/DeleteApiCredential";

//#endregion

//#region Utilities
function getAxios() {
    return axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("cc_token")}`,
            userId: `${localStorage.getItem("cc_userId")}`
        }
    });
}

function checkSession(response) {
    if (response.status === 200 && !response.data.isValidSession)
        window.location.href = "/Login";

    return response;
}

//#endregion

//#region Stats

//#region Get Stats
export async function getStats() {
    let url = getStats_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#endregion

//#region Login
export async function verifyUser(username, password) {
    let url = verifyUser_URL;
    let inputData = {
        username: username,
        password: password
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Get User Details
export async function getUserDetails(userId) {
    let url = getUserDetails_URL + "?userId=" + userId;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Users

//#region Get Users
export async function getUsers() {
    let url = getUsers_URL + "?userId=" + localStorage.getItem("cc_userId");

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create User
export async function createUser(username, password, privileges) {
    let url = createUser_URL;
    let inputData = {
        parentUserId: localStorage.getItem("cc_userId"),
        username: username,
        password: password,
        privileges: privileges
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update User
export async function updateUser(userId, username, password, privileges) {
    let url = updateUser_URL;
    let inputData = {
        userId: userId,
        username: username,
        password: password,
        privileges: privileges
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete User
export async function deleteUser(userId) {
    let url = deleteUser_URL + "?userId=" + userId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#endregion

//#region Bundles

//#region Get Bundles
export async function getBundles() {
    let url = getBundles_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Bundle
export async function createBundle(bundleName, androidUrl, iosUrl) {
    let url = createBundle_URL;
    let inputData = {
        name: bundleName,
        androidUrl: androidUrl,
        iosUrl: iosUrl
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Bundle
export async function updateBundle(bundleId, bundleName, androidUrl, iosUrl) {
    let url = updateBundle_URL;
    let inputData = {
        id: bundleId,
        name: bundleName,
        androidUrl: androidUrl,
        iosUrl: iosUrl
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Bundle
export async function deleteBundle(bundleId) {
    let url = deleteBundle_URL + "?bundleId=" + bundleId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#endregion

//#region Categories

//#region Get Categories
export async function getCategories() {
    let url = getCategories_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Category
export async function createCategory(categoryName, isVisible) {
    let url = createCategory_URL;
    let inputData = {
        name: categoryName,
        isVisible: isVisible
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Category
export async function updateCategory(categoryId, categoryName, isVisible) {
    let url = updateCategory_URL;
    let inputData = {
        id: categoryId,
        name: categoryName,
        isVisible: isVisible
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Category
export async function deleteCategory(categoryId) {
    let url = deleteCategory_URL + "?categoryId=" + categoryId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#region Sort Category
export async function sortCategory(categoryIds) {
    let url = sortCategory_URL;
    let inputData = {
        categoryIds: categoryIds
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#endregion

//#region Games

//#region Get Games
export async function getGames() {
    let url = getGames_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Game
export async function createGame(hiddenName, displayName, isVisible, bundleId, categoryId, keywords) {
    let url = createGame_URL;
    let inputData = {
        hiddenName: hiddenName,
        displayName: displayName,
        isVisible: isVisible,
        bundleId: bundleId,
        categoryId: categoryId,
        keywords: keywords
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Game
export async function updateGame(gameId, hiddenName, displayName, isVisible, bundleId, categoryId, keywords) {
    let url = updateGame_URL;
    let inputData = {
        gameId: gameId,
        hiddenName: hiddenName,
        displayName: displayName,
        isVisible: isVisible,
        bundleId: bundleId,
        categoryId: categoryId,
        keywords: keywords
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Game
export async function deleteGame(gameId) {
    let url = deleteGame_URL + "?gameId=" + gameId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#region Sort Game
export async function sortGame(gameIds) {
    let url = sortGame_URL;
    let inputData = {
        gameIds: gameIds
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#endregion

//#region Game Variations

//#region Get Game Variations
export async function getGameVariations(gameId) {
    let url = getGameVariations_URL + "?parentGameId=" + gameId;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Game Variation
export async function createGameVariation(gameId, hiddenName, displayName, isVisible) {
    let url = createGameVariation_URL;
    let inputData = {
        parentId: gameId,
        hiddenName: hiddenName,
        displayName: displayName,
        isVisible: isVisible
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Game Variation
export async function updateGameVariation(variationId, hiddenName, displayName, isVisible) {
    let url = updateGameVariation_URL;
    let inputData = {
        variationId: variationId,
        hiddenName: hiddenName,
        displayName: displayName,
        isVisible: isVisible,
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Game Variation
export async function deleteGameVariation(variationId) {
    let url = deleteGameVariation_URL + "?variationId=" + variationId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#region Sort Game Variation
export async function sortGameVariation(gameId, variationIds) {
    let url = sortGameVariation_URL;
    let inputData = {
        parentGameId: gameId,
        variationIds: variationIds
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#endregion

//#region Game Parameters

//#region Get Game Parameters
export async function getGameParameters(variationId) {
    let url = getGameParameters_URL + "?variationId=" + variationId;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Game Parameter
export async function createGameParameter(variationId, dataType, hiddenName, displayName, defaultValue, isVisible, dimensions) {
    let url = createGameParameter_URL;
    let inputData = {
        variationId: variationId,
        dataType: dataType,
        hiddenName: hiddenName,
        displayName: displayName,
        defaultValue: defaultValue,
        isVisible: isVisible,
        dimensions: dimensions
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Game Parameter
export async function updateGameParameter(variationId, parameterId, dataType, hiddenName, displayName, defaultValue, isVisible, dimensions) {
    let url = updateGameParameter_URL;
    let inputData = {
        variationId: variationId,
        parameterId: parameterId,
        dataType: dataType,
        hiddenName: hiddenName,
        displayName: displayName,
        defaultValue: defaultValue,
        isVisible: isVisible,
        dimensions: dimensions
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Game Parameter
export async function deleteGameParameter(variationId, parameterId) {
    let url = deleteGameParameter_URL + "?variationId=" + variationId + "&parameterId=" + parameterId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#region Sort Game Parameter
export async function sortGameParameter(variationId, parameterIds) {
    let url = sortGameParameter_URL;
    let inputData = {
        variationId: variationId,
        parameterIds: parameterIds
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Set Play Game Parameter
export async function setPlayGameParameter(variationId, parameterId) {
    let url = setPlayGameParameter_URL;
    let inputData = {
        variationId: variationId,
        parameterId: parameterId
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#endregion

//#region Game Rooms

//#region Get Game Rooms
export async function getGameRooms(variationId) {
    let url = getGameRooms_URL + "?variationId=" + variationId;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Game Room
export async function createGameRoom(variationId, name, isVisible, parameters) {
    let url = createGameRoom_URL;
    let inputData = {
        variationId: variationId,
        name: name,
        isVisible: isVisible,
        parameters: parameters
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Game Room
export async function updateGameRoom(variationId, roomId, name, isVisible, parameters) {
    let url = updateGameRoom_URL;
    let inputData = {
        variationId: variationId,
        roomId: roomId,
        name: name,
        isVisible: isVisible,
        parameters: parameters
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Game Room
export async function deleteGameRoom(variationId, roomId) {
    let url = deleteGameRoom_URL + "?variationId=" + variationId + "&roomId=" + roomId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#region Sort Game Room
export async function sortGameRoom(variationId, roomIds) {
    let url = sortGameRoom_URL;
    let inputData = {
        variationId: variationId,
        roomIds: roomIds
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#endregion

//#region Game Users

//#region Get Game User Details
export async function getGameUserDetails(userId) {
    let url = getGameUserDetails_URL + "?userId=" + userId;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Get Game Users
export async function getGameUsers(pageNo, userIdCap, limitCount, searchParameter, searchValue) {
    let url = getGameUsers_URL + "?pageNo=" + pageNo + "&userIdCap=" + userIdCap + "&limitCount=" + limitCount + "&searchParameter=" + searchParameter + "&searchValue=" + searchValue;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Ban User
export async function banUser(userId) {
    let url = banUser_URL;
    let inputData = {
        userId: userId
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Unban User
export async function unbanUser(userId) {
    let url = unbanUser_URL;
    let inputData = {
        userId: userId
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Upload KYC
export async function uploadKYC(userId, image, kyc) {
    let url = "";

    switch (kyc) {
        case "aadhar_front":
            url = uploadAadharFront_URL;
            break;
        case "aadhar_back":
            url = uploadAadharBack_URL;
            break;
        case "pan_card":
            url = uploadPanCard_URL;
            break;
        case "photo":
            url = uploadPhoto_URL;
            break;
        default:
            break;
    }

    let inputData = new FormData();
    inputData.append("userId", userId);
    inputData.append("image", image);

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#endregion

//#region Game History

//#region Get Game History
export async function getGameHistory(pageNo, gameHistoryIdCap, limitCount, searchParameter, searchValue) {
    let url = getGameHistory_URL + "?pageNo=" + pageNo + "&gameHistoryIdCap=" + gameHistoryIdCap + "&limitCount=" + limitCount + "&searchParameter=" + searchParameter + "&searchValue=" + searchValue;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Get Game History By Id
export async function getGameHistoryById(userId, pageNo, gameHistoryIdCap, limitCount, searchParameter, searchValue) {
    let url = getGameHistoryById_URL + "?gameUserId=" + userId + "&pageNo=" + pageNo + "&gameHistoryIdCap=" + gameHistoryIdCap + "&limitCount=" + limitCount + "&searchParameter=" + searchParameter + "&searchValue=" + searchValue;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Get Game Logs
export async function getGameLogs(gameHistoryId) {
    let url = getGameLogs_URL + "?gameHistoryId=" + gameHistoryId;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#endregion

//#region Transactions

//#region Get Transactions
export async function getTransactions(pageNo, txnIdCap, limitCount, searchParameter, searchValue) {
    let url = getTransactions_URL + "?pageNo=" + pageNo + "&txnIdCap=" + txnIdCap + "&limitCount=" + limitCount + "&searchParameter=" + searchParameter + "&searchValue=" + searchValue;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Get Transactions By Id
export async function getTransactionsById(userId, pageNo, txnIdCap, limitCount, searchParameter, searchValue) {
    let url = getTransactionsById_URL + "?gameUserId=" + userId + "&pageNo=" + pageNo + "&txnIdCap=" + txnIdCap + "&limitCount=" + limitCount + "&searchParameter=" + searchParameter + "&searchValue=" + searchValue;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Transactions
export async function createTransaction
    (userId, isCredit, txnAmount, txnDescription, txnWallet) {
    let url = createTransaction_URL;
    let inputData = {
        userId: userId,
        isCredit: isCredit,
        txnAmount: txnAmount,
        txnDescription: txnDescription,
        txnType: txnWallet
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#endregion

//#region Bot Transactions

//#region Get Bot Transactions
export async function getBotTransactions(pageNo, txnIdCap, limitCount, fromDate, toDate) {
    let url = getBotTransactions_URL + "?pageNo=" + pageNo + "&txnIdCap=" + txnIdCap + "&limitCount=" + limitCount + "&fromDate=" + fromDate + "&toDate=" + toDate;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Bot Transaction
export async function createBotTransaction(isCredit, txnAmount, txnDescription) {
    let url = createBotTransaction_URL;
    let inputData = {
        isCredit: isCredit,
        txnAmount: txnAmount,
        txnDescription: txnDescription,
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#endregion

//#region Earnings

//#region Get Earnings
export async function getEarnings(fromDate, toDate, limitCount, pageNo) {
    let url = getEarnings_URL + "?fromDate=" + fromDate + "&toDate=" + toDate + "&limitCount=" + limitCount + "&pageNo=" + pageNo;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#endregion

//#region Withdrawals

//#region Get Withdrawals
export async function getWithdrawals(pageNo, withdrawalIdCap, limitCount, searchParameter, searchValue) {
    let url = getWithdrawals_URL + "?pageNo=" + pageNo + "&withdrawalIdCap=" + withdrawalIdCap + "&limitCount=" + limitCount + "&searchParameter=" + searchParameter + "&searchValue=" + searchValue;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Approve Withdrawal
export async function approveWithdrawal(id) {
    let url = approveWithdrawal_URL;
    let inputData = {
        id: id
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Reject Withdrawal
export async function rejectWithdrawal(id) {
    let url = rejectWithdrawal_URL;
    let inputData = {
        id: id
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#endregion

//#region WithdrawCommissions

//#region Get WithdrawCommissions
export async function getWithdrawCommissions() {
    let url = getWithdrawCommissions_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create WithdrawCommission
export async function createWithdrawCommission(minAmount, maxAmount, commission) {
    let url = createWithdrawCommission_URL;
    let inputData = {
        minAmount: minAmount,
        maxAmount: maxAmount,
        commission: commission
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update WithdrawCommission
export async function updateWithdrawCommission(withdrawCommissionId, minAmount, maxAmount, commission) {
    let url = updateWithdrawCommission_URL;
    let inputData = {
        id: withdrawCommissionId,
        minAmount: minAmount,
        maxAmount: maxAmount,
        commission: commission
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete WithdrawCommission
export async function deleteWithdrawCommission(withdrawCommissionId) {
    let url = deleteWithdrawCommission_URL + "?withdrawCommissionId=" + withdrawCommissionId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#endregion

//#region Settings

//#region Get Settings
export async function getSettings() {
    let url = getSettings_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Update Settings
export async function updateSettings(withdraw_commission, welcome_bonus, referee_bonus, referrer_bonus, appUrl, version, serverIp, serverPort, min_withdrawal, withdrawal_min_time, withdrawal_max_time, withdrawal_allowed, notice, notice_link, helpline_number, bot_difficulty) {
    let url = updateSettings_URL;
    let inputData = {
        withdraw_commission: withdraw_commission,
        welcome_bonus: welcome_bonus,
        referee_bonus: referee_bonus,
        referrer_bonus: referrer_bonus,
        url: appUrl,
        version: version,
        serverIp: serverIp,
        serverPort: serverPort,
        min_withdrawal: min_withdrawal,
        withdrawal_min_time: withdrawal_min_time,
        withdrawal_max_time: withdrawal_max_time,
        withdrawal_allowed: withdrawal_allowed,
        notice: notice,
        notice_link: notice_link,
        helpline_number: helpline_number,
        botDifficultyLevel: bot_difficulty
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#endregion

//#region Reports

//#region Get Reports
export async function getReports(reportType, fromDate, toDate) {
    let url = getReports_URL + "?reportType=" + reportType + "&fromDate=" + fromDate + "&toDate=" + toDate;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#endregion

//#region Master Server Credentials

//#region Get Master Server Credentials
export async function getMasterServerCredentials() {
    let url = getMasterServerCredentials_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Master Server Credential
export async function createMasterServerCredential(appVersion, ip, port) {
    let url = createMasterServerCredential_URL;
    let inputData = {
        appVersion: appVersion,
        ip: ip,
        port: port
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Master Server Credential
export async function updateMasterServerCredential(id, appVersion, ip, port) {
    let url = updateMasterServerCredential_URL;
    let inputData = {
        id: id,
        appVersion: appVersion,
        ip: ip,
        port: port
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Master Server Credential
export async function deleteMasterServerCredential(masterServerCredentialId) {
    let url = deleteMasterServerCredential_URL + "?masterServerCredentialId=" + masterServerCredentialId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#endregion

//#region Game Server Credentials

//#region Get Game Server Credentials
export async function getGameServerCredentials() {
    let url = getGameServerCredentials_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create Game Server Credential
export async function createGameServerCredential(masterServerId, ip, port, priority) {
    let url = createGameServerCredential_URL;
    let inputData = {
        masterServerId: masterServerId,
        ip: ip,
        port: port,
        priority: priority
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update Game Server Credential
export async function updateGameServerCredential(id, masterServerId, ip, port, priority) {
    let url = updateGameServerCredential_URL;
    let inputData = {
        id: id,
        masterServerId: masterServerId,
        ip: ip,
        port: port,
        priority: priority
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete Game Server Credential
export async function deleteGameServerCredential(gameServerCredentialId) {
    let url = deleteGameServerCredential_URL + "?gameServerCredentialId=" + gameServerCredentialId;

    return checkSession(await getAxios().delete(url));
}
//#endregion

//#endregion

//#region API Credentials

//#region Get API Credentials
export async function getApiCredentials() {
    let url = getApiCredentials_URL;

    return checkSession(await getAxios().get(url));
}
//#endregion

//#region Create API Credential
export async function createApiCredential(apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort) {
    let url = createApiCredential_URL;
    let inputData = {
        apiUrl: apiUrl,
        appVersion: appVersion,
        masterIp: masterIp,
        masterPort: masterPort,
        gameIp: gameIp,
        gamePort: gamePort
    }

    return checkSession(await getAxios().post(url, inputData));
}
//#endregion

//#region Update API Credential
export async function updateApiCredential(id, apiUrl, appVersion, masterIp, masterPort, gameIp, gamePort) {
    let url = updateApiCredential_URL;
    let inputData = {
        id: id,
        apiUrl: apiUrl,
        appVersion: appVersion,
        masterIp: masterIp,
        masterPort: masterPort,
        gameIp: gameIp,
        gamePort: gamePort
    }

    return checkSession(await getAxios().put(url, inputData));
}
//#endregion

//#region Delete API Credential
export async function deleteApiCredential(apiCredentialId) {
    let url = deleteApiCredential_URL + "?apiCredentialId=" + apiCredentialId;

    return checkSession(await getAxios().delete(url));
}
//#endregion


//my code starts ...


export async function createTournament(tournamentTitle, startDate, endDate, joinFee) {
    let url = createTournament_URL;
    let inputData = {
        title: tournamentTitle,
        startDate: startDate,
        endDate: endDate,
        joinFee: joinFee
    }

    return checkSession(await getAxios().post(url, inputData));
}

export async function getTournaments() {
    let url = getTournaments_URL;

    return checkSession(await getAxios().get(url));
}

export async function updateUserDetailsInTournament(tournamentId, userId, updatedDetails) {
    let url = updateUserDetailsInTournament_URL;
    let inputData = {
        tournamentId: tournamentId,
        userId: userId,
        // updatedDetails: updatedDetails
    }

    return checkSession(await getAxios().put(url, inputData));
}




//my code ends...




//#endregion
