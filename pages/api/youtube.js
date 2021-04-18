// import { google } from "googleapis";

// let googleAuth;

// export default async (_, res) => {
//   googleAuth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       private_key: process.env.GOOGLE_PRIVATE_KEY,
//     },
//     scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
//   });

//   const youtube = google.youtube({
//     auth: googleAuth,
//     version: "v3",
//   });

//   const response = await youtube.channels.list({
//     id: "UCiGFO97qgxZEbbg43mZSeyg",
//     part: "statistics",
//   });

//   const channel = response.data.items[0];
//   const { subscriberCount, viewCount } = channel.statistics;

//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=120, stale-while-revalidate=60",
//   );

//   return res.status(200).json({
//     subscriberCount,
//     viewCount,
//   });
// };
