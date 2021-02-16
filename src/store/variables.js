import dotenv from "dotenv";
dotenv.config()

// Base url
export const URL_PROXY = "http://localhost:8000";
export const URL_CLIENT = "http://localhost:3000";
// Auth url
const BACKEND_API = process.env.BACKEND_API
console.log(process.env)
export const URL_SIGN_UP = `/${BACKEND_API}/users-api/sign-up/`;
export const URL_TOKEN = `/${BACKEND_API}/users-api/token/`;
export const URL_TOKEN_REFRESH=`/${BACKEND_API}/users-api/token/refresh/`;
export const URL_CHECK_SELF_AUTH=`/${BACKEND_API}/users-api/check-self-auth/`;
export const URL_LOGOUT=`/${BACKEND_API}/users-api/logout/`;
// Profile url
export const URL_PUBLIC_PROFILE=`/${BACKEND_API}/users-api/public_users/`;
export const URL_PROFILE=`/${BACKEND_API}/users-api/users/`;
// Project url
export const URL_PUBLIC_PROJECT=`/${BACKEND_API}/todos-api/public_projects/`;
export const URL_PROJECT=`/${BACKEND_API}/todos-api/projects/`;
export const URL_GLANCE=`/${BACKEND_API}/todos-api/glance/`;
// Tag url
export const URL_PUBLIC_TAG=`/${BACKEND_API}/todos-api/public_tags/`;
export const URL_TAG=`/${BACKEND_API}/todos-api/tags`;
// Container url
export const URL_PUBLIC_CONTAINER=`/${BACKEND_API}/todos-api/public_containers/`;
export const URL_CONTAINER = `/${BACKEND_API}/todos-api/containers/`;
// Task url
export const URL_PUBLIC_TASK=`/${BACKEND_API}/todos-api/public_tasks/`;
export const URL_TASK=`/${BACKEND_API}/todos-api/tasks/`;

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