import { withFormsy } from "formsy-react";
import React from "react";

class MyInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type
        };
    }

    changeValue=(event)=> {
        this.props.setValue(event.currentTarget.value.trimStart());
    }
    showHide=(e) =>{
        e.preventDefault();
        e.stopPropagation();
        if (this.state.type === "input") {
            this.setState({
                type: "password"
            });
        } else if (this.state.type === "password") {
            this.setState({
                type: "input"
            });
        }
    }
    render() {
        var requiredClass = this.props.isPristine()
            ? ""
            : this.props.showRequired()
                ? "requiredClass"
                : "";
        const errorMessage = this.props.showRequired()
            ? `${this.props.fieldName} is required`
            : this.props.getErrorMessage();
        return (

            <div className="form-group mb-2">
                <input
                    onChange={this.changeValue}
                    className={this.props.className + " " + requiredClass}
                    type={this.state.type}
                    value={this.props.getValue() || ""}
                    autoComplete="off"
                    disabled={this.props.isDisable}
                    placeholder={this.props.placeholder}
                />

                {this.props.type === "password" ? (
                    <span
                        className="btn pe-7s-look password-eye-proofreader"
                        onClick={this.showHide}
                    ></span>
                ) : (
                        " "
                    )}

                <p className="error-color">
                    {this.props.isPristine() ? "" : errorMessage}
                </p>

                <span class="highlight"></span>
                <label>{this.props.labelName}<span className="text-danger"> *</span></label>
            </div>
        );
    }
}

export default withFormsy(MyInput);
