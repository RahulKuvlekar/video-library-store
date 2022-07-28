import { authFeatures } from "../Constant/constant";
const {
  SET_AUTH,
  CLEAR_AUTH,
  SET_NOTES,
  CLEAR_NOTES,
  ADD_NOTES,
  DELETE_NOTES,
} = authFeatures;

const authReducer = (prevState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...prevState, ...action.payload };
    case CLEAR_AUTH:
      return {
        isAuthenticated: false,
        token: null,
        userInfo: null,
      };
    case SET_NOTES:
      return { ...prevState, notes: action.payload };
    case CLEAR_NOTES:
      return { ...prevState, notes: [] };
    case ADD_NOTES: {
      const videoId = action.payload.videoId;
      const notes = action.payload.notes;
      let findVideo = prevState.notes.find((item) => item.videoId === videoId);
      return findVideo
        ? {
            ...prevState,
            notes: prevState.notes.map((item) =>
              item.videoId === videoId
                ? { ...item, videoNotes: [...item.videoNotes, notes] }
                : item
            ),
          }
        : {
            ...prevState,
            notes: [
              ...prevState.notes,
              {
                videoId,
                videoNotes: [notes],
              },
            ],
          };
    }
    case DELETE_NOTES: {
      const videoId = action.payload.videoId;
      const notes = action.payload.notes;

      let findVideo = prevState.notes.find((item) => item.videoId === videoId);
      findVideo.videoNotes = findVideo.videoNotes.filter(
        (item) => item.notesId !== notes.notesId
      );

      return {
        ...prevState,
        notes: prevState.notes.map((item) =>
          item.videoId === videoId ? findVideo : item
        ),
      };
    }

    default:
      return prevState;
  }
};

export { authReducer };
