exports.formatASMUserListData = (output) => {
    const usersList = output.results?.length ? output.results : [];
    const processedUsersList = usersList
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
        USERS: processedUsersList,
        TOTAL_COUNT: processedUsersList.length || 0
    };
    return outObj;
}



