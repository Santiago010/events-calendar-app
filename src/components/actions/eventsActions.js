import { fetchWithToken } from "../../helpers/fetchData";
import { prepareEvents } from "../../helpers/prepareEvents";
import { types } from "../../types/types";
import { setError } from "./uiActions";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { authReducer } = getState();
    const { name, uid } = { authReducer };
    try {
      const res = await fetchWithToken("events", event, "POST");
      const body = await res.json();

      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          uid,
          name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(`events/${event.id}`, event, "PUT");
      const body = await res.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        dispatch(setError("eventError", body.msg));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { calendarReducer } = getState();
    const { activeEvent } = calendarReducer;
    try {
      const res = await fetchWithToken(
        `events/${activeEvent.id}`,
        {},
        "DELETE"
      );
      const body = await res.json();

      if (body.ok) {
        dispatch(eventDelete());
      } else {
        dispatch(setError("eventError", body.msg));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActive,
});

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

const eventDelete = () => ({
  type: types.eventDelete,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken("events");
      const body = await res.json();
      const events = prepareEvents(body.eventos);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
