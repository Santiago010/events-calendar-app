import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../actions/eventsActions";

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(eventStartDelete());
  };

  return (
    <button
      className="btn btn-danger fab-dander animate__animated animate__bounceIn"
      onClick={handleClick}
    >
      <i className="fas fa-trash"></i>
    </button>
  );
};

export default DeleteEventFab;
