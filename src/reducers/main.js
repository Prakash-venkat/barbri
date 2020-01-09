import { 
  CURRENT_MODULE, 
  LOADING, ADD_LOADING,
  ERRORED, 
  CURRENT_STATE, 
  FETCH_DATA, 
  DELETE_DATA, 
  ITEM_BANK, 
  QUESTION_STATE, 
  REDIRECT_PATH, QUESTIONS, 
  IS_TIMER_CHOOSED, 
  SET_FONT_SIZE, 
  LANDING_PAGES_LOADING,INVALID_CREDENTIALS, 
  TIME_PER_QUESTION, 
  IS_SUBJECT_TOPIC_CHOOSED,
  ENABLE_KEYBOARD,
  GET_TOKEN
} from '../actions/constants'

let initialState = {
  module: '',
  error: [],
  load: false,
  state: '',
  data: [],
  id: '',
  items: [],
  path: '',
  questions: [],
  timer: true,
  questionNo:false,
  questionResponse: [],
  fontSize: 100,
  isLoading: false,
  invalidLogin: false,
  time : 1.5,
  enable : false,
  isDataAdding: false,
  token : '',

};

export default function main(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      });
    case CURRENT_MODULE:
      return Object.assign({}, state, {
        module: action.module
      });
    case ERRORED:
      return Object.assign({}, state, {
        error: action.error
      });
    case LOADING:
      return Object.assign({}, state, {
        load: action.load
      });
    case ADD_LOADING:
      return Object.assign({}, state, {
        isDataAdding: action.isDataAdding
      });
    case CURRENT_STATE:
      return Object.assign({}, state, {
        state: action.state
      })
    case FETCH_DATA:
      return Object.assign({}, state, {
        data: action.data
      })
    case DELETE_DATA:
      return Object.assign({}, state, {
        id: action.id
      })
    case ITEM_BANK:
      return Object.assign({}, state, {
        items: action.items
      })
    case REDIRECT_PATH:
      return Object.assign({}, state, {
        path: action.path
      })
    case QUESTIONS:
      return Object.assign({}, state, {
        questions: action.questions
      })
    case IS_TIMER_CHOOSED:
      return Object.assign({}, state, {
        timer: action.timer,
        })
    case IS_SUBJECT_TOPIC_CHOOSED:
      return Object.assign({}, state, {
          questionNo: action.questionNo
    })
    case SET_FONT_SIZE:
        return Object.assign({}, state, {
          fontSize: action.fontSize,
        })
    case LANDING_PAGES_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case INVALID_CREDENTIALS:
      return Object.assign({}, state, {
        invalidLogin: action.invalidLogin
      })
    case TIME_PER_QUESTION:
        return Object.assign({}, state, {
          time: action.time
      }) 
    case ENABLE_KEYBOARD:
        return Object.assign({}, state, {
          enable: action.enable
      })  
    default:
      return state;
  }
}
