using { TSIService.GeneralValueType, TSIService.GeneralNameValueType } from './TSI';

extend service TSIService with {
    
    define type ASMUserItem {
        NAME        : String;
        EMAIL       : String;
        SALES_GROUP : String;
        IS_SELECTED : Boolean;
        IS_VISIBLE  : Boolean;
    }

    define type ASMUserListKPIResult {
        USERS   : array of ASMUserItem;
        TOTAL_COUNT : Integer;
    }

    define type SalesOfficeItem {
        NAME                : String;
        EMAIL               : String;
        SALES_GROUP         : String;
        ASM_NAME            : String;
        ASM_EMAIL           : String;
        IS_SELECTED         : Boolean;
        IS_VISIBLE          : Boolean;
    }

     define type SalesOfficeKPIResult {
        SALES_OFFICES   : array of SalesOfficeItem;
        TOTAL_COUNT : Integer;
    }

    define type DepotItem {
        DEPOT               : String;
        EMAIL               : String;
        SALES_GROUP         : String;
        IS_SELECTED         : Boolean;
        IS_VISIBLE          : Boolean;
    }

    define type DepotKPIResult {
        DEPOT: array of DepotItem;
        TOTAL_COUNT : Integer;
    }

    define type TSIUserItem {
        FIRST_NAME          : String;
        LAST_NAME           : String;
        EMAIL               : String;
        SALES_GROUP         : String;
        ASM_EMAIL            : String;
        ASM_NAME            : String;
        TSI_NAME            : String;
        IS_SELECTED         : Boolean;
        IS_VISIBLE          : Boolean;
    }

     define type TSIUserListKPIResult {
        USERS   : array of TSIUserItem;
        TOTAL_COUNT : Integer;
    }

    // Role based support added
    function getASMUserList(
        searchText: String
    ) returns ASMUserListKPIResult;

    function getSalesOfficesByASMRSMList(
        searchText: String
    ) returns SalesOfficeKPIResult;

    function getDepotByRSM(
        searchText: String
    ) returns DepotKPIResult;

    function getTSIUsersBySalesOfficeList(
        salesGroup: String,
        searchText: String,
        sortOrder : String, 
        sortColumn : String,
        topRec : Integer, 
        skipRec : Integer
    ) returns TSIUserListKPIResult;
}