import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import NavBar from "../ui/NavBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-message-es";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { removeError, startOpenModal } from "../actions/uiActions";
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../actions/eventsActions";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";
import ContainerError from "../ui/ContainerError";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendarReducer);
  const { uid } = useSelector((state) => state.authReducer);
  const { msgError } = useSelector((state) => state.uiReducer);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeError("eventError"));
    }, 5000);
  }, [msgError, dispatch]);

  const handleOnDoubleClick = (ev) => {
    dispatch(startOpenModal());
  };

  const handleOnSelect = (ev) => {
    dispatch(eventSetActive(ev));
  };

  const handleOnView = (ev) => {
    setLastView(ev);
    localStorage.setItem("lastView", ev);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      bacgroundColor: uid === event.user._id ? "#367CF7" : "#57837B",
      borderRadius: "8px",
      opacity: 0.8,
      display: "block",
      color: "black",
    };

    return {
      style,
    };
  };

  const handleOnSelectSlot = (ev) => {
    dispatch(eventClearActiveEvent());
  };

  return (
    <div className="calendar-screen animate__animated animate__fadeInDown">
      <NavBar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={handleOnDoubleClick}
        onSelectEvent={handleOnSelect}
        onView={handleOnView}
        onSelectSlot={handleOnSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />

      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
      {msgError.eventError && (
        <div className="container-fixed-error">
          <ContainerError msg={msgError.eventError} />
        </div>
      )}
    </div>
  );
};

export default CalendarScreen;
