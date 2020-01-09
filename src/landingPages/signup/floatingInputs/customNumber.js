import { withFormsy } from "formsy-react";
import React from "react";
import InputMask from "react-input-mask";

class MyInput extends React.Component {
    constructor(props) {
        super(props);
    }

    changeValue=(event)=> {
        this.props.setValue(event.currentTarget.value);
    }

    render() {
        const errorMessage = this.props.getErrorMessage();
        var requiredClass = this.props.isPristine()
            ? ""
            : this.props.showRequired()
                ? "requiredClass"
                : "";

        return (
            <div>
                <InputMask
                    aria-label="Phone number"
                    onChange={this.changeValue}
                    className={this.props.className + " " + requiredClass}
                    type="text"
                    mask="999-999-9999"
                    placeholder={this.props.placeholder}
                    value={this.props.getValue() || ""}
                />
                <span className="text-danger">{errorMessage}</span>

                <span class="highlight"></span>
                <label>{this.props.labelName}<span className="text-danger"> *</span></label>

            </div>

        );
    }
}

export default withFormsy(MyInput);
