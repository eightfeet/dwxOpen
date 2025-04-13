import express from "express";
import cors from "cors";

export default function (app: express.Application): void {
  app.use(cors());
}
