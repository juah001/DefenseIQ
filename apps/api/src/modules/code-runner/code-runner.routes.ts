import { Router } from "express";

export const codeRunnerRouter = Router();

codeRunnerRouter.post("/run", (req, res) => {
  const { language = "javascript", code = "" } = req.body;

  res.json({
    message: "Secure sandbox scaffold only",
    language,
    output: `Received ${language} code (${String(code).length} chars). Integrate an isolated Docker executor here.`,
    limits: {
      cpu: "0.5",
      memory: "128m",
      network: "none",
      timeoutMs: 3000
    }
  });
});
