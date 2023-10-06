const express = require("express");
const apiController = require("../controllers/api");
const router = express.Router();

// GET ALL USERS
router.get("/", apiController.getUsers)

// GET USER BY ID
router.get("/:id", apiController.getUser)

// GET ALL TRANSACTIONS
router.get("/transactions", apiController.getTransactions)

// GET TRANSACTION BY ID
// router.get("/transactions/:id", apiController.getTransactionById)

// MAKE A TRANSACTION
router.post("/transactions", apiController.postTransaction)


module.exports = router;

