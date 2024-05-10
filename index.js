"use strict";

const cloudflare = require("cloudflare-express");
const express = require("express");
const favicon = require("express-favicon");
const app = express();
const path = require("path");

const port = process.env.PORT || "8000";

app.use(cloudflare.restore());
app.use(express.json());
app.use(favicon(__dirname + "/views/favicon.ico"));

// Set security headers
app.use((req, res, next) => {
  // Content-Security-Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';" +
      "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://app-analytics.net.altan.me;" +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
      "connect-src 'self' https://app-analytics.net.altan.me;" +
      "img-src 'self';" +
      "font-src 'self' https://fonts.gstatic.com;" // Add font-src directive
    // Add other directives as needed
  );
  // X-Frame-Options
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Referrer-Policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// App Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", "loopback, linklocal, uniquelocal");

//Routes

//Return IP on index page
app.get("/", (req, res) => {
  let ip = req.cf_ip;
  // let ip = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"];
  // let ip = req.socket.remoteAddress;
  res.render("index", { title: "YetAnotherWhatsMyIP", message: `${ip}` });
});

// Serve security.txt
app.use(
  "/.well-known",
  express.static(path.join(__dirname, "public", ".well-known"))
);

// 404
app.use(function (req, res, next) {
  res.status(404).send(res.render("404", { title: "404" }));
});

// 500
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(res.render("500", { title: "500" }));
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
