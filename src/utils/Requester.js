import swal from "sweetalert";
import { getList } from "../actions/action-service";
import { selectedPath } from "./SelectedPath";

const base = "http://barbri.thinrootsoftware.com/barbriapi/";

export function getService() {
  return (dispatch, getState) => {
    const state = getState();
    const currentState = state.Admin.adminCurrentState;
    const path = selectedPath(currentState);

    fetch(base + path + ".php")
      .then(res => res.json())
      .then(res => {
        dispatch(getList(res));
        return res;
      })
      .catch(error => {
        console.log(error);
      });
  };
}



export function postService(api) {
  console.log('clicked success')
  
    if (api.add === true) {
      fetch(base + api.path + ".php", {
        method: "post",
        body: JSON.stringify(api.data)
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          swal("Data Added!", "Successfully!", "success");
          this.props.history.push(api.redirectUrl);
        } else {
          swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        }
      });
    } else if (api.edit === true) {
    }
}
