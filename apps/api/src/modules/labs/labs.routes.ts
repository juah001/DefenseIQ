import { Router } from "express";

export const labsRouter = Router();

const labs = [
  { id: "dvwa-001", title: "DVWA Intro Lab", difficulty: "Beginner", type: "web-security" },
  { id: "soc-logs-001", title: "SOC Log Triage", difficulty: "Intermediate", type: "blue-team" }
];

labsRouter.get("/", (_req, res) => res.json(labs));

labsRouter.post("/start", (req, res) => {
  res.json({
    message: "Lab provisioning scaffold",
    labId: req.body.labId,
    status: "queued",
    note: "Integrate Docker/Kubernetes job creation here."
  });
});
