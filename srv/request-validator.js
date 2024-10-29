const { PROCEDURES, HTTP_CODE, API_MESSAGES } = require('./constant/constants');
const { formatSalesGroupData } = require('./utility/salesGroup');
const { getProcResult } = require('./utility/helper/procResult');
const { getUserInfoByAPIAccess } = require('./utility/getUserInfoByAPIAccess');
const { RoleEnum } = require('./enum/Role');

async function requestValidator(req) {
    const reqObj = req.data;
    const userInfo = req?._.req?.context?.user;
    console.log('reqObj===', reqObj);
    console.log('SSO User===', userInfo);
    if(reqObj && reqObj.salesGroup) {
    //   const response = await getUserInfoByAPIAccess(userInfo.id);
    //    code for debug locally
        let response = {
            "totalResults" : 1 ,
            "resources" : [
                {
                    "emails" :  [ {
                        values : "jagjotsinghbakshi@nerolac.com"
                    }  ] 
                }
            ]
        } 
        if (response && response.totalResults) {
            const actualEmail = response.resources[0]?.emails[0]?.value || '';
            console.log('Actual email===', actualEmail);
            const output = await getProcResult(PROCEDURES.GET_USER_SALES_GROUP_BY_EMAIL, [actualEmail]);
            const result = formatSalesGroupData(output);
            // This validation is applicable for TSI role only
            if (result && result.ROLE_ID === RoleEnum.TSI) {
                if (result && result.SALES_GROUP != reqObj.salesGroup) {
                    return req.reject(HTTP_CODE.UNAUTHORIZED, API_MESSAGES.UNAUTHORIZED);
                }
            }
        }        
    }
}

module.exports = requestValidator;