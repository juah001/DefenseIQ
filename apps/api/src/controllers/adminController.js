import { prisma } from "../lib/db";
import { logAuditEvent } from "../lib/auditLogger.js";

export const updateUserRole = async (req, res) => {
  try {
    const adminUserId = req.user.userId;
    const targetUserId = parseInt(req.params.id, 10);
    const { role } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: { role },
    });

    await logAuditEvent({
      userId: adminUserId,
      action: "UPDATE_USER_ROLE",
      metadata: {
        targetUserId,
        newRole: role,
      },
    });

    res.json({
      message: "User role updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role" });
  }
};