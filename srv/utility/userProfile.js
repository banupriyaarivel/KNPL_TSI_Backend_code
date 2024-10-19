exports.formatUserProfileData = (output) => {
    const outObj = output.results?.length ? output.results[0] : {};
    if (outObj.SALES_GROUP) {
        outObj.SALES_GROUP = outObj.SALES_GROUP
            .split(',')                             
            .filter(value => /^[0-9]+$/.test(value)) 
            .filter(value => value !== '777')        
            .join(',');                              
    }
    return outObj;
}


