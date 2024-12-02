
using {
    USER,
    USER_SALES_GROUP_MAP,
    MAP_USER_ROLE,
    ZEMP_MASTER_ECC,
    VIEW_RSM,
    VIEW_ASM,
    VIEW_TSI
    
} from '../db/user';
@(requires : 'authenticated-user')
@path: '/tsi'
service TSIService {

    entity User           as projection on USER;
    entity UserSalesGroup as projection on USER_SALES_GROUP_MAP;
    entity MapUserRole as projection on MAP_USER_ROLE;
    entity ZempMasterEcc as projection on  ZEMP_MASTER_ECC;
    entity RSMUsers as projection on VIEW_RSM;
    entity ASMUsers as projection on VIEW_ASM;
    entity TSIUsers as projection on VIEW_TSI;
    
    // action   getUsers()                                                 returns String;
    action   findUser(email : String)                                   returns String;
    // action   findMyUser(email : String)                                 returns String;

    


    action   createIAS(
        familyName : String,
        givenName : String,
        email : String,
        phoneNumber : String,
        userName : String,
        active : Boolean,
        password:String
        ) returns String;

    define type GeneralValueType {
        VALUE : String;
        IS_HL : Boolean
    }

    define type GeneralNameValueType {
        NAME  : String;
        VALUE : String;
        IS_HL : Boolean
    }

    define type SaleValueKPIResult {
        NAME   : String;
        CY     : GeneralValueType;
        LY     : GeneralValueType;
        GROWTH : GeneralValueType;
    }

    define type OSODKPIResult {
        NAME            : String;
        MONTH_BEGINNING : GeneralValueType;
        TILL_YESTERDAY  : GeneralValueType;
    // NEXT_5_DAYS     : GeneralValueType; (OD Enhancement - Remove next 5 days)
    }

    define type NewCCDKPIResult {
        NAME       : String;
        NOT_BILLED : GeneralValueType;
        BILLED     : GeneralValueType;
    }

    define type TotalVisitsKPIResult {
        NAME      : String;
        TOTAL_NOS : GeneralValueType;
        AVG_NOS   : GeneralValueType;
    }

    define type VisitsKPIResult {
        NAME       : String;
        TOTAL_NOS  : GeneralValueType;
        UNIQUE_NOS : GeneralValueType;
    }

    define type MeetsConductedKPIResult {
        NAME : String;
        NOS  : GeneralValueType;
    }

    define type NotVisitedKPIResult {
        NAME         : String;
        CUSTOMER_NOS : GeneralValueType;
        SITE_NOS     : GeneralValueType;
    }

    define type CollectionKPIResult {
        NAME : String;
        CY   : GeneralValueType;
    }

    define type ActiveDealerKPIResult {
        NAME             : String;
        PARTICIPATED     : GeneralValueType;
        NOT_PARTICIPATED : GeneralValueType;
    }

    define type NDOKPIResult {
        NAME       : String;
        BILLED     : GeneralValueType;
        NOT_BILLED : GeneralValueType;
    }

    define type BudgetKPIResult {
        NAME             : String;
        LACS             : GeneralValueType;
        LACS_ACHIEVEMENT : GeneralValueType;
        KL               : GeneralValueType;
        KL_ACHIEVEMENT   : GeneralValueType;
    }

    define type YTDTrend {
        NAME  : String;
        VALUE : Double;
    }

    define type YTDTrendsKPIResult {
        NAME : String;
        DATA : array of YTDTrend;
    }

    define type CustomerODHLItem {
        CUSTOMER_CODE   : String;
        CUSTOMER_NAME   : String;
        OS              : String;
        OS60            : String;
        MONTH_BEGINNING : String;
        CURRENT_OD      : String;
        TODAY           : String;
        TOMORROW        : String;
        NEXT_3_DAYS     : String;
        NEXT_5_DAYS     : String;
        NEXT_10_DAYS    : String;
    }

    define type CustomerODHLItemResult {
        CUSTOMERS   : array of CustomerODHLItem;
        TOTAL_COUNT : Integer;
    }

    define type CustomerHLItem {
        CUSTOMER_CODE                 : String;
        CUSTOMER_NAME                 : String;
        CEI                           : String;
        VALUE_MTD_TILL_YESTERDAY      : String;
        VISITS_MTD_TILL_YESTERDAY     : String;
        OD_YTD                        : String;
        OS_YTD                        : String;
        COLLECTION_MTD_TILL_YESTERDAY : String;
    }

    define type CustomerHLKPIResult {
        CUSTOMERS   : array of CustomerHLItem;
        TOTAL_COUNT : Integer;
    }

    define type LookupListResult {
        NAME        : String;
        IS_SELECTED : Boolean;
        CODE        : String;
        IS_VISIBLE  : Boolean;
    }

    define type UserProfileResult {
        FIRST_NAME    : String;
        LAST_NAME     : String;
        EMAIL         : String;
        SALES_GROUP   : String;
        PROFILE_IMAGE : String;
        ROLE_ID       : Integer;
    }

    define type CustomerDetailsResult {
        CUSTOMER_CODE                           : String;
        CUSTOMER_NAME                           : String;
        MOBILE_NO                               : String;
        NDO_DATE                                : String;
        LAST_VISIT_DATE                         : String;
        TOTAL_VISITS                            : Integer;
        CEI                                     : String;
        LOS_SUPPLY                              : String;
        CSI                                     : String;
        OPEN_CCD_CALLS                          : String;
        LAST_DEPOT_GIFT                         : String;
        TOWN_NAME                               : String;
        CCD_DATE                                : String;
        LAST_BILLING_DATE                       : String;
        CREDIT_LIMIT                            : String;
        LOS_CL                                  : String;
        LAST_ACCOUNT_RECONCILIATION             : String;
        DEALER_HEALTH_CARD                      : String;
        LAST_SHADE_CARD_MARKETING_MATERIAL_DATE : String;
    }

    define type CustomerFocusProductKPIResult {
        NAME  : String;
        CY_RS : GeneralValueType;
        CY_KL : GeneralValueType;
    }

    define type CustomerSchemeQualificationKPIResult {
        NAME : String;
        NOS  : GeneralValueType;
    }

    define type AllCustomerItem {
        CUSTOMER_CODE     : String;
        CUSTOMER_NAME     : String;
        MOBILE_NO         : String;
        TOWN_NAME         : String;
        NDO_DATE          : String;
        LAST_VISIT_DATE   : String;
        TOTAL_VISITS      : Integer;
        CCD_DATE          : String;
        LAST_BILLING_DATE : String;
    }

    define type AllCustomerListKPIResult {
        CUSTOMERS   : array of AllCustomerItem;
        TOTAL_COUNT : Integer;
    }

    define type ProductTotalKPIResult {
        VALUE  : GeneralValueType;
        VOLUME : GeneralValueType;
    }

    define type ProductCategoryGroupListResult {
        CATEGORY_CODE : String;
        CATEGORY      : String;
        GROUP         : String;
        IS_SELECTED   : Boolean;
        IS_VISIBLE    : Boolean;
    }

    define type CustomerProductParticipationKPIResult {
        NAME : String;
        CY   : GeneralValueType;
        LY   : GeneralValueType;
    }

    define type ProductKPIResult {
        CATEGORY_CODE   : String;
        CATEGORY        : String;
        GROUP           : String;
        IS_VISIBLE      : Boolean;
        KPIS            : array of {
            NAME        : String;
            BUDGET      : GeneralValueType;
            ACHIEVEMENT : GeneralValueType;
            LY          : GeneralValueType;
            CY          : GeneralValueType;
            GROWTH      : GeneralValueType;
        };
    }

    // User profile API
    function getUserProfile(email : String,
                            appVersion : String)                        returns UserProfileResult;

    // Home KPIs
    function getUpcomingODKPIs(salesGroup : String)                     returns array of CollectionKPIResult;
    function getCollectionKPIs(salesGroup : String)                     returns array of CollectionKPIResult;
    function getSalesValueKPIs(salesGroup : String)                     returns array of SaleValueKPIResult;
    function getVolumeKPIs(salesGroup : String)                         returns array of SaleValueKPIResult;
    function getActiveDealerKPIs(salesGroup : String)                   returns array of ActiveDealerKPIResult;
    function getBelowThresholdKPIs(salesGroup : String)                 returns array of CollectionKPIResult;
    function getBudgetKPIs(salesGroup : String)                         returns array of BudgetKPIResult;
    function getNewCCDKPIs(salesGroup : String)                         returns array of NewCCDKPIResult;
    function getNewNDOKPIs(salesGroup : String)                         returns array of NDOKPIResult;
    function getOSODKPIs(salesGroup : String)                           returns array of OSODKPIResult;
    function getOverallVisitsKPIs(salesGroup : String)                  returns array of TotalVisitsKPIResult;
    function getSiteInfluencerVisitsKPIs(salesGroup : String)           returns array of VisitsKPIResult;
    function getCustomerProspectVisitsKPIs(salesGroup : String)         returns array of VisitsKPIResult;
    function getMeetsConductedKPIs(salesGroup : String)                 returns array of MeetsConductedKPIResult;
    function getNotVisitedKPIs(salesGroup : String)                     returns array of NotVisitedKPIResult;
    function getYTDTrendsKPIs(salesGroup : String)                      returns array of YTDTrendsKPIResult;
    // HL Screen APIs
    function getTownList(salesGroup : String)                           returns array of LookupListResult;
    function getCustomerList(salesGroup : String)                       returns array of LookupListResult;

    action   getCustomerODHLKPIs(salesGroup : String,
                                 kpiType : String,
                                 columnHeader : String,
                                 rowHeader : String,
                                 townName : String,
                                 customerCode : String,
                                 customerName : String,
                                 productCategory : String,
                                 productGroup : String,
                                 sortOrder : String,
                                 sortColumn : String,
                                 topRec : Integer,
                                 skipRec : Integer)                     returns CustomerODHLItemResult;

    action   getCustomerHLKPIs(salesGroup : String,
                               kpiType : String,
                               columnHeader : String,
                               rowHeader : String,
                               townName : String,
                               customerCode : String,
                               customerName : String,
                               productCategory : String,
                               productGroup : String,
                               sortOrder : String,
                               sortColumn : String,
                               topRec : Integer,
                               skipRec : Integer)                       returns CustomerHLKPIResult;

    // Customer KPIs
    function getCustomerUpcomingODKPIs(salesGroup : String,
                                       customerCode : String,
                                       customerName : String)           returns array of CollectionKPIResult;

    function getCustomerCollectionKPIs(salesGroup : String,
                                       customerCode : String,
                                       customerName : String)           returns array of CollectionKPIResult;

    function getCustomerValueKPIs(salesGroup : String,
                                  customerCode : String,
                                  customerName : String)                returns array of SaleValueKPIResult;

    function getCustomerVolumeKPIs(salesGroup : String,
                                   customerCode : String,
                                   customerName : String)               returns array of SaleValueKPIResult;

    function getCustomerParticipationKPIs(salesGroup : String,
                                          customerCode : String,
                                          customerName : String)        returns array of CollectionKPIResult;

    function getCustomerFocusProductKPIs(salesGroup : String,
                                         customerCode : String,
                                         customerName : String)         returns array of CustomerFocusProductKPIResult;

    function getCustomerCNEarnedKPIs(salesGroup : String,
                                     customerCode : String,
                                     customerName : String)             returns array of CollectionKPIResult;

    function getCustomerSchemeQualificationKPIs(salesGroup : String,
                                                customerCode : String,
                                                customerName : String)  returns array of CustomerSchemeQualificationKPIResult;

    function getCustomerOSODKPIs(salesGroup : String,
                                 customerCode : String,
                                 customerName : String)                 returns array of OSODKPIResult;

    function getCustomerVisitsKPIs(salesGroup : String,
                                   customerCode : String,
                                   customerName : String)               returns array of TotalVisitsKPIResult;

    function getCustomerDetails(customerCode : String,
                                dateType : String,
                                startDate : String,
                                endDate : String)                       returns CustomerDetailsResult;

    function getAllCustomerListKPI(salesGroup : String,
                                   customerCode : String,
                                   sortOrder : String,
                                   sortColumn : String,
                                   topRec : Integer,
                                   skipRec : Integer)                   returns AllCustomerListKPIResult;

    // Product KPIs
    function getProductCategoryGroupList(salesGroup : String)           returns array of ProductCategoryGroupListResult;

    function getProductTotalKPIs(salesGroup : String,
                                 productCategory : String,
                                 productGroup : String)                 returns ProductTotalKPIResult;

    function getProductKPIs(salesGroup : String,
                            productCategory : String,
                            productGroup : String)                      returns array of ProductKPIResult;

    // Customer Product KPIs
    function getCustomerProductValueKPIs(salesGroup : String,
                                         customerCode : String,
                                         productCategory : String,
                                         productGroup : String)         returns array of SaleValueKPIResult;

    function getCustomerProductVolumeKPIs(salesGroup : String,
                                          customerCode : String,
                                          productCategory : String,
                                          productGroup : String)        returns array of SaleValueKPIResult;

    function getCustomerProductParticipationKPIs(salesGroup : String,
                                                 customerCode : String,
                                                 productCategory : String,
                                                 productGroup : String) returns array of CustomerProductParticipationKPIResult;
}
