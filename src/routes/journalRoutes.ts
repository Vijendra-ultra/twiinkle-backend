const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");
const express = require("express");
const router = express.Router();

import type { Request, Response } from "express";

router.post("/", verifySession(), async (req: Request, res: Response) => {
  const userId: string = (req as any).session.getUserId();
  const {
    title,
    journalContent,
    date,
    iv,
  }: {
    title: string | null;
    journalContent: string;
    date: string | null;
    iv: string;
  } = req.body;

  if (
    typeof date !== "string" ||
    typeof iv !== "string" ||
    typeof journalContent !== "string" ||
    (title !== null && typeof title !== "string") ||
    date.trim().length === 0 ||
    iv.trim().length === 0 ||
    journalContent.trim().length === 0 ||
    title?.trim().length === 0
  ) {
    return res.status(400).json({ message: "Broken data" });
  }

  if (
    journalContent.length > 2000 ||
    (typeof title === "string" && title.length > 200)
  ) {
    return res.status(400).json({ message: "Data too long" });
  }
  const today = new Date().toISOString().split("T")[0];
  if (date !== today) {
    return res
      .status(400)
      .json({ message: "Journal entries can only be created for today." });
  }

  res.json({
    message: "Journals saved successfully.",
  });
});
