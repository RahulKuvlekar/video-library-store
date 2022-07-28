import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have likes (Likes are set to 0 by default), History Array, Playlists Array (added Watch Later Playlist in it by default) by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Guest",
    lastName: "User",
    email: "guestuser@gmail.com",
    password: "guestuser123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    notes: [
      {
        videoId: "P16dS29eHIY",
        videoNotes: [
          { notesId: "sadsdwqwe132-231312312", text: "The Lebron James " },
          {
            notesId: "sadsd234233432-231312312",
            text: "Don't be afraid of failure. This is the way to succeed.",
          },
          {
            notesId: "sadsdwttththt-231312312",
            text: "Some times your best effort just isn't good enough.",
          },
          {
            notesId: "sadsdwqwe132-24353453452",
            text: "Strive for greatness",
          },
        ],
      },
      {
        videoId: "oChd0hdCJA0",
        videoNotes: [
          { notesId: "sadsdwqwe12131312", text: "The Cristiano Ronaldo" },
          {
            notesId: "sadsd-fdfdgfgd3432-231312312",
            text: "Your love makes me strong, your hate makes me unstoppable.",
          },
          {
            notesId: "sadsdwttththadasd12312",
            text: "Dedication, hard work all the time, and belief.",
          },
          {
            notesId: "sdada4353453452",
            text: "Your love makes me strong, your hate makes me unstoppable.",
          },
        ],
      },
    ],
  },
];
