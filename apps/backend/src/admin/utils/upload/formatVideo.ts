export function formatVideo(r: any) {
  const baseUrl = r.secure_url;

  const withoutExt = baseUrl.substring(0, baseUrl.lastIndexOf('.'));

  const posterUrl = baseUrl.replace('/upload/', '/upload/so_1/').replace(/\.[^/.]+$/, '.jpg');

  return {
    publicId: r.public_id,
    url: baseUrl,
    poster: posterUrl,

    width: r.width,
    height: r.height,
    duration: r.duration,
    format: r.format,
    bytes: r.bytes,
  };
}
