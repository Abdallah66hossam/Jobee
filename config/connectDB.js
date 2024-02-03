import mongoose from "mongoose";

export const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connecting to db");
    })
    .catch((err) => {
      console.log(err);
    });
};
