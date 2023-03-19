import { connect, set } from "mongoose";

export default async function db() {
  set("strictQuery", true)
  await connect(process.env.DATABASE_URL as string).then(() => console.log("db connected")).catch((err) => console.error(err))
}
