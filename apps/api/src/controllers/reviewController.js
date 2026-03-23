import { prisma } from "../lib/db";
import { logAuditEvent } from "../lib/auditLogger.js";

export const deleteReview = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id, 10);
    const userId = req.user.userId;

    await prisma.review.delete({
      where: { id: reviewId },
    });

    await logAuditEvent({
      userId,
      action: "DELETE_REVIEW",
      metadata: {
        reviewId,
      },
    });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};