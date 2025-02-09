require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const querystring = require("querystring");
const axios = require("axios");

const router = express.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.SECRET_ID;
const redirect_uri = process.env.REDIRECT_URI;
const auth_endpoint = process.env.AUTH_ENDPOINT;
const response_type = process.env.RESPONSE_TYPE;
const scope = process.env.SCOPE;

router.get("/login", (req, res) => {
  const state = Math.random().toString(36).substring(2, 15);
  req.session.state = state; 

  const authQuery = querystring.stringify({
    response_type,
    client_id,
    scope,
    redirect_uri,
    state, 
  });

  const authUrl = `${auth_endpoint}?${authQuery}`;
  console.log("\n🔹 Redirecting to Spotify Login:");
  console.log("Stored state (before redirect):", state);
  console.log("Redirect URL:", authUrl);

  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  console.log("\n🔹 Received Spotify Callback Request:");
  console.log("Full request query:", req.query);

  const code = req.query.code || null;
  const returnedState = req.query.state || null;
  const storedState = req.session.state; 

  console.log("Stored state:", storedState);
  console.log("Returned state:", returnedState);

  if (!returnedState || returnedState !== storedState) {
    console.error("Error: State Mismatch Detected!");
    return res.redirect(
      `http://localhost:3000/#${querystring.stringify({ error: "state_mismatch" })}`
    );
  }

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    data: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token } = response.data;

    console.log("Successfully obtained tokens from Spotify!");
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);

    res.redirect(
      `http://localhost:3000/dashboard#${querystring.stringify({
        access_token,
        refresh_token,
      })}`
    );
  } catch (error) {
    console.error("Error exchanging code for token:", error.response ? error.response.data : error);
    res.redirect(
      `http://localhost:3000/#${querystring.stringify({ error: "token_error" })}`
    );
  }
});

module.exports = router;
