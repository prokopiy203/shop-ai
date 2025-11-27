export function formatImage(r: any) {
  return {
    publicId: r.public_id,
    original: r.secure_url,

    // EAGER VARIANTS (generated automatically)
    preview: r.eager?.[0]?.secure_url ?? '',
    thumbnail: r.eager?.[1]?.secure_url ?? '',
    mobile: r.eager?.[2]?.secure_url ?? '',
    retina: r.eager?.[3]?.secure_url ?? '',

    alt: '',

    meta: {
      width: r.width,
      height: r.height,
      format: r.format,
      bytes: r.bytes,
    },
  };
}
