import { db } from "@/lib/db";

const DEFAULT_SETTINGS = {
  id: "default-site-settings",
  companyName: "PY Capital",
  phone: "0724535062",
  internationalPhone: "+254 724 535 062",
  location: "Nairobi, Kenya",
  companyEmail: "",
  currency: "KSh",
  homepageSettings: {},
  themeSettings: {},
};

export async function getSiteSettings() {
  try {
    const settings = await db.siteSettings.findUnique({
      where: { id: DEFAULT_SETTINGS.id },
    });

    if (!settings) {
      return await db.siteSettings.create({
        data: {
          id: DEFAULT_SETTINGS.id,
          companyName: DEFAULT_SETTINGS.companyName,
          phone: DEFAULT_SETTINGS.phone,
          internationalPhone: DEFAULT_SETTINGS.internationalPhone,
          location: DEFAULT_SETTINGS.location,
          companyEmail: DEFAULT_SETTINGS.companyEmail || null,
          currency: DEFAULT_SETTINGS.currency,
          homepageSettings: DEFAULT_SETTINGS.homepageSettings,
          themeSettings: DEFAULT_SETTINGS.themeSettings,
        },
      });
    }

    return settings;
  } catch (err) {
    console.error(
      "Failed to fetch site settings, returning fallbacks:",
      err
    );

    return {
      ...DEFAULT_SETTINGS,
      companyEmail: DEFAULT_SETTINGS.companyEmail || null,
      updatedAt: new Date(),
    };
  }
}

/**
 * The current Prisma schema does not contain a Banner model.
 * Keep this helper for compatibility with existing callers.
 */
export async function getPublishedBanners() {
  return [];
}
