import dotenv from 'dotenv';
dotenv.config();

import cloudinary from '../src/config/cloudinary';

type PresetOptions = {
  folder: string;
  resource?: 'image' | 'video' | 'raw';
  transformation?: string | any[];
  eager?: string[] | any[];
  format?: string;
};

/** ----------------------------
 *  HELPERS
 * -----------------------------*/
async function checkPresetExists(name: string): Promise<boolean> {
  try {
    await cloudinary.api.upload_preset(name);
    return true;
  } catch (err: any) {
    if (err?.http_code === 404) return false;
    console.error(`❌ Error checking preset "${name}":`, err);
    return false;
  }
}

async function createPreset(name: string, options: PresetOptions) {
  try {
    await cloudinary.api.create_upload_preset({
      name,
      folder: options.folder,
      resource_type: options.resource || 'image',

      type: 'upload',
      unsigned: false,
      use_filename: true,
      unique_filename: true,
      overwrite: false,

      transformation: options.transformation || '',
      eager: options.eager || [],
      format: options.format || undefined,
    });

    console.log(`✔ Created preset "${name}"`);
  } catch (err) {
    console.error(`❌ Failed creating preset "${name}":`, err);
  }
}

async function ensurePreset(name: string, options: PresetOptions) {
  const exists = await checkPresetExists(name);
  if (exists) {
    console.log(`✔ Preset "${name}" already exists`);
    return;
  }

  await createPreset(name, options);
}

/** ----------------------------
 *  MAIN SETUP
 * -----------------------------*/
async function setupCloudinaryPresets() {
  console.log('⏳ Setting up Cloudinary presets...\n');

  await ensurePreset('product_image', {
    folder: 'products/image',
    transformation: [{ crop: 'scale', width: 2000 }, { fetch_format: 'webp' }, { quality: 'auto' }],
    eager: ['c_scale,w_600/f_webp/q_auto', 'c_scale,w_300/f_webp/q_auto'],
    format: 'webp',
  });

  await ensurePreset('product_video', {
    folder: 'products/video',
    resource: 'video',
    transformation: [{ fetch_format: 'mp4' }, { quality: 'auto' }, { audio_codec: 'aac' }],
    eager: ['f_mp4/q_auto/ac_aac'],
    format: 'mp4',
  });

  await ensurePreset('category_image', {
    folder: 'categories',
    transformation: [{ crop: 'scale', width: 1200 }, { fetch_format: 'webp' }, { quality: 'auto' }],
    eager: ['c_scale,w_600/f_webp/q_auto'],
    format: 'webp',
  });

  await ensurePreset('avatar_image', {
    folder: 'users/avatars',
    transformation: [
      { crop: 'thumb', gravity: 'face', width: 600, height: 600 },
      { fetch_format: 'webp' },
      { quality: 'auto' },
    ],
    eager: ['c_scale,w_300/f_webp/q_auto'],
    format: 'webp',
  });

  await ensurePreset('gallery_image', {
    folder: 'products/gallery',
    transformation: [{ crop: 'scale', width: 1600 }, { fetch_format: 'webp' }, { quality: 'auto' }],
    eager: ['c_scale,w_500/f_webp/q_auto'],
    format: 'webp',
  });

  console.log('\n🎉 Cloudinary setup completed!');
  process.exit(0);
}

setupCloudinaryPresets();
