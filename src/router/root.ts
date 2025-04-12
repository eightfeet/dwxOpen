import express from "express";
import wechat from "../lib/wechat";
const router = express.Router();

router.get("/", async (req, res) => {
  res.send('Welcome to Dawenxiart');
});

export default router;
