import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../helpers/custom-styles";
import DateTimePicker from "react-datetime-picker";
import "./modal.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { removeError, setError, StartCloseModal } from "../actions/uiActions";
import { useSelector } from "react-redux";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../actions/eventsActions";
import ContainerError from "../ui/ContainerError";

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowAdd1Hour = now.clone().add(1, "hours");

const initialForm = {
  title: "",
  note: "",
  start: now.toDate(),
  end: nowAdd1Hour.toDate(),
};

const CalendarModal = () => {
  const { modalOpen, msgError } = useSelector((state) => state.uiReducer);
  const { activeEvent } = useSelector((state) => state.calendarReducer);

  const dispatch = useDispatch();

  const [formValues, setformValues] = useState(initialForm);

  const { title, note, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setformValues(activeEvent);
    } else {
      setformValues(initialForm);
    }
  }, [activeEvent, setformValues]);

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    setformValues(initialForm);
    dispatch(eventClearActiveEvent());
    dispatch(StartCloseModal());
  };

  const handleStartChange = (ev) => {
    setformValues({
      ...formValues,
      start: ev,
    });
  };

  const handleEndChange = (ev) => {
    setformValues({
      ...formValues,
      end: ev,
    });
  };

  const handleOnSubmit = (ev) => {
    ev.preventDefault();

    const momentDateStart = moment(start);
    const momentDateEnd = moment(end);

    if (momentDateStart.isSameOrAfter(momentDateEnd)) {
      dispatch(
        setError(
          "modalError",
          "La fecha fin no puede ser mayor a la fecha de inicio"
        )
      );
      return;
    }

    if (title.trim().length < 2) {
      dispatch(
        setError("modalError", "el titulo debe contener mas de 2 caracteres")
      );
      return;
    }

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(removeError("modalError"));
      dispatch(eventStartAddNew(formValues));
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1>{activeEvent ? "Editar Evento" : "Nuevo evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartChange}
            value={start}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndChange}
            minDate={start}
            value={end}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${
              msgError.modalError?.includes("titulo")
                ? "is-invalid"
                : "is-valid"
            }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="note"
            value={note}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
        {msgError.modalError && <ContainerError msg={msgError.modalError} />}
      </form>
    </Modal>
  );
};

export default CalendarModal;
