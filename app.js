const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database_connection');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
const port = (process.env.PORT || 3000);
app.listen(port, () => {
    console.log(`Up and running on port ${port}!`);
});

//Get all properties
app.get("/:table", (req, res) => {
    const textEntered = req.params.table;
    const tableType = getTableType(textEntered);
    if (tableType) {
        database(tableType)
            .select()
            .then((tableType) => {
                res.json(tableType);
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        sendError(textEntered, res);
    }
});


//Get a specific property
app.get("/:table/:id", (req, res) => {
    const textEntered = req.params.table;
    const tableType = getTableType(textEntered);
    if (tableType) {
        const id = req.params.id;
        if (checkInteger(id)) {
            database(tableType)
                .select()
                .where('id', id)
                .first()
                .then((tableType) => {
                    if (tableType) {
                        res.json(tableType);
                    } else {
                        res.status(404);
                        res.send(`404: ${tableType} with ID "${id}" does not exist.`);
                    }
                })
                .catch((err) => {
                    res.send(err);
                });
        } else {
            res.send(`"${id}" is not an integer.`)
        }
    } else {
        sendError(textEntered, res);
    }


});


//Post a new property
app.post("/:table", (req, res) => {
    const textEntered = req.params.table;
    const tableType = getTableType(textEntered);
    if (tableType) {
        const postBody = returnPOSTBody(tableType, req);
        database(tableType)
            .insert(postBody, 'id')
            .then((ids) => {
                const thisId = ids[0];
                res.json(thisId);
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        sendError(textEntered, res);
    }
});

//Update a specific property
app.put("/:table/:id", (req, res) => {
    const textEntered = req.params.table;
    const tableType = getTableType(textEntered);
    if (tableType) {
        const id = req.params.id;
        if (checkInteger(id)) {
            database(tableType)
                .select()
                .where('id', id)
                .first()
                .then((result) => {
                    if (result) {
                        const bodyObj = req.body;
                        database(tableType)
                            .update(bodyObj, '*')
                            .where('id', id)
                            .then((result) => {
                                res.json(result);
                            })
                            .catch((err) => {
                                res.send(err);
                            });
                    } else {
                        res.status(404);
                        res.send(`404: ${tableType} with ID "${id}" does not exist.`);
                    }
                })
                .catch((err) => {
                    res.send(err);
                });
        } else {
            res.send(`"${id}" is not an integer.`);
        }
    } else {
        sendError(textEntered, res);
    }

});

//Delete a specific property
app.delete("/:table/:id", (req, res) => {
    const textEntered = req.params.table;
    const tableType = getTableType(textEntered);
    if (tableType) {
        const id = req.params.id;
        if (checkInteger(id)) {
            database(tableType)
                .select()
                .where('id', id)
                .first()
                .then((result) => {
                    if (result) {
                        database(tableType)
                            .del()
                            .where('id', id)
                            .then((result) => {
                                res.status(200);
                                res.send(`Deleted item with id ${id} successfully.`);
                            })
                            .catch((err) => {
                                res.send(err);
                            });
                    } else {
                        res.status(404);
                        res.send(`404: ${tableType} with ID "${id}" does not exist.`);
                    }
                })
                .catch((err) => {
                    res.send(err);
                });
        } else {
            res.send(`"${id}" is not an integer.`);
        }
    } else {
        sendError(textEntered, res);
    }

});

function getTableType(parameter) {
    switch (parameter) {
        case 'property':
            return 'property';
            break;

        case 'tenant':
            return 'tenant';
            break;

        case 'payment':
            return 'payment';
            break;

        default:
            return null;
            break;
    }
}

function sendError(enteredText, res) {
    res.send(`${enteredText} is not a valid route.`)
}

function checkInteger(value) {
    let result = false;
    result = /^\d*$/.test(value);
    return result;
}

function returnPOSTBody(tableType, req) {
    let returnBody = null;

    switch (tableType) {
        case 'property':
            returnBody = {
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                unit: req.body.unit,
                rent: req.body.rent
            }
            break;

        case 'tenant':
            returnBody = {
                name: req.body.name,
                age: req.body.age,
                property_id: req.body.property_id
            }
            break;

        case 'payment':
            returnBody = {
                date: req.body.date,
                amount: req.body.amount,
                comment: req.body.comment,
                tenant_id: req.body.tenant_id
            }
            break;

        default:
            returnBody = {};
            break;
    }
    return returnBody;
}


// const textEntered = req.params.table;
// const tableType = getTableType(textEntered);
// if (tableType) {
//
// } else {
//     sendError(textEntered, res);
// }
