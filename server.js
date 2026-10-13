require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many enquiries from this network. Please try again later." }
});

app.use(express.static(publicDir));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "brand-studio-api" });
});

app.post("/api/enquiries", enquiryLimiter, (req, res) => {
  const { name, email, business, service, message, website } = req.body || {};

  // Honeypot field: normal visitors never see/fill this.
  if (website) return res.status(200).json({ message: "Thanks — your enquiry has been received." });

  const clean = (value, max = 200) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

  const enquiry = {
    name: clean(name, 100),
    email: clean(email, 160),
    business: clean(business, 120),
    service: clean(service, 80),
    message: clean(message, 2000)
  };

  if (!enquiry.name || !enquiry.email || !enquiry.message) {
    return res.status(400).json({ error: "Please enter your name, email, and project details." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(enquiry.email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // Starter behaviour: log enquiries on the server.
  // Before launch, replace this with email delivery or a database.
  console.log("\\n--- NEW WEBSITE ENQUIRY ---");
  console.log(JSON.stringify({ ...enquiry, receivedAt: new Date().toISOString() }, null, 2));
  console.log("---------------------------\\n");

  return res.status(201).json({
    message: "Thanks for reaching out. Your enquiry has been submitted."
  });
});

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API endpoint not found." });
  }
  res.sendFile(path.join(publicDir, "index.html"), err => err && next(err));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

app.listen(PORT, () => {
  console.log(`Brand Studio website running at http://localhost:${PORT}`);
});
