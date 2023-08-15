const express = require("express");

const auth = express.Router();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  CLIENT_SECRET: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile", profile);
  done(null, profile);
}

auth.use(passport.initialize());
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

auth.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

auth.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("Google called us back!");
  }
);

auth.get("/failure", (req, res) => {
  return res.send("Failed to log in!");
});

auth.get("/logout", (req, res) => {});

auth.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your secret is 1234");
});

module.exports = auth;
