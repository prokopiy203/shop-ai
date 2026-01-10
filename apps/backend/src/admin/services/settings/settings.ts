import { Settings } from '@/api/models/store/settings';
import { StoreSettings } from '@shop-ai/types';

export const getSettingsService = async (): Promise<StoreSettings> => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
    return {
      general: settings.general,
      ai: settings.ai,
    };
  }

  return {
    general: settings.general,
    ai: settings.ai,
  };
};

export const updateSettingsService = async (
  payload: Partial<StoreSettings>,
): Promise<StoreSettings> => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  // GENERAL — shallow merge (OK)
  if (payload.general) {
    settings.general = {
      ...settings.general,
      ...payload.general,
    };
  }

  // AI — CONTROLLED MERGE
  if (payload.ai) {
    settings.ai = {
      ...settings.ai,
      ...payload.ai,
      productDescription: {
        ...settings.ai.productDescription,
        ...payload.ai.productDescription,
      },
      imageAltText: {
        ...settings.ai.imageAltText,
        ...payload.ai.imageAltText,
      },
      chatAssistant: {
        ...settings.ai.chatAssistant,
        ...payload.ai.chatAssistant,
      },
    };
  }

  await settings.save();

  return {
    general: settings.general,
    ai: settings.ai,
  };
};
