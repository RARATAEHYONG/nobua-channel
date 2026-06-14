import type { Video } from "@/data/site";

const API_BASE = "https://www.googleapis.com/youtube/v3";
const DEFAULT_REVALIDATE_SECONDS = 60 * 15;

export type YouTubeChannel = {
  title: string;
  description: string;
  handle: string;
  customUrl: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  thumbnail: string;
  uploadsPlaylistId: string;
};

export type YouTubeActivity = {
  id: string;
  type: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  likeCount: string;
  commentCount: string;
};

type YouTubeListResponse<T> = {
  items?: T[];
};

type ChannelItem = {
  snippet?: {
    title?: string;
    description?: string;
    customUrl?: string;
    thumbnails?: {
      default?: { url?: string };
      medium?: { url?: string };
      high?: { url?: string };
    };
  };
  statistics?: {
    subscriberCount?: string;
    viewCount?: string;
    videoCount?: string;
    hiddenSubscriberCount?: boolean;
  };
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
};

type PlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: {
      medium?: { url?: string };
      high?: { url?: string };
      standard?: { url?: string };
      maxres?: { url?: string };
    };
    resourceId?: {
      videoId?: string;
    };
  };
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
};

type VideoDetailsItem = {
  id?: string;
  statistics?: {
    viewCount?: string;
  };
  contentDetails?: {
    duration?: string;
  };
};

type UnknownRecord = Record<string, unknown>;

type YouTubeThumbnail = {
  url?: string;
  width?: number;
  height?: number;
};

function getRequiredConfig() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return null;
  }

  return { apiKey, channelId };
}

async function fetchYouTube<T>(
  pathname: string,
  params: Record<string, string>,
): Promise<T> {
  const config = getRequiredConfig();

  if (!config) {
    throw new Error("Missing YouTube API configuration.");
  }

  const url = new URL(`${API_BASE}/${pathname}`);
  Object.entries({ ...params, key: config.apiKey }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getYouTubeChannel(): Promise<YouTubeChannel | null> {
  const config = getRequiredConfig();

  if (!config) {
    return null;
  }

  try {
    const data = await fetchYouTube<YouTubeListResponse<ChannelItem>>(
      "channels",
      {
        part: "snippet,statistics,contentDetails",
        id: config.channelId,
      },
    );

    const channel = data.items?.[0];
    const uploadsPlaylistId =
      channel?.contentDetails?.relatedPlaylists?.uploads;

    if (!channel || !uploadsPlaylistId) {
      return null;
    }

    const snippet = channel.snippet;
    const statistics = channel.statistics;
    const customUrl = snippet?.customUrl ?? "";

    return {
      title: snippet?.title ?? "YouTube Channel",
      description: snippet?.description ?? "",
      handle: customUrl || config.channelId,
      customUrl,
      subscriberCount: statistics?.hiddenSubscriberCount
        ? "Hidden"
        : formatCount(statistics?.subscriberCount),
      viewCount: formatCount(statistics?.viewCount),
      videoCount: formatCount(statistics?.videoCount),
      thumbnail:
        snippet?.thumbnails?.high?.url ??
        snippet?.thumbnails?.medium?.url ??
        snippet?.thumbnails?.default?.url ??
        "",
      uploadsPlaylistId,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLatestYouTubeVideos(limit = 3): Promise<Video[]> {
  const channel = await getYouTubeChannel();

  if (!channel) {
    return [];
  }

  try {
    const playlistData = await fetchYouTube<YouTubeListResponse<PlaylistItem>>(
      "playlistItems",
      {
        part: "snippet,contentDetails",
        playlistId: channel.uploadsPlaylistId,
        maxResults: String(limit),
      },
    );

    const items = playlistData.items ?? [];
    const videoIds = items
      .map(
        (item) =>
          item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId,
      )
      .filter((id): id is string => Boolean(id));

    if (videoIds.length === 0) {
      return [];
    }

    const detailsData = await fetchYouTube<
      YouTubeListResponse<VideoDetailsItem>
    >("videos", {
      part: "contentDetails,statistics",
      id: videoIds.join(","),
    });

    const detailsById = new Map(
      (detailsData.items ?? []).map((item) => [item.id, item]),
    );

    return items
      .map((item) => {
        const videoId =
          item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;

        if (!videoId) {
          return null;
        }

        const details = detailsById.get(videoId);
        const thumbnail =
          item.snippet?.thumbnails?.maxres?.url ??
          item.snippet?.thumbnails?.standard?.url ??
          item.snippet?.thumbnails?.high?.url ??
          item.snippet?.thumbnails?.medium?.url ??
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        const video: Video = {
          id: videoId,
          title: item.snippet?.title ?? "Untitled video",
          category: "YouTube",
          duration: formatDuration(details?.contentDetails?.duration),
          views: `${formatCount(details?.statistics?.viewCount)} views`,
          postedAt: formatUploadDate(
            item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt,
          ),
          thumbnail,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };

        return video;
      })
      .filter((video): video is Video => Boolean(video));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getYouTubeActivities(
  limit = 3,
): Promise<YouTubeActivity[]> {
  const config = getRequiredConfig();

  if (!config) {
    return [];
  }

  try {
    const response = await fetch(
      `https://www.youtube.com/channel/${config.channelId}/community`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) {
      throw new Error(`YouTube community request failed: ${response.status}`);
    }

    const html = await response.text();
    const newestPosts = await fetchNewestCommunityPosts(html);

    if (newestPosts.length > 0) {
      return newestPosts.slice(0, limit);
    }

    return parseCommunityPosts(html).slice(0, limit);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function formatCount(value?: string) {
  const numberValue = Number(value ?? 0);

  if (!Number.isFinite(numberValue)) {
    return "0";
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(numberValue);
}

function formatUploadDate(value?: string) {
  if (!value) {
    return "Upload date unknown";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(value))
    .replaceAll("/", ".");
}

function formatDuration(value?: string) {
  if (!value) {
    return "--:--";
  }

  const match = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return "--:--";
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function parseCommunityPosts(html: string): YouTubeActivity[] {
  const data = extractYouTubeInitialData(html);

  if (!data) {
    return [];
  }

  return parseCommunityPostsFromData(data);
}

function parseCommunityPostsFromData(data: unknown): YouTubeActivity[] {
  const renderers: UnknownRecord[] = [];

  walkUnknown(data, (record) => {
    const renderer = getRecord(record, "backstagePostRenderer");

    if (renderer) {
      renderers.push(renderer);
    }
  });

  return renderers
    .map((renderer) => parseCommunityPostRenderer(renderer))
    .filter((post): post is YouTubeActivity => Boolean(post))
    .sort(
      (a, b) =>
        getCommunityPostAgeInMs(a.publishedAt) -
        getCommunityPostAgeInMs(b.publishedAt),
    );
}

function extractYouTubeInitialData(html: string) {
  const marker = "var ytInitialData = ";
  const start = html.indexOf(marker);

  if (start === -1) {
    return null;
  }

  const end = html.indexOf(";</script>", start);

  if (end === -1) {
    return null;
  }

  const jsonText = html.slice(start + marker.length, end);
  return JSON.parse(jsonText) as unknown;
}

async function fetchNewestCommunityPosts(html: string) {
  const data = extractYouTubeInitialData(html);
  const continuation = data ? getNewestCommunityContinuationToken(data) : "";
  const apiKey = extractHtmlConfig(html, "INNERTUBE_API_KEY");
  const clientVersion =
    extractHtmlConfig(html, "INNERTUBE_CLIENT_VERSION") ??
    extractServiceTrackingValue(html, "client.version");

  if (!continuation || !apiKey || !clientVersion) {
    return [];
  }

  try {
    const response = await fetch(
      `https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://www.youtube.com",
          Referer:
            "https://www.youtube.com/channel/UCfiCrUkkcrlJO_JflFKgBow/community",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName: "WEB",
              clientVersion,
              hl: "ja",
              gl: "JP",
            },
          },
          continuation,
        }),
        next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) {
      return [];
    }

    const newestData = (await response.json()) as unknown;
    return parseCommunityPostsFromData(newestData);
  } catch {
    return [];
  }
}

function getNewestCommunityContinuationToken(data: unknown) {
  let token = "";

  walkUnknown(data, (record) => {
    if (token) {
      return;
    }

    const chip = getRecord(record, "chipCloudChipRenderer");
    if (!chip) {
      return;
    }

    const text = getString(getRecord(chip, "text"), "simpleText");

    if (text !== "新しい順") {
      return;
    }

    token = getNestedString(chip, [
      "navigationEndpoint",
      "continuationCommand",
      "token",
    ]);
  });

  return token;
}

function extractHtmlConfig(html: string, key: string) {
  const pattern = new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`);
  return html.match(pattern)?.[1] ?? "";
}

function extractServiceTrackingValue(html: string, key: string) {
  const pattern = new RegExp(
    `"key"\\s*:\\s*"${key}"\\s*,\\s*"value"\\s*:\\s*"([^"]+)"`,
  );
  return html.match(pattern)?.[1] ?? "";
}

function parseCommunityPostRenderer(
  renderer: UnknownRecord,
): YouTubeActivity | null {
  const postId = getString(renderer, "postId");
  const text = getRunsText(getRecord(renderer, "contentText"));

  if (!postId || !text) {
    return null;
  }

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const title = lines[0] ?? "YouTube Community Post";
  const description = lines.slice(1).join("\n\n");
  const publishedAt = getRunsText(getRecord(renderer, "publishedTimeText"));
  const attachment = getRecord(renderer, "backstageAttachment");
  const imageRenderer = attachment
    ? getRecord(attachment, "backstageImageRenderer")
    : null;
  const pollRenderer = attachment ? getRecord(attachment, "pollRenderer") : null;
  const thumbnail = imageRenderer ? getCommunityImage(imageRenderer) : "";
  const url =
    getRunsEndpointUrl(getRecord(renderer, "publishedTimeText")) ??
    `/post/${postId}`;

  return {
    id: postId,
    type: pollRenderer ? "POLL" : "POST",
    title,
    description,
    publishedAt: publishedAt || "投稿日不明",
    thumbnail,
    url: toYouTubeUrl(url),
    likeCount: getNestedString(renderer, ["voteCount", "simpleText"]),
    commentCount: getNestedString(renderer, [
      "actionButtons",
      "commentActionButtonsRenderer",
      "replyButton",
      "buttonRenderer",
      "text",
      "simpleText",
    ]),
  };
}

function walkUnknown(
  value: unknown,
  visit: (record: UnknownRecord) => void,
) {
  if (!isRecord(value)) {
    return;
  }

  visit(value);

  Object.values(value).forEach((child) => {
    if (Array.isArray(child)) {
      child.forEach((item) => walkUnknown(item, visit));
      return;
    }

    walkUnknown(child, visit);
  });
}

function getCommunityImage(renderer: UnknownRecord) {
  const image = getRecord(renderer, "image");
  const thumbnails = getArray(image, "thumbnails")
    .filter(isRecord)
    .map((thumbnail): YouTubeThumbnail => ({
      url: getString(thumbnail, "url"),
      width: getNumber(thumbnail, "width"),
      height: getNumber(thumbnail, "height"),
    }))
    .filter((thumbnail) => thumbnail.url);

  const best = thumbnails.sort(
    (a, b) => (b.width ?? 0) * (b.height ?? 0) - (a.width ?? 0) * (a.height ?? 0),
  )[0];

  return best?.url ? toHttpsUrl(best.url) : "";
}

function getRunsText(record: UnknownRecord | null) {
  const runs = getArray(record, "runs");
  const text = runs
    .filter(isRecord)
    .map((run) => getString(run, "text"))
    .filter(Boolean)
    .join("");

  return text || getString(record, "simpleText");
}

function getRunsEndpointUrl(record: UnknownRecord | null) {
  const firstRun = getArray(record, "runs").filter(isRecord)[0];

  if (!firstRun) {
    return null;
  }

  return getNestedString(firstRun, [
    "navigationEndpoint",
    "commandMetadata",
    "webCommandMetadata",
    "url",
  ]);
}

function toYouTubeUrl(value: string) {
  if (value.startsWith("http")) {
    return value;
  }

  return `https://www.youtube.com${value}`;
}

function toHttpsUrl(value: string) {
  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  return value;
}

function getNestedString(record: UnknownRecord, keys: string[]) {
  let current: unknown = record;

  for (const key of keys) {
    if (!isRecord(current)) {
      return "";
    }

    current = current[key];
  }

  return typeof current === "string" ? current : "";
}

function getRecord(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return isRecord(value) ? value : null;
}

function getArray(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return Array.isArray(value) ? value : [];
}

function getString(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "string" ? value : "";
}

function getNumber(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "number" ? value : undefined;
}

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getCommunityPostAgeInMs(value: string) {
  const normalized = value.replace(/（.*?）/g, "");
  const amountMatch = normalized.match(/(\d+)/);
  const amount = amountMatch ? Number(amountMatch[1]) : 0;

  if (normalized.includes("分前")) {
    return amount * 60 * 1000;
  }

  if (normalized.includes("時間前")) {
    return amount * 60 * 60 * 1000;
  }

  if (normalized.includes("日前")) {
    return amount * 24 * 60 * 60 * 1000;
  }

  if (normalized.includes("週間前")) {
    return amount * 7 * 24 * 60 * 60 * 1000;
  }

  if (normalized.includes("か月前") || normalized.includes("ヶ月前")) {
    return amount * 30 * 24 * 60 * 60 * 1000;
  }

  if (normalized.includes("年前")) {
    return amount * 365 * 24 * 60 * 60 * 1000;
  }

  return Number.MAX_SAFE_INTEGER;
}
