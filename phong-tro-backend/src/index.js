require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
const { initCronJobs } = require("./jobs/cron.jobs");

const PORT = process.env.PORT || 3001;

// Sync database only when explicitly requested, then start server
const databaseSync =
  process.env.DB_SYNC === "true"
    ? sequelize.sync({ alter: process.env.DB_SYNC_ALTER === "true" })
    : Promise.resolve();

databaseSync
  .then(() => {
    console.log("✓ Database synced");

    // Initialize cron jobs
    initCronJobs();

    app.listen(PORT, () => {
      console.log(`\n✓ Server is running on port ${PORT}`);
      console.log(`✓ API URL: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("✗ Error syncing database:", err);
    process.exit(1);
  });

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n✓ Shutting down gracefully...");
  sequelize.close();
  process.exit(0);
});
