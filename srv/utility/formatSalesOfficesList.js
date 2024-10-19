exports.formatSalesOfficesListData = (output) => {
    const salesOfficeList = output.results?.length ? output.results : [];
    const processedUsersList = salesOfficeList
    .map(user => {
        if (user.SALES_GROUP) {
            user.SALES_GROUP = user.SALES_GROUP
                .split(',')                             
                .filter(value => /^[0-9]+$/.test(value)) 
                .filter(value => value !== '777')        
                .join(',');                              
        }
        return user; 
    })
    .filter(user => user.SALES_GROUP); 
    const outObj = {
        SALES_OFFICES: processedUsersList,
        TOTAL_COUNT: processedUsersList.length || 0
    };
    return outObj;
}