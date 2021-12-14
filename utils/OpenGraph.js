/**
 * Encode characters for Cloudinary URL
 * Encodes some not allowed in Cloudinary parameter values twice:
 *   hash, comma, slash, question mark, backslash
 *   https://support.cloudinary.com/hc/en-us/articles/202521512-How-to-add-a-slash-character-or-any-other-special-characters-in-text-overlays-
 *
 * @param {string} text
 * @return {string}
 */
function cleanText(text) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, "%25$1");
}

export const IMG_WIDTH = 1140;
export const IMG_HEIGHT = 600;

export function generateOpenGraphImage(title, topics) {
  const xBasePosition = 270;

  const titleConfig = [
    `w_657`,
    "c_fit",
    "g_west",
    "co_rgb:ffffff",
    `x_${xBasePosition}`,
    `y_-40`,
    `l_text:worksansbold.ttf_45:${cleanText(`${title}`)}`,
  ].join(",");

  const topicConfig = [];
  const topicIconSize = 38;
  const topicGutter = 20;

  const topicImageUrls = topics ? topics?.map((topic) => topic.icon.url) : [];

  for (let i = 0; i < topicImageUrls.length; i++) {
    const xPos =
      i === 0
        ? xBasePosition
        : xBasePosition + i * (topicGutter + topicIconSize);

    let base64 = Buffer.from(topicImageUrls[i]).toString("base64");
    let transformations = [
      `w_${topicIconSize}`,
      `h_${topicIconSize}`,
      "c_fit",
    ].join(",");
    let placementQuals = ["g_west", `x_${xPos}`, `y_185`].join(",");
    topicConfig.push(
      `l_fetch:${base64}/${transformations}/fl_layer_apply,${placementQuals}`,
    );
  }

  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${IMG_WIDTH}`,
    `h_${IMG_HEIGHT}`,
    "c_fill",
    "q_auto",
    "f_auto",
  ].join(",");

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    "https://res.cloudinary.com",
    "whitep4nth3r",
    "image",
    "upload",
    imageConfig,
    topicConfig.join("/"),
    titleConfig,
    "p4nth3rblog_og.png",
  ];

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean);

  // join all the parts into a valid URL to the generated image
  return validParts.join("/");
}
