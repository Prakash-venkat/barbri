import {
  ADMIN_USERS,
  ADMIN_LAW_SCHOOL,
  ADMIN_STUDENTS,
  ADMIN_MESSAGES,
  ADMIN_NOTIFICATION,
  ADMIN_VIDEO_LIBRARY,
  ADMIN_SETTINGS
} from "../constants/requester";

const users = "users";
const law_school = "law-school";
const students = "students";
const video_library = "video-library";
const settings = "settings";
const messages = "messages";
const notification = "notification";

export function selectedPath(currentState) {
  if (currentState === ADMIN_USERS) {
    return users;
  } else if (currentState === ADMIN_LAW_SCHOOL) {
    return law_school;
  } else if (currentState === ADMIN_STUDENTS) {
    return students;
  } else if (currentState === ADMIN_MESSAGES) {
    return messages;
  } else if (currentState === ADMIN_NOTIFICATION) {
    return notification;
  } else if (currentState === ADMIN_VIDEO_LIBRARY) {
    return video_library;
  } else if (currentState === ADMIN_SETTINGS) {
    return settings;
  }
}
