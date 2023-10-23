const connection = require("../config/connection");
const { User, Notion } = require("../models");
const { userData, notionData } = require("./data.js");

console.log("Beginning Seed");

// Insert data from seed
connection.once("open", async () => {
  // drop databse it is exists for next seed
  let checkUser = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (checkUser.length) {
    await connection.dropCollection("users");
  }

  // Add the user data
  await User.insertMany(userData)
    .then(() => console.log("Users seeded from data.js."))
    .catch((err) => console.error("User data base failed to seed", err));

  // Drop notion data if it exists
  let checkNotion = await connection.db
    .listCollections({ name: "notions" })
    .toArray();
  if (checkNotion.length) {
    await connection.dropCollection("notions");
  }

  // Add the notion data
  await Notion.insertMany(notionData)
    .then(() => console.log("Notions seeded from data.js."))
    .catch((err) => console.error("Notion data base failed to seed", err));

  console.info("Seeding complete!");
  process.exit(0);
});
