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
    let si = key.indexOf(specialC); // doesn't work well if underscore is in index 1
    while (si > -1) {
        key = key.slice(0, si) + key.slice(si + 1, si + 2).toUpperCase() + key.slice(si + 2);

        si = key.indexOf(specialC); // check for multiple field name (such_as_this);
    }

    return key;
}



test = {
    "err": 0,
    "description": "OK",
    "data": {
        "date_scope": [{
            "min_date": "2014-06-01 00:00:00",
            "max_date": "2018-08-25 08:42:27"
        }],
        "eras": [{
            "id": "1",
            "name": "The beginning",
            "start_date": "2018-02-24 00:00:00",
            "end_date": "2018-05-31 00:00:00",
            "tags": ["Space travel", "funny"]
        }, {
            "id": "2",
            "name": "Hot summer",
            "start_date": "2018-06-01 00:00:00",
            "end_date": "",
            "tags": ["Other", "relationship", "trip"]
        }, {
            "id": "3",
            "name": "Madrid",
            "start_date": "2018-06-25 00:00:00",
            "end_date": "2018-07-01 00:00:00",
            "tags": []
        }, {
            "id": "4",
            "name": "Thailand diving",
            "start_date": "2014-06-01 00:00:00",
            "end_date": "2015-05-31 00:00:00",
            "tags": []
        }]
    }
}