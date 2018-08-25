function toCamel(o) {
    var newO, origKey, newKey, value
    if (o instanceof Array) {
        return o.map(value => {
            if (typeof value === "object") {
                value = toCamel(value)
            }
            return value
        });

    } else {
        newO = {}
        for (origKey in o) {
            if (o.hasOwnProperty(origKey)) {
                newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()

                newKey = dealWithSpecials("_", newKey);
                newKey = dealWithSpecials("-", newKey);
                newKey = dealWithSpecials("@", newKey);

                value = o[origKey]
                if (value instanceof Array || (value !== null && value.constructor === Object)) {
                    value = toCamel(value)
                }
                newO[newKey] = value
            }
        }
    }
    return newO
};


function dealWithSpecials(specialC, key) {
    let si = key.indexOf(specialC);
    while (si > -1) {
        key = key.slice(0, si) + key.slice(si + 1, si + 2).toUpperCase() + key.slice(si + 2);

        si = key.indexOf(specialC); // check for multiple field name (such_as_this);
    }

    return key;
}