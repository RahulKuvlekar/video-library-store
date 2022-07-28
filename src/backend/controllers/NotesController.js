import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
/**
 * All the routes related to User notes are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting videos from user's notes.
 * send GET Request at /api/user/notes
 * */
export const getNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }

    return new Response(200, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles adding videos to user's notes.
 * send POST Request at /api/user/notes
 * body contains {video}
 * */

export const addNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }

    const { videoId } = request.params;
    const { notes } = JSON.parse(request.requestBody);

    let findVideo = user.notes.find((item) => item.videoId === videoId);
    if (findVideo) {
      user.notes = user.notes.map((item) =>
        item.videoId === videoId
          ? { ...item, videoNotes: [...item.videoNotes, notes] }
          : item
      );
    } else {
      user.notes = user.notes.push({
        videoId,
        videoNotes: [notes],
      });
    }
    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing videos from user's notes.
 * send DELETE Request at /api/user/notes/:videoId
 * */

export const removeNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { videoId } = request.params;
    const { notes } = JSON.parse(request.requestBody);

    const findNote = user.notes.find((item) => item.videoId === videoId);
    findNote.videoNotes = findNote.videoNotes.filter(
      (item) => item.notesId !== notes.notesId
    );

    user.notes = user.notes.map((item) =>
      item.videoid === videoId ? findNote : item
    );
    return new Response(200, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing videos from user's notes.
 * send DELETE Request at /api/user/notes/all
 * */

export const updateNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    this.db.users.update({ notes: [] });
    return new Response(200, {}, { notes: [] });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
