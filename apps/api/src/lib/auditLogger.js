import prisma from "../prisma/client.js";

export async function logAuditEvent({ userId, action, metadata = {} }) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        metadata,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log", error);
  }
}