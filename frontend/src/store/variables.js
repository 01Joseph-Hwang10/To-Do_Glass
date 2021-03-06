import { stripPort } from "../functions/stringFunctions";

// Base url
export let URL_PROXY;
if(process.env.NODE_ENV === 'production') {
    URL_PROXY = `${stripPort(window.location.origin)}`;
} else {
    URL_PROXY = `http://localhost:8000`
}
// Auth url
export const URL_SIGN_UP = `${URL_PROXY}/api/users-api/sign-up/`;
export const URL_TOKEN = `${URL_PROXY}/api/users-api/token/`;
export const URL_TOKEN_REFRESH=`${URL_PROXY}/api/users-api/token/refresh/`;
export const URL_CHECK_SELF_AUTH=`${URL_PROXY}/api/users-api/check-self-auth/`;
export const URL_LOGOUT=`${URL_PROXY}/api/users-api/logout/`;
// Profile url
export const URL_PUBLIC_PROFILE=`${URL_PROXY}/api/users-api/public_users/`;
export const URL_PROFILE=`${URL_PROXY}/api/users-api/users/`;
// Project url
export const URL_PUBLIC_PROJECT=`${URL_PROXY}/api/todos-api/public_projects/`;
export const URL_PROJECT=`${URL_PROXY}/api/todos-api/projects/`;
export const URL_GLANCE=`${URL_PROXY}/api/todos-api/glance/`;
// Tag url
export const URL_PUBLIC_TAG=`${URL_PROXY}/api/todos-api/public_tags/`;
export const URL_TAG=`${URL_PROXY}/api/todos-api/tags/`;
// Container url
export const URL_PUBLIC_CONTAINER=`${URL_PROXY}/api/todos-api/public_containers/`;
export const URL_CONTAINER = `${URL_PROXY}/api/todos-api/containers/`;
// Task url
export const URL_PUBLIC_TASK=`${URL_PROXY}/api/todos-api/public_tasks/`;
export const URL_TASK=`${URL_PROXY}/api/todos-api/tasks/`;

// Colors
// Set 1
export const COLOR_FIRST = "#0f3057"
export const COLOR_SECOND = "#00587a"
export const COLOR_THIRD = "#008891"
export const COLOR_FOURTH = "#e7e7de"
// Set 1 Alt
// export const COLOR_FIRST = "#aee1e1"
// export const COLOR_SECOND = "#d3e0dc"
// export const COLOR_THIRD = "#ece2e1"
// export const COLOR_FOURTH = "#fcd1d1"
// Set 2
export const COLOR_FIFTH = "#F8F8FF"
// Set 3
export const COLOR_SIXTH = "#ffe3de"
export const COLOR_SEVENTH = "#bbbbbb"
export const COLOR_EIGHTH = "#03506f"
export const COLOR_NINTH = "#0a043c"
