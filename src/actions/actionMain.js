import { createHashHistory } from "history";
import swal from "sweetalert";
import {getSession} from '../containers/routes/routePaths';
import {language} from '../utils/locale/locale'
import axios from 'axios'

const hashHistory = createHashHistory();

function errorPopup(){
  swal(
      language.oops,
      language.tryAgain,
      "error"
    );
  }

import { CURRENT_MODULE, ERRORED, LOADING, ADD_LOADING, CURRENT_STATE, FETCH_DATA, REDIRECT_PATH, QUESTIONS, IS_TIMER_CHOOSED, SET_FONT_SIZE, INVALID_CREDENTIALS, LANDING_PAGES_LOADING, instance, TIME_PER_QUESTION, IS_SUBJECT_TOPIC_CHOOSED, ENABLE_KEYBOARD, GET_TOKEN, BASE } from './constants'

export function currentModule(module) {
  return {
    type: CURRENT_MODULE,
    module
  };
}
export function currentState(state) {
  return {
    type: CURRENT_STATE,
    state
  };
}
export function errored(error) {
  return {
    type: ERRORED,
    error
  }
}
export function loading(load) {
  return {
    type: LOADING,
    load
  }
}
export function isDataAdding(isDataAdding) {
  return {
    type: ADD_LOADING,
    isDataAdding
  }
}
export function fetchData(data) {
  return {
    type: FETCH_DATA,
    data
  }
}

export function redirectPath(path) {
  return {
    type: REDIRECT_PATH,
    path
  }
}

export function questions(questions) {
  return {
    type: QUESTIONS,
    questions
  }
}

export function timerChoosed(timer) {
  return {
    type: IS_TIMER_CHOOSED,
    timer,
  }
}
export function questionChoosed(questionNo) {
  return {
    type: IS_SUBJECT_TOPIC_CHOOSED,
    questionNo
  }
}
export function setFontSize(fontSize) {
  return {
    type: SET_FONT_SIZE,
    fontSize
  }
}

export function invalidLogin(invalidLogin) {
  return {
    type: INVALID_CREDENTIALS,
    invalidLogin
  };
}

export function isLoading(isLoading) {
  return {
    type: LANDING_PAGES_LOADING,
    isLoading
  }
}
export function timePerQuestion(time) {
  return {
    type: TIME_PER_QUESTION,
    time 
  }
}

export function enableKeyboard(enable) {
  return {
    type: ENABLE_KEYBOARD,
    enable 
  }
}
export function getToken(token) {
  return {
    type: GET_TOKEN,
    token 
  }
}


export function getData() {
  return function (dispatch, getState) {
    const state = getState();
    const path = state.main.state;
    dispatch(loading(true));
    return instance
      .get(`${path}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        dispatch(loading(false));
        return response;
      })
      .then(res => {
        if(res.data.status == "Success"){
          dispatch(fetchData(res.data.data))
        }
        else{
          dispatch(fetchData([]))
        }
      })
      .catch(error => {
        dispatch(loading(false));
        dispatch(errored(error))
      });
  };
}

export function postData(data) {
  return function (dispatch, getState) {
    const state = getState();
    const path = state.main.state;
    const redirect = state.main.path
    dispatch(isDataAdding(true));
    return instance
      .post(`${path}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        dispatch(isDataAdding(false));
        return response;
      })
      .then(response => {
        // dispatch(getData());
        if (response.data.status === 'Success' || response.data === true) {
          if (path === 'proofreader') {
            swal(language.updated, language.updatedMsg , "success")
            hashHistory.push("/proof-reader")
          } else {
            swal(language.added, language.addedMsg, "success")
            hashHistory.push(`/admin/list_${redirect}`)
          }
        } else if (response.data.status === 'Failure' || response.data === false) {
          swal(language.oops, `${response.data.errorMessage}`, "error");
        }
      })
      .catch(error => {
        dispatch(isDataAdding(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}

export function updateData(data) {
  return function (dispatch, getState) {
    const state = getState();
    const redirect = state.main.path

    const body = data.data;
    const id = data.id;
    const path = data.path;

    dispatch(isDataAdding(true));
    return instance
      .put(`${path}/${id}`, body, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        return response;
      })
      .then(response => {
        dispatch(isDataAdding(false));
        // dispatch(getData());
        if (response.data.status == 'Success' || response.data === true) {
          swal(language.updated, language.updatedMsg, "success");
          hashHistory.push(`/admin/list_${redirect}`)
        } else if (response.data.status === 'Failure' || response.data === false) {
          swal(language.oops, `${response.data.errorMessage}`, "error");
        }
      })
      .catch(error => {
        dispatch(isDataAdding(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}

export function updateAnswer(data) {
  const body = data.data;
  return function (dispatch, getState) {
    return instance
      .put(`examdetails/updateExamDetails`, body, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        return response;
      })
      .catch(error => dispatch(errored(error)));
  };
}

export function deleteData(path) {
  return function (dispatch) {

    try {
      swal({
        title: "Are you sure?",
        text: "Once you delete, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          dispatch(loading(true));
          return instance.delete(`${path}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(response => {
              dispatch(loading(false));
              return response;
            })
            .then(response => {
              dispatch(getData());
              if (response.data.status === 'Success' || response.data === true) {
                swal(language.deleted, language.deletedMsg, "success");
              } else if (response.data.status === 'Failure' || response.data === false) {
                swal(language.oops, `${response.data.errorMessage}`, "error");
              }
            })
            .catch(error => {
              dispatch(loading(false));
              dispatch(errored(error))
              errorPopup()
            });
        } else {
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
}


export function updateMessage(data) {
  const body = data.data;
  const id = data.id;
  return function (dispatch, getState) {
    const state = getState();
    const path = state.main.state;

    dispatch(loading(true));
    return instance
      .put(`${path}/${id}`, body, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        dispatch(loading(false));
        return response;
      })
      .then(items => {
        dispatch(getData());
      })
      .catch(error => {
        dispatch(loading(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}

export function uploadData(data) {
  return function (dispatch, getState) {
    const state = getState();
    const path = state.main.state;
    const redirect = state.main.path
    dispatch(isDataAdding(true));
    return instance
      .post(`${path}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })

      .then(response => {
        dispatch(isDataAdding(false));
        return response;
      })
      .then(response => {
        const data = response.data.data;
        if (response.data.status === 'Success' || response.data === true) {
          if (data.lawSchoolCreation === 1 && data.studentCreation === 1 && data.usersCreation === 1) {
            if (data.existingStudentCodeList.length > 0 && data.existingStudentEmailList.length > 0) {
              swal(language.uploaded, language.lsEmailorCodeExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            } else if (data.existingStudentCodeList.length > 0) {
              swal(language.uploaded, language.lsCodeExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            } else if (data.existingStudentEmailList.length > 0) {
              swal(language.uploaded, language.lsEmailExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            } else if (data.existingUserNameEmailListInUsersTable.length > 0) {
              swal(language.uploaded, language.lsUserEmailandStudentEmailExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            }
            swal(language.uploaded, language.uploadedMsg, "success");
            hashHistory.push(`/admin/list_${redirect}`);
          }
          if (data.lawSchoolCreation === 1 && data.studentCreation === 0 && data.usersCreation === 1) {
            if (data.existingStudentCodeList.length > 0 && data.existingStudentEmailList.length > 0) {
              swal(language.uploaded, language.lsEmailorCodeExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            } else if (data.existingStudentCodeList.length > 0) {
              swal(language.uploaded, language.lsCodeExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            } else if (data.existingStudentEmailList.length > 0) {
              swal(language.uploaded, language.lsEmailExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            } else if (data.existingUserNameEmailListInUsersTable.length > 0) {
              swal(language.uploaded, language.lsUserEmailandStudentEmailExist, "success");
              hashHistory.push(`/admin/list_${redirect}`);
            }
          }
        } else if (response.data.status === 'Failure' || response.data === false) {
          if (path == 'student') {
            swal(language.oops, language.lsfailCodeorEmailExist, "error");
          } else {
            if (response.data.data.existingSchoolEmail != null && response.data.data.existingSchoolName != null && response.data.data.existingSchoolCode != null) {
              swal(language.oops, language.lsfailAllExist, "error");
            } else if (response.data.data.existingSchoolEmail != null && response.data.data.existingSchoolName != null) {
              swal(language.oops, language.lsfailNameandEmailExist, "error");
            } else if (response.data.data.existingSchoolCode != null && response.data.data.existingSchoolName != null) {
              swal(language.oops, language.lsfailCodeandNameExist, "error");
            } else if (response.data.data.existingSchoolCode != null && response.data.data.existingSchoolEmail != null) {
              swal(language.oops, language.lsfailCodeorEmailExist, "error");
            } else if (response.data.data.existingSchoolName != null) {
              swal(language.oops, language.lsfailNameExist, "error");
            } else if (response.data.data.existingSchoolCode != null) {
              swal(language.oops, language.lsfailCodeExist, "error");
            } else if (response.data.data.existingSchoolEmail != null) {
              swal(language.oops, language.lsfailEmailExist, "error");
            } else {
              errorPopup()
            }
          }
        }
      })
      .catch(error => {
        dispatch(isDataAdding(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}

export function uploadStudent(data) {
  return function (dispatch, getState) {
    const state = getState();
    const path = state.main.state;
    const redirect = state.main.path
    dispatch(isDataAdding(true));
    return instance
      .post(`${path}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })

      .then(response => {
        dispatch(isDataAdding(false));
        return response;
      })
      .then(response => {
        if (response.data.status === "Success" || response.data === true) {
          // swal(language.uploaded, language.uploadedMsg, "success");
          swal(language.uploaded, language.uploadedMsg, "success");
          hashHistory.push(`/admin/list_${redirect}`);

        } else if (response.data.status === 'Failure' || response.data === false) {
          errorPopup()
        }
      })
      .catch(error => {
        dispatch(isDataAdding(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}

export function fetchStudentSetting(){

  return function (dispatch) {
    const studentSession = getSession("StudentSession");

    try {
      instance.get(`settings/${studentSession.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
          if (res.data.status == 'Success') {
            dispatch(timePerQuestion(res.data.data.settingsStandardQuestionAnswerTime))
          }else{
            dispatch(timePerQuestion(1.48))
          }
        })
        .catch(err => {
          dispatch(timePerQuestion(1.48))
        });
    } catch (e) {
      console.log(e);
    }
  
  }
}

// Landing Pages

export function login(data, checked) {
  return function (dispatch) {
    dispatch(isLoading(true));
    return axios.post(`${BASE}/authenticate`, data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': "application/json",
      }
    })
      .then(result => {
        return result;
      })
      .then(response => {
        localStorage.setItem('token' , response.data.data.token)
        // dispatch(getToken(response.data.data.token))
        dispatch(isLoading(false));
        if (response.data.status === "Success") {
          const logindata = response.data.data.loginDto
          var userDetails = JSON.stringify({
            userId: logindata.userId,
            name: logindata.userName,
            user_role: logindata.userRole,
            user_type: logindata.userType,
            // userOrganisationId: response.data.data.userOrganisationId,
            userLawschoolID: logindata.userLawschoolID,
            userStudentID: logindata.userStudentID,
            userPrimaryEmail: logindata.userPrimaryEmail,
            settingsDefaultTiming: logindata.jpaSettings == null ? 4 : logindata.jpaSettings.settingsDefaultTiming,
            settingsId : logindata.jpaSettings == null ? null : logindata.jpaSettings.settingsId
          });
          switch (logindata.userType) {
            case "1":
              checked ? localStorage.setItem("AdminSession", userDetails) : sessionStorage.setItem("AdminSession", userDetails)
              hashHistory.push("/admin")
              break;
            case "2":
              if(logindata.userLawschoolID == null ||logindata.userLawschoolID == 'null' || logindata.userLawschoolID == ''){
                swal('', language.restrictLogin, 'error')
              }
              else{
                checked ? localStorage.setItem("LawSchoolSession", userDetails) : sessionStorage.setItem("LawSchoolSession", userDetails)
                hashHistory.push("/law-school")
              }
              break;
            case "3":
              if(logindata.userStudentID == null ||logindata.userStudentID == 'null' || logindata.userStudentID == ''){
                  swal('', language.restrictLogin, 'error')
              }
              else{
                checked ? localStorage.setItem("StudentSession", userDetails) : sessionStorage.setItem("StudentSession", userDetails)
                hashHistory.push("/students")
              }
              break;
            case "4":
              checked ? localStorage.setItem("ProofReaderSession", userDetails) : sessionStorage.setItem("ProofReaderSession", userDetails)
              hashHistory.push("/proof-reader")
              break;
            default:
              return null;
          }
        } else {
          dispatch(invalidLogin(true));
        }
      })
      .catch(error => {
        dispatch(isLoading(false));
        if (error.response.data.message == "Bad credentials") {
          dispatch(invalidLogin(true));
        }
        else{
          dispatch(errored(error))
          errorPopup()
        }
      });  
  };
}

export function signup(data) {
  return function (dispatch) {
    dispatch(isLoading(true));
    return axios
      .post(`${BASE}/enquiry`, data,{
        headers: {
        'Content-Type': 'application/json'
      }})
      .then(result => {
        dispatch(isLoading(false));
        return result;
      })
      .then(response => {
        if (response.data.status === "Success") {
          swal(
            language.submitted,
            language.lsEnquirySubmitted,
            "success"
          );
          hashHistory.push("/");
        } else {
          swal(
            language.oops,
             language.lsEnquiryExist,
            "warning"
          );
        }
      })
      .catch(error => {
        dispatch(isLoading(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}

export function setPassword(data, modulename) {
  return function (dispatch) {
    dispatch(isLoading(true));
    return axios
      .post(`${BASE}/users/password`, data,{
        headers: {
        'Content-Type': 'application/json'
      }})
      .then(response => {
        dispatch(isLoading(false));
        return response;
      })
      .then(items => {
        return items;
      })
      .then(response => {
        dispatch(isLoading(false));
        if (response.data.status === "Success") {
          sessionStorage.removeItem(modulename)
          localStorage.removeItem(modulename)
          // window.location.reload('/')
          hashHistory.push('/')
          swal(language.updated, language.passwordUpdated, "success");
        } else {
          swal(language.passwordNotUpdated, "", "warning");
        }
      })
      .catch(error => {
        dispatch(isLoading(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}

export function recoverPassword(data) {
  return function (dispatch) {
    dispatch(isLoading(true));
    return axios
      .post(`${BASE}/users/password/recover`, data,{
        headers: {
        'Content-Type': 'application/json'
      }})
      .then(response => {
        dispatch(isLoading(false));
        return response;
      })
      .then(items => {
        return items;
      })
      .then(response => {
        if (response.data.status === "Success") {
          hashHistory.push("/");
          swal(language.updated, language.recoverPasswordLink, "success");
        } else {
          swal(language.recoverpasswordError, "", "warning");
        }
      })
      .catch(error => {
        dispatch(isLoading(false));
        dispatch(errored(error))
        errorPopup()
      });
  };
}