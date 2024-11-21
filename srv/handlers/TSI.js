const cds = require('@sap/cds');
const { PROCEDURES, API_NAME, HTTP_CODE,
    API_MESSAGES } = require('../constant/constants');
const { getProcResult } = require('../utility/helper/procResult');
const { formatSalesValueData, formatCustomerSalesValueData } = require('../utility/salesValueKPI');
const { formatActiveDealerData } = require('../utility/activeDealerKPI');
const { formatOSODData, formatCustomerOSODData } = require('../utility/osodKPI');
const { formatNewCCDsData } = require('../utility/newCCDKPI');
const { formatNewNDOData } = require('../utility/newNDOKPI');
const { formatCollectionData, formatCustomerCollectionData } = require('../utility/collectionKPI');
const { formatUpcomingODData, formatCustomerUpcomingODData } = require('../utility/UpcomingODKPI');
const { formatVolumeData, formatCustomerVolumeData } = require('../utility/volumeKPI');
const { formatBudgetData } = require('../utility/budgetKPI');
const { formatBelowThresholdData } = require('../utility/belowThresholdKPI');
const { formatOverallVisitsData, formatCustomerVisitsData } = require('../utility/overallVisitsKPI');
const { formatSiteInfluencerVisitsData } = require('../utility/siteInfluencerVisitsKPI');
const { formatCustomerProspectVisitsData } = require('../utility/customerProspectVisitsKPI');
const { formatMeetsConductedData } = require('../utility/meetsConductedKPI');
const { formatNotVisitedData } = require('../utility/notVisitedKPI');
const { formatYTDTrendsData } = require('../utility/ytdTrendsKPI');
const { formatCustomerHLData } = require('../utility/customerHLKPI');
const { formatCustomerHLODData } = require('../utility/customerHLODKPI');
const { formatLookupListData } = require('../utility/lookup');
const { formatUserProfileData } = require('../utility/userProfile');
const { formatCustomerDetailsData } = require('../utility/customerDetails');
const { formatCustomerParticipationData } = require('../utility/customerParticipationKPI');
const { formatCustomerFocusProductData } = require('../utility/customerFocusProductKPI');
const { formatCustomerCNEarnedData } = require('../utility/customerCNEarnedKPI');
const { formatCustomerSchemeQualificationData } = require('../utility/customerSchemeQualificationKPI');
const { formatAllCustomersListData } = require('../utility/allCustomerList');
const { formatProductTotalData } = require('../utility/productTotalKPI');
const { formatProductCategoryGroupData } = require('../utility/productFilterList');
const { formatCustomerProductValVolData, formatCustomerProductParticipationData } = require('../utility/customerProductKPI');
const { formatProductData } = require('../utility/productKPI');
const { formatDate } = require('../utility/helper/formatDate');
const { getUserInfoByAPIAccess } = require('../utility/getUserInfoByAPIAccess');
const requestValidator = require('../request-validator');

const pragatiService = require('./TSI-Pragati');
const connectService = require('./TSI-DGA');
const incentiveService = require('./TSI-Incentive');
const roleService = require('./TSI-ASMRSM');
const { findIASUser, createIASUser } = require('./TSI-IAS')

module.exports = cds.service.impl(function () {

    // Common Handler for Request Validation
    this.before('*', requestValidator);

    // this.on('getUsers', getUsers);
    // this.on('findUser', async ({data : {
    //     email
    // }}) => {
    //     return await filterIASUsers(email)
    // })


    // this.on('findMyUser', async ({data : {
    //     email
    // }}) => {
    //     return await filterMyIASUsers(email)
    // })

    this.on('createIAS', async ({ data: {
        familyName, givenName, email, phoneNumber, userName, active, password
    } }) => {
        const userExist = await findIASUser(email)

        if(userExist.totalResults === 0){
            const newUser = {
                schemas: [
                    "urn:ietf:params:scim:schemas:core:2.0:User",
                    "urn:ietf:params:scim:schemas:extension:sap:2.0:User",
                    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
                ],
                userName: userName,
                displayName: 'None',
                userType: "Employee",
                password: password,
                name: {
                    familyName: familyName,
                    givenName: givenName
                },
                active: active,
                emails: [
                    {
                        value: email
                    }
                ],
                phoneNumbers: [
                    {
                        value: phoneNumber
                    }
                ],
                "urn:ietf:params:scim:schemas:extension:sap:2.0:User": {
                    mailVerified: true
                }
            };
            
            const response = await createIASUser(newUser);
            if (response.id) {
                return { status: 'Success', message: `User created successfully with this ID ${response.id}` };
            } else {
                return { status: 'Warning', message: response.detail, Scim_Type:response.scimType};
            }
            // console.log(newUser)

        } else {
        return { status: 'Warning', message: 'User allready exist', value: userExist};
        }


    })

    // Summary-Home
    this.on(API_NAME.SALES_VALUES_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.SALES_VALUES_KPI, [salesGroup, null, null]);
            const out = formatSalesValueData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.ACTIVE_DEALER_KPI, async ({
        data: { salesGroup }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.ACTIVE_DEALER_KPI, [salesGroup, null, null]);
            const out = formatActiveDealerData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.OSOD_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.OSOD_KPI, [salesGroup, null, null]);
            const out = formatOSODData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.NEW_CCD_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.NEW_CCD_KPI, [salesGroup]);
            const out = formatNewCCDsData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.NEW_NDO_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.NEW_NDO_KPI, [salesGroup]);
            const out = formatNewNDOData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.UPCOMINGOD_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.UPCOMINGOD_KPI, [salesGroup, null, null]);
            const out = formatUpcomingODData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.COLLECTION_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.COLLECTION_KPI, [salesGroup, null, null]);
            const out = formatCollectionData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.VOLUME_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.VOLUME_KPI, [salesGroup, null, null]);
            const out = formatVolumeData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.BELOW_THRESHOLD_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.BELOW_THRESHOLD_KPI, [salesGroup]);
            const out = formatBelowThresholdData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.BUDGET_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.BUDGET_KPI, [salesGroup]);
            const out = formatBudgetData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.OVERALL_VISITS_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.OVERALL_VISITS_KPI, [salesGroup, null, null]);
            const out = formatOverallVisitsData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.SITE_INFLUENCER_VISITS_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.SITE_INFLUENCER_VISITS_KPI, [salesGroup]);
            const out = formatSiteInfluencerVisitsData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_PROSPECT_VISITS_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_PROSPECT_VISITS_KPI, [salesGroup]);
            const out = formatCustomerProspectVisitsData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.MEETS_CONDUCTED_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = null; //await getProcResult(PROCEDURES.MEETS_CONDUCTED_KPI, [salesGroup]);
            const out = formatMeetsConductedData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.NOT_VISITED_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.NOT_VISITED_KPI, [salesGroup]);
            const out = formatNotVisitedData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.YTD_TRENDS_KPI, async ({ data: { salesGroup } }) => {
        try {
            const output =
                await Promise.all([
                    getProcResult(PROCEDURES.YTD_TRENDS_VALUE_KPI, [salesGroup]),
                    getProcResult(PROCEDURES.YTD_TRENDS_VOLUME_KPI, [salesGroup]),
                    getProcResult(PROCEDURES.YTD_TRENDS_PARTICIPATION_KPI, [salesGroup]),
                    getProcResult(PROCEDURES.YTD_TRENDS_OS_KPI, [salesGroup, 60]),
                    getProcResult(PROCEDURES.YTD_TRENDS_OS_KPI, [salesGroup, 90]),
                    getProcResult(PROCEDURES.YTD_TRENDS_OD_KPI, [salesGroup])
                ]);
            const out = formatYTDTrendsData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_HL_KPI, async ({ data: {
        salesGroup, kpiType, columnHeader,
        rowHeader, townName, customerCode, customerName, productCategory, productGroup,
        sortOrder, sortColumn, topRec, skipRec
    } }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_HL_KPI, [
                salesGroup, kpiType, columnHeader, rowHeader,
                townName && townName.length ? townName : null,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null,
                productCategory && productCategory.length ? productCategory : null,
                productGroup && productGroup.length ? productGroup : null,
                sortOrder && sortOrder.length ? sortOrder : null,
                sortColumn && sortColumn.length ? sortColumn : null,
                topRec, skipRec
            ]);
            const out = formatCustomerHLData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_HL_OD_KPI, async ({ data: {
        salesGroup, kpiType, columnHeader,
        rowHeader, townName, customerCode, customerName, productCategory, productGroup,
        sortOrder, sortColumn, topRec, skipRec
    } }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_HL_KPI, [
                salesGroup, kpiType, columnHeader, rowHeader,
                townName && townName.length ? townName : null,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null,
                productCategory && productCategory.length ? productCategory : null,
                productGroup && productGroup.length ? productGroup : null,
                sortOrder && sortOrder.length ? sortOrder : null,
                sortColumn && sortColumn.length ? sortColumn : null,
                topRec, skipRec
            ]);
            const out = formatCustomerHLODData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });


    // Lookups
    this.on(API_NAME.TOWN_LIST, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.LOOKUP, ['TOWN', salesGroup]);
            const out = formatLookupListData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_LIST, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.LOOKUP, ['CUSTOMER', salesGroup]);
            const out = formatLookupListData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.PRODUCT_CATEGORY_GROUP_LIST, async ({ data: { salesGroup } }) => {
        try {
            const output = await getProcResult(PROCEDURES.PRODUCT_CATEGORY_GROUP_LOOKUP, [
                salesGroup
            ]);
            const out = formatProductCategoryGroupData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    // User Profile
    this.on(API_NAME.USER_PROFILE, async (req) => {
        try {
            let actualEmail = '';
            let firstName = '';
            let lastName = '';
            const userInfo = req?._.req?.context?.user;
            const requestedEmail = req?.data?.email || '';
            console.log('In User profile===', requestedEmail);
            if (userInfo && userInfo.id != requestedEmail) {
                console.log('Received SAP USER ID in SSO===', userInfo.id);
                const response = await getUserInfoByAPIAccess(userInfo.id);
                if (response && response.totalResults) {
                    actualEmail = response.resources[0]?.emails[0]?.value || '';
                    console.log('Actual email===', actualEmail);
                    if (actualEmail != requestedEmail) {
                        return req.reject(HTTP_CODE.UNAUTHORIZED, API_MESSAGES.UNAUTHORIZED);
                    }
                }
            } else {
                actualEmail = userInfo.id;
            }
            firstName = userInfo?.name?.givenName || actualEmail;
            lastName = userInfo?.name?.familyName || '';
            console.log('firstName===', firstName);
            console.log('lastName===', lastName);

            const appVersion = req?.data?.appVersion || '';
            console.log(actualEmail,
                appVersion,
                firstName,
                lastName);
            const output = await getProcResult(PROCEDURES.USER_PROFILE, [
                actualEmail,
                appVersion,
                firstName || '',
                lastName || ''
            ]);
            const out = formatUserProfileData(output);
            console.log("User Profile Response===", out);
            switch (out.ERROR) {
                case 'NO_USER_EMAIL':
                    return req.reject(HTTP_CODE.FORBIDDEN, API_MESSAGES.FORBIDDEN);
                case 'APP_VERSION_MISMATCH':
                    return req.reject(HTTP_CODE.CONFLICT, API_MESSAGES.APP_VERSION_MISMATCH, out.APP_URL);
                default: return out;
            }
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    // Customers
    this.on(API_NAME.CUSTOMER_UPCOMINGOD_KPI, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.UPCOMINGOD_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerUpcomingODData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_COLLECTION_KPI, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.COLLECTION_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerCollectionData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_VALUE_KPI, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.SALES_VALUES_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerSalesValueData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_VOLUME_KPI, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.VOLUME_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerVolumeData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_PARTICIPATION, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.ACTIVE_DEALER_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerParticipationData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_FOCUS_PRODUCT, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_FOCUS_PRODUCT, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerFocusProductData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_CN_EARNED, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_CN_EARNED, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerCNEarnedData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_SCHEME_QUALIFICATION, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_SCHEME_QUALIFICATION, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerSchemeQualificationData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_OSOD_KPI, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.OSOD_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerOSODData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_VISITS_KPI, async ({
        data: {
            salesGroup, customerCode, customerName
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.OVERALL_VISITS_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                customerName && customerName.length ? customerName : null
            ]);
            const out = formatCustomerVisitsData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_DETAILS, async ({
        data: {
            customerCode,
            dateType,
            startDate,
            endDate
        }
    }) => {
        try {
            const formattedStartDate = dateType === 'CUSTOM' ? formatDate(startDate) : null;
            const formattedEndDate = dateType === 'CUSTOM' ? formatDate(endDate) : null;
            const output = await getProcResult(PROCEDURES.CUSTOMER_DETAILS, [
                customerCode,
                dateType || 'MTD', // Default MTD
                formattedStartDate || null,
                formattedEndDate || null
            ]);
            const out = formatCustomerDetailsData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.ALL_CUSTOMER_LIST_KPI, async ({
        data: {
            salesGroup, customerCode, sortOrder, sortColumn, topRec, skipRec
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.ALL_CUSTOMER_LIST_KPI, [
                salesGroup,
                customerCode && customerCode.length ? customerCode : null,
                sortOrder, sortColumn, topRec, skipRec
            ]);
            const out = formatAllCustomersListData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    // Product
    this.on(API_NAME.PRODUCT_TOTAL_KPI, async ({
        data: {
            salesGroup, productCategory, productGroup
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.PRODUCT_TOTAL_KPI, [
                salesGroup,
                productCategory && productCategory.length ? productCategory : null,
                productGroup && productGroup.length ? productGroup : null
            ]);
            const out = formatProductTotalData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.PRODUCT_KPI, async ({
        data: {
            salesGroup, productCategory, productGroup
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.PRODUCT_KPI, [
                salesGroup,
                productCategory && productCategory.length ? productCategory : null,
                productGroup && productGroup.length ? productGroup : null
            ]);
            const apiResults = Object.assign({}, output);
            delete apiResults.outputScalar;
            const out = [];
            for (const propertyVal in apiResults) {
                if (apiResults.hasOwnProperty(propertyVal)) {
                    const searchItem = Object.assign({}, apiResults[propertyVal][0]);
                    out.push(formatProductData(searchItem));
                }
            }
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    // Customer Product KPIs
    this.on(API_NAME.CUSTOMER_PRODUCT_VALUE, async ({
        data: {
            salesGroup, customerCode, productCategory, productGroup
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_PRODUCT_KPI, [
                salesGroup,
                'VALUE',
                customerCode && customerCode.length ? customerCode : null,
                productCategory && productCategory.length ? productCategory : null,
                productGroup && productGroup.length ? productGroup : null
            ]);
            const out = formatCustomerProductValVolData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_PRODUCT_VOLUME, async ({
        data: {
            salesGroup, customerCode, productCategory, productGroup
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_PRODUCT_KPI, [
                salesGroup,
                'VOLUME',
                customerCode && customerCode.length ? customerCode : null,
                productCategory && productCategory.length ? productCategory : null,
                productGroup && productGroup.length ? productGroup : null
            ]);
            const out = formatCustomerProductValVolData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    this.on(API_NAME.CUSTOMER_PRODUCT_PARTICIPATION, async ({
        data: {
            salesGroup, customerCode, productCategory, productGroup
        }
    }) => {
        try {
            const output = await getProcResult(PROCEDURES.CUSTOMER_PRODUCT_KPI, [
                salesGroup,
                'PARTICIPATION',
                customerCode && customerCode.length ? customerCode : null,
                productCategory && productCategory.length ? productCategory : null,
                productGroup && productGroup.length ? productGroup : null
            ]);
            const out = formatCustomerProductParticipationData(output);
            return out;
        } catch (error) {
            console.error(error)
            return false;
        }
    });

    // Incentives
    this.on(API_NAME.INCENTIVE_KPI, incentiveService.getIncentiveKPIs);
    this.on(API_NAME.INCENTIVE_CIRCULAR_KPI, incentiveService.getIncentiveCircularDetails);

    // Pragati KPIs
    this.on(
        API_NAME.PRAGATI_INFLUENCER_LOYALTY_PARTICIPANT_KPI,
        pragatiService.getInfluencerLoyaltyParticipantKPI
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_LIST_KPI, pragatiService.getInfluencerList
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_HL_KPI, pragatiService.getInfluencerHLKPIs
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_SCHEME_KPI, pragatiService.getInfluencerSchemeKPIs
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_DETAIL_KPI, pragatiService.getInfluencerDetailKPIs
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_POINTS_DETAIL_KPI, pragatiService.getInfluencerPointsDetailKPIs
    );
    this.on(
        API_NAME.PRAGATI_PRODUCT_CATEGORY_LIST, pragatiService.getProductCategoryList
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_PURCHASE_VOLUME_KPI, pragatiService.getInfluencerPurchaseVolKPIs
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_ELIGIBLE_SCHEME_KPI, pragatiService.getInfluencerEligibleSchemeKPI
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_SCHEME_DETAIL_KPI, pragatiService.getInfluencerSchemeDetailsKPI
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_EARNINGS_KPI, pragatiService.getInfluencerEarningsKPI
    );
    this.on(
        API_NAME.PRAGATI_INFLUENCER_SCHEME_TARGET_KPI, pragatiService.getInfluencerSchemeTargetKPI
    );

    // DGA
    this.on(
        API_NAME.DGA_BUSINESS_GENERATION_SOURSEWISE_LEADS_KPI,
        connectService.getInfluencerBusinessGenerationKPI
    );
    this.on(
        API_NAME.DGA_BUSINESS_GENERATION_SUMMARY_KPI,
        connectService.getInfluencerBusinessGenerationSummaryKPI
    );
    this.on(API_NAME.DGA_LEADS_KPI, connectService.getInfluencerLeadsKPI);
    this.on(API_NAME.DGA_SITES_KPI, connectService.getInfluencerSitesKPI);

    // Role based support added 
    this.on(API_NAME.ASM_USER_LIST, roleService.getASMUserList);
    this.on(API_NAME.SALES_OFFICES_BY_ASM_RSM_LIST, roleService.getSalesOfficesByASMRSMList);
    this.on(API_NAME.TSI_USERS_BY_SALES_OFFICE_LIST, roleService.getTSIUsersBySalesOfficeList);
    this.on(API_NAME.DEPOT_BY_RSM, roleService.getDepotByRSM);

    // Phase 3 - DGA KPIs
    this.on(API_NAME.DGA_DEALER_LEAD_COUNTS_KPI, connectService.getDGADealerLeadCounts);
    this.on(API_NAME.DGA_TOTAL_MR_VALUE_KPI, connectService.getDGATotalMRValue);
    this.on(API_NAME.DGA_TOTAL_MR_VOLUME_KPI, connectService.getDGATotalMRVolume);
})