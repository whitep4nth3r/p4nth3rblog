export default async (_, res) => {
  const fetchUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=user_read`;

  const getAccessToken = async () => {
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: { accept: "application/vnd.twitchtv.v5+json" },
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const tokenResponse = await getAccessToken();

  const twitchId = "469006291";

  if (tokenResponse.access_token) {
    const fetchOptions = {
      headers: {
        "Client-Id": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    };

    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users/follows?to_id=${twitchId}`,
      fetchOptions,
    );

    const viewCountResponse = await fetch(
      `https://api.twitch.tv/helix/users?id=${twitchId}`,
      fetchOptions,
    );

    const user = await userResponse.json();

    const viewCount = await viewCountResponse.json();

    return res.status(200).json({
      followers: user.total,
      views: viewCount.data[0].view_count,
    });
  }
};
