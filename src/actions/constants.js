import axios from 'axios'
import { createHashHistory } from "history";
import configureStore from '../config/configureStore'


// MAIN CONSTANTS

export const CURRENT_MODULE = "CURRENT_MODULE";
export const CURRENT_STATE = "CURRENT_STATE";
export const ERRORED = "ERRORED";
export const LOADING = "LOADING";
export const ADD_LOADING = "ADD_LOADING";
export const REDIRECT_PATH = "REDIRECT_PATH";
export const SET_FONT_SIZE = "STUDENT_SET_FONT_SIZE";
export const ENABLE_KEYBOARD = "ENABLE_KEYBOARD"; 
export const GET_TOKEN = "GET_TOKEN";


// ADMIN
export const FETCH_DATA = "FETCH_DATA";
export const POST_DATA = "POST_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const IS_TIMER_CHOOSED = "IS_TIMER_CHOOSED";
export const IS_SUBJECT_TOPIC_CHOOSED = "IS_SUBJECT_TOPIC_CHOOSED"


// LANDING PAGES
export const INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
export const LANDING_PAGES_LOADING = "LANDING_PAGES_LOADING"

// URL
export const BASE = process.env.BABRI_API_URL;

export const instance = axios.create({
    baseURL : `${BASE}/api/service`,
    headers: {
        'Content-Type': 'application/json',   
      }
      
})


// STUDENTS

export const QUESTIONS = "QUESTIONS";
export const ITEM_BANK = "ITEM_BANK";
export const QUESTION_STATE = "QUESTION_STATE";
export const TIME_PER_QUESTION = "TIME_PER_QUESTION";

export const WARNING_TIME = 1788000 ;
export const LOGOUT_TIME = 1800000;

export const HASH_HISTORY = createHashHistory();
