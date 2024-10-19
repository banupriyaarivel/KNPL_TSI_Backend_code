exports.formatDepotByRSMData = (output) => {
    const depotList = output.results?.length ? output.results : [];
    const processedUsersList = depotList
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
        DEPOT: processedUsersList,
        TOTAL_COUNT: processedUsersList.length || 0
    };
    return outObj;
}