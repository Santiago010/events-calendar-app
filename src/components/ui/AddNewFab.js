import React from "react";
import { useDispatch } from "react-redux";
import { startOpenModal } from "../actions/uiActions";

const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(startOpenModal());
  };
  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default AddNewFab;
