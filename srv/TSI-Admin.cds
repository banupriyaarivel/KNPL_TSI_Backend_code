 @(requires : 'authenticated-user')
service TSIAdminService {
    define type SaleGroupListKPIResult {
        SALES_GRP   : String;
    }

    define type TSIUserListItem {
        ID: Integer;
        FIRST_NAME: String;
        LAST_NAME: String;
        EMAIL: String;
        SALES_GROUP: array of String;
        EMPLOYEE_CODE: String;
        LAST_LOGIN_TIME: String;
        IS_ACTIVATED: Integer;
        STATUS: String;
        APP_VERSION: String;
        APP_STATUS: String;
        ROLE_ID: Integer;
        ROLE_NAME: String;
    }

    define type TSIUserListKPIResult {
        USERS   : array of TSIUserListItem;
        TOTAL_COUNT : Integer;
    }

    define type TSIUsersCountKPIResult {
        d: {
            icon: String;
            info: String;
            infoState: String;
            number: Integer;
            numberDigits: Integer;
            numberFactor: String;
            numberState: String;
            numberUnit: String;
            stateArrow: String;
            subtitle: String;
            title: String;
        }
    }

    define type MasterRoles {
        ID: Integer;
        NAME: String;
        IS_ARCHIVED: Integer;
    }

    function getSalesGroupList(
        searchText: String
    ) returns array of SaleGroupListKPIResult;

    action getTSIUserList(
        searchText: String,
        salesGroup: array of String, 
        appStatus: String, 
        sortOrder: String, 
        sortColumn: String, 
        topRec: Integer, 
        skipRec: Integer,
        roleId: Integer
    ) returns TSIUserListKPIResult;

    action updateTSIUserStatus(
        email: String, 
        isActivated: Integer
    ) returns String;

    function getTSIUsersCount() returns TSIUsersCountKPIResult;

    function getMasterRolesList() returns array of MasterRoles;

}