export function formatImage(r: any) {
  const width = r.width;
  const height = r.height;
  const ratio = Number((width / height).toFixed(3));

  return {
    publicId: r.public_id,
    original: r.secure_url,

    // EAGER VARIANTS (generated automatically)
    thumbnail2x: r.eager?.[0]?.secure_url ?? '', // 600px
    thumbnail: r.eager?.[1]?.secure_url ?? '', // 300px
    mobile: r.eager?.[2]?.secure_url ?? '', // 480px
    retina: r.eager?.[3]?.secure_url ?? '', // 1200px

    // preview = thumbnail2x
    preview: r.eager?.[0]?.secure_url ?? '',

    width,
    height,
    ratio,
  };
}
