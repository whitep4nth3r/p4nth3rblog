export default async (_, res) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      "User-Agent": "v2UserLookupJS",
      Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN,
    },
  };

  const response = await fetch(
    "https://api.twitter.com/2/users/by?usernames=whitep4nth3r&user.fields=public_metrics",
    fetchOptions,
  );

  const metrics = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=60",
  );

  return res.status(200).json({
    followers: metrics.data[0].public_metrics.followers_count,
  });
};
