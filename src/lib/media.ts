// All heavy media lives on the Sweet Dreams demos Supabase (public CDN bucket).
export const MEDIA_BASE =
  "https://vhyjphcwfvrcclqberoe.supabase.co/storage/v1/object/public/demo-media/demo-boggs-pro-cut";

// Bump when regenerating media so CDN/browser caches fetch the fresh assets.
export const MEDIA_VERSION = "2";

export const img = (file: string) => `${MEDIA_BASE}/${file}?v=${MEDIA_VERSION}`;

export const MEDIA = {
  before: img("before.webp"),
  after: img("after.webp"),
  winter: img("winter.webp"),
  lawn: img("lawn.webp"),
  landscape: img("landscape.webp"),
  hardscape: img("hardscape.webp"),
  snow: img("snow.webp"),
  crew: img("crew.webp"),
  map: img("map.webp"),
  bedBefore: img("bed-before.webp"),
  bedAfter: img("bed-after.webp"),
};

// Scroll-scrubbed frame sequence (extracted from the two signature clips).
export const SCROLL_FRAME_BASE = `${MEDIA_BASE}/frames`;
export const SCROLL_FRAME_COUNT = 96; // f0001..f0096
export const scrollFrame = (i: number) =>
  `${SCROLL_FRAME_BASE}/f${String(i).padStart(4, "0")}.webp?v=${MEDIA_VERSION}`;
