/* eslint-disable import/no-anonymous-default-export */
import Redis from "ioredis";
const redis = new Redis({
  host: "redis-19512.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  username: "default",
  port: "19512",
  password: "iJ2O52uIxnSOkGr5UUtb3MWqF8f3U8gE"
});
export default async (req, res) => {
  if (req.method === "POST") {
    const { code, url } = req.body;
    const data = await redis.set(code, url);
    return res.status(200).json({ data, status: "success" });
  }
  return res.status(404).json("Error");
};
