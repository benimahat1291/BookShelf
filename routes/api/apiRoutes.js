var path = require("path");
const db = require("../../models");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../../models");
module.exports = function (app) {
  /////////////////////////
  // Sign Up - Original Users Table //
  /////////////////////////
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      zipcode: req.body.zipcode,
      username: req.body.username,
      password: req.body.password
    }).then(function () {
      res.redirect("/user/" + req.body.username)
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });

  app.post("/api/thirdtable", function (req, res) {
    console.log(req.body);
    db.login.create({
      username: req.body.username,
      password: req.body.password,
      login: false
    }).then(function () {
      res.redirect("/user/" + req.body.username)
    }).catch(function (err) {
      res.status(401).json(err);
    });
  });







  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
  });

  /////////////////////////
  // Login 1/2 - PROCEED TO USER PROFILE PAGE //
  /////////////////////////

  app.post("/api/login", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then((dbUser) => {
      res.json(dbUser)
    })
  })


  /////////////////////////
  // Login 2/2 - UPDATE BOOLEAN VALUE IN LOGIN TABLE //
  /////////////////////////

  app.post("/api/authenticate/", function (req, res) {
    db.login.update({ login: true }, {
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then((dblogin) => {
      res.json(dblogin)
      console.log(dblogin);
    })
  })

  /////////////////////////
  // Add Book Post Route //
  /////////////////////////

  app.post("/api/books", function (req, res) {
    console.log("ISBN POST:" + req.body.isbn)
    console.log("TITLE POST:" + req.body.title)
    console.log("OWNER ID:" + req.body.owner_id)
    ////////////////////////////
    db.Books.create({
      isbn: req.body.isbn,
      title: req.body.title,
      owner_id: req.body.owner_id,
      lender_id: null,
      on_loan: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function () {
      //REDIRECT TO USER'S PAGE
      // res.redirect("/user/" + req.body.owner_name);
    })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });


  app.put("/api/books", function (req, res) {
    ////////////////////////////
    db.User.findOne({ where: { username: req.body.owner_name } }).then(function (dbUser) {
      // console.log(dbUser);
      console.log("OLD ISBN ARRAY : " + JSON.parse(dbUser.dataValues.books_owned))
      let userBookArray = JSON.parse(dbUser.dataValues.books_owned);
      let newIsbn = req.body.isbn;
      userBookArray.push(newIsbn);
      console.log("New ISBN ARRAY :" + userBookArray)

      newUserArray = JSON.stringify(userBookArray)

      db.User.update({ books_owned: newUserArray },
        {
          where: {
            username: req.body.owner_name
          }
        })
    }).then(function (dbUser) {
      res.json(dbUser);
    })

  })
  /////////////////////////
  // Check Availability //
  /////////////////////////

  app.get("/api/availability/:isbn", function (req, res) {
    var isbn = req.params.isbn
    db.Books.findAll({ where: { isbn: isbn } }).then(function (dbBooks) {
      res.json(dbBooks)
    })
    // sequelize.query("SELECT books.isbn, books.title, books.on_loan, users.username, users.zipcode, users.email FROM library.books LEFT JOIN users ON books.owner_id = users.user_id", function(err,res){
    //   if (err) throw err;
    //   return res
    // })
  })

  app.get("/api/user_data/:user_id", function (req, res) {
    var user_id = req.params.user_id
    db.User.findOne({ where: { username: user_id } }).then(function (dbUsers) {
      res.json(dbUsers)
    })
  })
  app.post("/api/login", function (req, res) {
    res.json("/user/profile");
  });
  app.get("/api/user/:username", (req, res) => {
    console.log("user lookup")
    db.User.username({
      where: { username: req.params.username }
    });
  });


  /////////////////////////
  // Add Book Post Route //
  /////////////////////////
  app.post("/api/books", function (req, res) {
    console.log("ISBN POST:" + req.body.isbn)
    console.log("TITLE POST:" + req.body.title)
    console.log("OWNER ID:" + req.body.owner_id)
    ////////////////////////////
    db.Books.create({
      isbn: req.body.isbn,
      title: req.body.title,
      owner_id: req.body.owner_id,
      lender_id: null,
      on_loan: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function () {
      //REDIRECT TO USER'S PAGE
      res.redirect("/user/" + req.body.owner_name);
    })
      .catch(function (err) {
        // res.status(401).json(err);
      });
  });

}



