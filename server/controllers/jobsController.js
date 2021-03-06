// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models"); // Routes

module.exports = {
  // A GET route for scraping the echoJS website
  scrape: function (req, res) {
    // First, we grab the body of the html with request
    axios.get("https://www.indeed.com/jobs?q=junior+web+developer&l=Atlanta%2C+GA").then(function (response) {

      const $ = cheerio.load(response.data);

      $(".result").each(function (i, element) {

        var result = {};

        result.title = $(this)
          .children("h2")
          .text()
          .trim();

        result.company = $(this)
          .children("span.company")
          .text()
          .trim();

        result.location = $(this)
          .children("span.location")
          .text()
          .trim();

        result.description = $(this)
          .children("table")
          .last(".summary")
          .text()
          .trim()
          .split("...")[0];

        result.link = "https://www.indeed.com" + $(this)
          .children("h2")
          .children("a")
          .attr("href");


        // Create a new Job using the `result` object built from scraping
        db.Job.create(result)
          .then(function (dbJob) {
            // View the added result in the console
            console.log(dbJob);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });

      // If we were able to successfully scrape and save an Job, send a message to the client
      res.send("Scrape Complete");
    });
  },

  // Route for getting all Jobs from the db
  jobs: function (req, res) {
    // Grab every document in the Jobs collection
    db.Job.find({})
      .then(function (dbJob) {
        // If we were able to successfully find Jobs, send them back to the client
        res.json(dbJob);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },

  // Route for grabbing a specific Job by id, populate it with it's note
  findeById: function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Job.findOne({
        _id: req.params.id
      })
      // ..and populate all of the notes associated with it
      .populate("notes")
      .then(function (dbJob) {
        // If we were able to successfully find an Job with the given id, send it back to the client
        res.json(dbJob);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },

 //===================================================
  // Functions to Populate the Portfolio Job Notes  

  note: function (req, res) {
    db.Note
      .create(req.body.note)
      .then(dbNote => {
          db.Job
            .findByIdAndUpdate(req.body.jobId, {
                $push: {
                  notes: dbNote._id
                }
             })
          .then(dbModel => {
            res.json(dbModel)})
          .catch(
            err => {
              console.log(err);
              res.status(422).json(err)})})
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
    },


  //===================================================
  // Function to save the Portfolio job  

  addToPortfolio: function (req, res) {
    console.log(req.body);
    db.User
      .findByIdAndUpdate(req.body.userId, {
        $push: {
          jobs: req.body.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

//===================================================
  // Function to Populate the Portfolio Jobs Table  

  findPortfolio: function (req, res) {
    db.User
      .findById(req.params.userId)
      .populate("jobs")
      .then(
        user => {
          let userJobs = user.jobs;
          db.Technology
            .findById(req.params.id)
            .populate("jobs")
            .then(technology => {
               let result = (userJobs.filter(userJob => {
                    let comparison = technology.jobs.find(technologyJob => userJob._id.equals(technologyJob._id));
                    return comparison;
                  }));
              res.json(result);
            })
            .catch(err => {
              console.log( "Porfolio Job error:", err );
              res.status(422).json(err)
            });
        })
      .catch(err => {
        console.log( "User error:", err );
        res.status(422).json(err)
      });
  },

}