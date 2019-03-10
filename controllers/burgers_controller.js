var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");



router.get("/", (req,res) => {
    burger.all((data) =>{

        var hbsObject = {
            burger: data

        };
        console.log(hbsObject);

        res.render("index", hbsObject);

    });
});

router.post("/api/burgers", (req,res) => {
    burger.create(["burger_name"], [req.body.name], (result) => {
        res.json({id: result.insertId});
    });
});

router.put("/api/burgers/:id", (req,res) => {
    var condition = "id = " + req.params.id;
    console.log("this is out condition" + condition);

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
              // If no rows were changed, then the ID must not exist, so 404
              return res.status(404).end();
            }
            res.status(200).end();
      
          }

    );    
});

// Export routes for server.js to use.
module.exports = router;