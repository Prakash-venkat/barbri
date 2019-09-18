import { currentDate } from './CurrentDate'
import { ADMIN_USERS, ADMIN_LAW_SCHOOL, ADMIN_STUDENTS, ADMIN_MESSAGES, ADMIN_NOTIFICATION, ADMIN_VIDEO_LIBRARY, ADMIN_SETTINGS } from '../constants/requester'

import { postService } from './Requester';
import { constructData } from '../actions/action-service'
import { selectedPath } from "./SelectedPath";


export function onSubmitHandler(){
    
    return (dispatch, getState) => {
        const state = getState();

        const currentState = state.Admin.adminCurrentState;
        const firstName = state.Inputs.firstName;
        const lastName = state.Inputs.lastName;
        const email = state.Inputs.email;
        const number = state.Inputs.phoneNumber;
        const role = state.Inputs.role;
        const status = state.Inputs.status;
        const userName = state.Inputs.userName;
        const password = state.Inputs.password;

    const constructApiData = {
        path :selectedPath(currentState),
        add : state.RequestReducer.add,
        edit : state.RequestReducer.edit,
        redirectUrl : state.RequestReducer.redirectUrl,
        data : state.RequestReducer.constructData,
    }

        if(currentState === ADMIN_USERS){
            const data = {
                user_first_name: firstName,
                user_last_name: lastName,
                user_primary_email: email,
                user_phone: number,
                user_role: role,
                user_profile_active: status,
                user_name: userName,
                user_password: password,
                user_last_modified_at: currentDate,
            }

            dispatch(constructData(data))

            postService(constructApiData);
            

        }else if(currentState === ADMIN_LAW_SCHOOL){

        }
        else if(currentState === ADMIN_STUDENTS){
            
        }
        else if(currentState === ADMIN_VIDEO_LIBRARY){
            
        } 
        else if(currentState === ADMIN_MESSAGES){
            
        }
        else if(currentState === ADMIN_NOTIFICATION){
            
        }
        else if(currentState === ADMIN_SETTINGS){
            
        }
    }
}