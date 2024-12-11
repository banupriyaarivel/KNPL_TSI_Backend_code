// exports.formatTSIUserBySalesOfficeListData = (output) => {
//     const usersList = output?.results0?.length ? output.results0 : [];
//     const totalCount =
//         output?.results1?.length ? output.results1[0].TOTAL_COUNT : 0;
//     const outObj = {
//         USERS: usersList,
//         TOTAL_COUNT: totalCount
//     };
//     return outObj;
// };

exports.formatTSIUserBySalesOfficeListData = (output) => {
    const usersList = output?.results0?.length ? output.results0.map(user => {
        const [FIRST_NAME, ...LAST_NAME_PARTS] = user.TSI_NAME.split(' ');
        const LAST_NAME = LAST_NAME_PARTS.join(' ') || '';
        return {
            ...user,
            FIRST_NAME,
            LAST_NAME
        };
    }) : [];
    
    const totalCount =
        output?.results1?.length ? output.results1[0].TOTAL_COUNT : 0;
    
    const outObj = {
        USERS: usersList,
        TOTAL_COUNT: totalCount
    };
    
    return outObj;
};
