import React, { useState } from "react";
import "./Notes.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useParams } from "react-router";
import axios from "axios";
import {
  ADD_NOTES,
  ADD_TOAST,
  authFeatures,
  DELETE_FROM_NOTES,
  WARNING,
} from "../../Constant/constant";
import { v4 as uuid } from "uuid";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const Notes = () => {
  const {
    authState: { notes, token, isAuthenticated },
    dispatchAuth,
  } = useAuthContext();

  const { dispatchToast } = useToastContext();

  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const videoInfo = notes?.find((notes) => notes.videoId === videoId);

  const postNoteHandler = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(WARNING, "Please Login"),
      });
      return;
    }

    const notesData = {
      notesId: uuid(),
      text: inputText,
    };
    try {
      setIsLoading(true);
      const { status } = await axios.post(
        `${ADD_NOTES}${videoId}`,
        { notes: notesData },
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) {
        dispatchAuth({
          type: authFeatures.ADD_NOTES,
          payload: { videoId, notes: notesData },
        });
        setInputText("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeNoteHandler = async (notesData) => {
    if (!isAuthenticated) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(WARNING, "Please Login"),
      });
      return;
    }

    try {
      setIsLoading(true);
      const { status } = await axios.post(
        `${DELETE_FROM_NOTES}${videoId}`,
        { notes: notesData },
        {
          headers: { authorization: token },
        }
      );

      if (status === 200) {
        dispatchAuth({
          type: authFeatures.DELETE_NOTES,
          payload: { videoId, notes: notesData },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="notes-section">
      <h2 className="notes-title">Take a Note !!!</h2>
      <div className="notes-display custom-scrollbar">
        {videoInfo?.videoNotes?.length > 0 &&
          videoInfo?.videoNotes.map((note) => (
            <p className="notes-text" key={`notes-text-${note.notesId}`}>
              <span className="notes-actions">
                {/* <FaEdit />  */}
                <FaTrash onClick={() => removeNoteHandler(note)} />
              </span>
              {note.text}
            </p>
          ))}
      </div>
      <form className="notes-add" onSubmit={postNoteHandler}>
        <input
          type="text"
          placeholder="Take a note ..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          disabled={inputText.length === 0 || isLoading ? true : false}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Notes;
