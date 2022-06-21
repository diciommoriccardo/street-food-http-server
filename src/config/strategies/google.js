const userController = require("../../controllers/Users.controller.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE } = require('../config.js');

  module.exports = google = new GoogleStrategy(
    {
      callbackURL: 'http://localhost:5000/oauth2/redirect/google',
      clientID: GOOGLE.CLIENT,
      clientSecret: GOOGLE.SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
     console.log("user profile is: ", profile)
     const id = profile.id;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;
      const source = "google";


      const currentUser = await userController.getByEmail({ email })

      if (!currentUser) {
        const newUser = await userController.create({
          id,
          email,
          firstName,
          lastName,
          profilePhoto
        })
        return done(null, newUser);
    }

      if (currentUser.source != "google") {
        return done(null, false, { message: `You have previously signed up with a different signin method` });
      }

      return done(null, currentUser);
    }
  );