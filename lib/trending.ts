import { db } from "@/lib/db";

/**
 * Returns published investment opportunities ordered by a simple
 * recency/engagement-independent trending score.
 *
 * The current Prisma schema does not contain an analytics/metrics
 * model, so trending is based on publication, featured status,
 * image availability, and recency.
 */
export async function calculateTrendinginvestments(limit = 10) {
  const now = new Date();

  const investments = await db.investmentOpportunity.findMany({
    where: {
      published: true,
    },
    include: {
      category: true,
      status: true,
      images: {
        orderBy: {
          ordering: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const scoredInvestments = investments.map((investment) => {
    const ageInDays =
      (now.getTime() - investment.createdAt.getTime()) /
      (1000 * 60 * 60 * 24);

    const recencyScore = Math.max(
      0.2,
      1 / (1 + Math.max(0, ageInDays) * 0.05)
    );

    const featuredScore = investment.featured ? 3 : 0;
    const imageScore = investment.images.length > 0 ? 1 : 0;

    const trendingScore =
      (featuredScore + imageScore + recencyScore) * 1;

    return {
      ...investment,
      trendingScore,
    };
  });

  scoredInvestments.sort(
    (a, b) => b.trendingScore - a.trendingScore
  );

  return scoredInvestments.slice(0, limit);
}
