export const CACHE_PREFIX = "classroombg";
export const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
export const UNSPLASH_API_KEY = "mRatrB2RYIFRr4AoHKnOXftSnsUTn0mQRS71TYRiQ2s";

export interface CachedImage {
  url: string;
  timestamp: number;
}

export const getCachedImage = (classId: string): CachedImage | null => {
  const cached = localStorage.getItem(`${CACHE_PREFIX}${classId}`);
  if (cached) {
    const parsedCache = JSON.parse(cached);
    if (Date.now() - parsedCache.timestamp < CACHE_EXPIRY) {
      return parsedCache;
    }
    localStorage.removeItem(`${CACHE_PREFIX}${classId}`);
  }
  return null;
};

export const cacheImage = (classId: string, url: string) => {
  const cacheData: CachedImage = {
    url,
    timestamp: Date.now(),
  };
  localStorage.setItem(`${CACHE_PREFIX}${classId}`, JSON.stringify(cacheData));
};

export const fetchBackgroundImage = async (
  classId: string,
  className: string
): Promise<string> => {
  const cached = getCachedImage(classId);
  if (cached) {
    return cached.url;
  }

  try {
    const query = encodeURIComponent(className);
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}+classroom+education&orientation=landscape&content_filter=high`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    const imageUrl = data.urls.regular;
    cacheImage(classId, imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return ""; // Fallback to default background
  }
};
