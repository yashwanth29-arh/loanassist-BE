const express = require("express");
const router = express.Router();
const mysql = require("mysql");
// const { createPool } = require("mysql");
const XLSX = require("xlsx");
const XlsxPopulate = require("xlsx-populate");

// MySQL Connection
const db = mysql.createConnection({
  host: "103.191.208.227",
  user: "rxbvhfbl_loanassist",
  password: "]CY$8x(5d]LW",
  database: "rxbvhfbl_loanassist_Db",
  conectionLimit: 10,
  port: 3306,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

// Save contact form data
router.post("/contacts", (req, res) => {
  const { Fullname, Contact_Number, Email, Message } = req.body;
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql =
    "INSERT INTO contacts_form (Fullname,Contact_Number,Email, Message,Date) VALUES (?, ?, ?,?,?)";
  db.query(
    sql,
    [Fullname, Contact_Number, Email, Message, currentDate],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error saving contact form data" });
      } else {
        res
          .status(200)
          .json({ message: "Contact form data sent successfully" });
      }
    }
  );
});

router.get("/contacts", (req, res) => {
  const sql = "SELECT * FROM contacts_form";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error fetching contact form data" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Download contact details as Excel file
// router.get("/contacts/download", (req, res) => {
//   const sql = "SELECT * FROM contacts_form";
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.status(500).json({ error: "Error fetching contact details" });
//     } else {
//       const contacts = result;
//       const ws = XLSX.utils.json_to_sheet(contacts);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Contacts");
//       const filePath = "contacts.xlsx";
//       XLSX.writeFile(wb, filePath);
//       res.download(filePath);
//     }
//   });
// });

router.get("/contacts/download", (req, res) => {
  const sql = "SELECT * FROM contacts_form";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error fetching contact details" });
    } else {
      const contacts = result;
      const ws = XLSX.utils.json_to_sheet(contacts);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contacts");

      // Create a temporary file path
      const filePath = "contacts.xlsx";

      // Write the workbook to the temporary file path
      XLSX.writeFile(wb, filePath);

      // Open the workbook with xlsx-populate to apply password protection
      XlsxPopulate.fromFileAsync(filePath)
        .then((workbook) => {
          // Set password to protect the workbook
          workbook.toFileAsync(filePath, { password: "123" }).then(() => {
            // Send the protected file as a download
            res.download(filePath, "contacts.xlsx", (err) => {
              // Cleanup: remove the temporary file after download
              if (!err) {
                fs.unlinkSync(filePath);
              }
            });
          });
        })
        .catch((err) => {
          console.error("Error while applying password protection:", err);
          res.status(500).json({ error: "Error applying password protection" });
        });
    }
  });
});

// Save apply now form data
router.post("/apply", (req, res) => {
  const {
    Fullname,
    Contact_Number,
    Email,
    Monthly_Salary,
    Credit_Score,
    Over_Due,
  } = req.body;
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql =
    "INSERT INTO apply_now (Fullname, Contact_Number, Email, Monthly_Salary, Credit_Score,Over_Due,Date) VALUES (?, ?, ?,?,?,?,?)";
  db.query(
    sql,
    [
      Fullname,
      Contact_Number,
      Email,
      Monthly_Salary,
      Credit_Score,
      Over_Due,
      currentDate,
    ],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Error submitting application form! Try again." });
      } else {
        res
          .status(200)
          .json({ message: "Application form submitted successfully" });
      }
    }
  );
});

router.get("/apply", (req, res) => {
  const sql = "SELECT * FROM apply_now";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error fetching application form data" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Download contact details as Excel file
router.get("/apply/download", (req, res) => {
  const sql = "SELECT * FROM apply_now";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error fetching application details" });
    } else {
      const applications = result;
      const ws = XLSX.utils.json_to_sheet(applications);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "applications");
      const filePath = "applications.xlsx";
      XLSX.writeFile(wb, filePath);
      res.download(filePath);
    }
  });
});

module.exports = router;
