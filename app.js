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
app.get("/property", (req, res) => {
    database('property')
        .select()
        .then((property) => {
            res.json(property);
        })
        .catch((err) => {
            res.send(err);
        });
});


//Get a specific property
app.get("/property/:id", (req, res) => {
    const id = req.params.id;
    if (checkInteger(id)) {
        database('property')
            .select()
            .where('id', id)
            .first()
            .then((property) => {
                if (property) {
                    res.json(property);
                } else {
                    res.status(404);
                    res.send(`404: Property with ID "${id}" does not exist.`);
                }
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        res.send(`"${id}" is not an integer.`)
    }

});


//Post a new property
app.post("/property", (req, res) => {
    database('property')
        .insert({
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            unit: req.body.unit,
            rent: req.body.rent
        }, 'id')
        .then((ids) => {
            const thisId = ids[0];
            res.json(thisId);
        })
        .catch((err) => {
            res.send(err);
        });
});

//Update a specific property
app.put("/property/:id", (req, res) => {
    const id = req.params.id;
    if (checkInteger(id)) {
        database('property')
            .select()
            .where('id', id)
            .first()
            .then((property) => {
                if (property) {
                    const bodyObj = req.body;
                    database('property')
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
                    res.send(`404: Property with ID "${id}" does not exist.`);
                }
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        res.send(`"${id}" is not an integer.`);
    }
});

//Delete a specific property
app.delete("/property/:id", (req, res) => {
    const id = req.params.id;
    if (checkInteger(id)) {
        database('property')
            .select()
            .where('id', id)
            .then((property) => {
                if (property.length > 0) {
                    database('property')
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
                    res.send(`404: Property with ID "${id}" does not exist.`);
                }
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        res.send(`"${id}" is not an integer.`);
    }
});




function checkInteger(value) {
    let result = false;
    result = /^\d*$/.test(value);
    return result;
}
