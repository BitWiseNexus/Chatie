import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "tom.cat@example.com",
    name: "Tom Cat",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Tom",
  },
  {
    email: "jerry.mouse@example.com",
    name: "Jerry Mouse",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jerry",
  },
  {
    email: "donald.duck@example.com",
    name: "Donald Duck",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Donald",
  },
  {
    email: "scooby.doo@example.com",
    name: "Scooby Doo",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Scooby",
  },
  {
    email: "ben.tennyson@example.com",
    name: "Ben Tennyson",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ben10",
  },
  {
    email: "perry.platypus@example.com",
    name: "Perry Platypus",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Perry",
  },
  {
    email: "phineas.flynn@example.com",
    name: "Phineas Flynn",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Phineas",
  },
  {
    email: "ferb.fletcher@example.com",
    name: "Ferb Fletcher",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ferb",
  },
  {
    email: "spongebob.squarepants@example.com",
    name: "SpongeBob SquarePants",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=SpongeBob",
  },
  {
    email: "shinchan.nohara@example.com",
    name: "Shinchan Nohara",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Shinchan",
  },
  {
    email: "doraemon.robot@example.com",
    name: "Doraemon",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Doraemon",
  },
  {
    email: "spiderman.web@example.com",
    name: "Spiderman",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Spiderman",
  },
  {
    email: "hagemaru.maruko@example.com",
    name: "Hagemaru",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Hagemaru",
  },
  {
    email: "nobita.nobi@example.com",
    name: "Nobita Nobi",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Nobita",
  },
  {
    email: "shizuka.minamoto@example.com",
    name: "Shizuka Minamoto",
    password: "123456",
    profilePic: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Shizuka",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Cartoon user database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
