//Authorization:
//Designed : by Rasbehari Das
//Purpose: Created for List of law school
//Description: Table for displaying notification data with popup for message sending

import React, { Fragment } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Form, Input } from 'reactstrap';
import ReactTable from "react-table";
import cx from 'classnames';
import swal from "sweetalert";
import Loader from 'react-loaders'

const initialRow = {
    notification_message: "",
    notification_publish: "",
    notification_created_by: "",
};

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isChecked: false,
            status: 'Active',
            ispublished: "Published",
            isToggleOn: true,
            data: [],
            notification_message: "",
            notification_publish: "",
            notification_created_by: "",
            addoredit: 'add',
            editId: '',
            username: '',
            lengthError: '',
            errorMsg: [],
            loading: true,
            show_errormessage: '',
            showMsg: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.goBack = this.goBack.bind(this);

    }

    fetchData = () => {
        try {
            fetch("http://barbri.thinrootsoftware.com/barbriapi/notification.php")
                .then(response => response.json())
                .then(data => this.setState({ data }));
        }
        catch (e) {
            console.log("error found in admin notification list data")
        }
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
        this.fetchData();
        localStorage.setItem("username", "Admin")
        var getusername = localStorage.getItem("username");
        this.setState({ username: getusername })
    }

    deleteUser = row => {
        try {
            swal({
                title: "Are you sure?",
                text:
                    "Once deleted, you will not be able to recover this !",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    const code = row.original.notification_id;
                    let url = `http://barbri.thinrootsoftware.com/barbriapi/delete_notification.php?id=${code}`;
                    console.log(url);
                    fetch(url, { method: "post" }).then(resp => console.log(resp));
                    swal("Row deleted successfully!", {
                        icon: "success"
                    });
                    this.fetchData();
                } else {
                    swal("Cancelled!");
                }
            });
        }
        catch (e) {
            console.log("error found in admin notification delete")
        }
    };

    fieldHandler(field, event) {
        let row = this.state;
        switch (field) {
            case "notificationmessage":
                row.notification_message = event.target.value;
                this.setState({ notification_message: event.target.value });
                event.target.value.trim() === '' ? errorMsg[0] = 'Invalid Valid' : errorMsg[0] = ''
                break;
            case "notificationcreatedby":
                row.notification_created_by = event.target.value;
                this.setState({ notification_created_by: event.target.value });
                console.log(this.state.notification_created_by)

                break;
            case "notificationpublish":
                row.notification_publish = event.target.value;
                this.setState({ notification_publish: event.target.value });
                console.log(this.state.notification_publish)

                break;
        }
    }

    toggle(row) {
        console.log(row.original);
        row.original.notification_publish === 'Published' ? this.setState({ isToggleOn: true }) : this.setState({ isToggleOn: false })
        this.setState(prevState => ({
            modal: !prevState.modal,
            notification_message: row.original.notification_message,
            addoredit: 'edit',
            editId: row.original.notification_id,
        }));
    }

    goBack() {
        this.setState(prevState => ({
            // this.setState({ addORedit: 'add', modal: !prevState.modal, })
            modal: !prevState.modal,
            addoredit: 'add',
            showMsg: false
        }))
    }

    savebtn = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }))
    }

    handleClick = (index) => {
        if (this.state.isToggleOn) {
            this.setState({ ispublished: "Unublished" })
        }
        else {
            this.setState({ ispublished: "Published" })
        }
        this.setState(function (prevState) {
            return { isToggleOn: !prevState.isToggleOn };
        });
        console.log(this.state.ispublished)
    }

    publishMessage = (index) => {
        try {
            console.log(index)
            if (index.notification_publish === "Published") {
                index.notification_publish = "Unpublished"
            }
            else {
                index.notification_publish = "Published"
            }
            let message = index.notification_message;
            let status = index.notification_publish;
            fetch(`http://barbri.thinrootsoftware.com/barbriapi/update_notification.php?id=${index.notification_id}`, {
                method: 'post',
                body: JSON.stringify({
                    "notification_message": message,
                    "notification_created_by": this.state.username,
                    "notification_publish": status,
                })
            })
                .then(res => {
                    console.log(res);
                    swal("Row updated!", "Successfully!", "success");
                    this.fetchData();
                }
                )
        }
        catch (e) {
            console.log("error found in admin notification published and unpublished update")
        }
    }

    columns = [
        {

            columns: [
                {
                    Header: <div><span>Date </span><i className="lnr-sort-alpha-asc"></i></div>,
                    accessor: "notification_created_date.date",
                    width: 185,
                    Cell: row => <div style={{ textAlign: "left", width: "100%" }}>{row.value.split(" ")[0].split("-")[1]}-{row.value.split(" ")[0].split("-")[2]}-{row.value.split(" ")[0].split("-")[0]}</div>
                },
                {
                    Header: <div><span>Message </span><i className="lnr-sort-alpha-asc"></i></div>,
                    accessor: "notification_message",
                    width: 500,
                    Cell: row => <div>{row.value.split(".")[0]}</div>
                },
                {
                    Header: <div><span>Created by </span></div>,
                    sortable: false,
                    accessor: "notification_created_by",
                    width: 120,
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }}>
                            <p>{this.state.username}</p>
                        </div>
                    )
                },
                {
                    Header: <div><span>Status</span><i className=""></i></div>,
                    sortable: false,
                    accessor: "notification_publish",
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }} >{row.value}
                        </div>
                    ),
                    id: "notification_publish",
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "y") {
                            return row[filter.id] === 'Published';
                        }
                        else {
                            return row[filter.id] === 'UnPublished';
                        }
                    },
                    Filter: ({ filter, onChange }) =>
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"} >
                            <option value="all">Show All</option>
                            <option value="y">Published</option>
                            <option value="n">UnPublished</option>
                        </select>
                },
                {
                    Header: <div><span>To be Published</span></div>,
                    id: "",
                    sortable: false,
                    filterable: false,
                    accessor: "",
                    Cell: row => (<div style={{ textAlign: "center", width: "100%" }}>
                        <Button className="mb-1 ml-1 btn-icon btn-icon-only publishedBtn" color="primary" onClick={() => this.publishMessage(row.original)}>
                            {row.original.notification_publish === "Published" ? 'Unpublish' : 'Publish'}
                        </Button>
                    </div>),
                },
                {
                    Header: "Action",
                    filterable: false,
                    sortable: false,
                    width: 120,
                    Cell: row => (
                        <div style={{ textAlign: "center", width: "100%" }} >
                            <Button className="mb-1  btn-icon btn-icon-only" color="primary" onClick={this.toggle.bind(this, row)}>
                                <i className="pe-7s-pen btn-icon-wrapper"> </i>
                            </Button>
                            <Button className="mb-1 ml-2 btn-icon btn-icon-only" color="primary" onClick={this.deleteUser.bind(this, row)}>
                                <i className="pe-7s-trash btn-icon-wrapper"> </i>
                            </Button>
                        </div>
                    )
                },
            ]
        }
    ];

    onSubmitField = (e) => {

        e.preventDefault();
        if (this.state.notification_message.trim() === '') {
            this.setState({ showMsg: true })
        }
        else {
            var find_length = this.state.notification_message;
            var final_length = find_length.length
            if (final_length >= 255) {
                this.setState({ lengthError: "Please Enter less than 255 characters!" })
            }
            else {
                console.log(this.state.ispublished, "NOTIFICATION PUBLISH FIELD")
                let notification_publish = this.state.ispublished;
                this.state.addoredit === 'add' ?
                    fetch("http://barbri.thinrootsoftware.com/barbriapi/notification.php", {
                        method: 'post',
                        body: JSON.stringify({
                            "notification_message": this.state.notification_message,
                            "notification_created_by": this.state.username,
                            "notification_publish": notification_publish,
                        })
                    })
                        .then(res => {
                            this.myFormRef.reset()
                            console.log(res);
                            this.setState(prevState => ({
                                modal: !prevState.modal,
                            }))
                            swal("Data Added!", "Successfully!", "success");
                            this.fetchData();
                            this.setState({ showMsg: false })
                        }
                        ) : fetch(`http://barbri.thinrootsoftware.com/barbriapi/update_notification.php?id=${this.state.editId}`, {
                            method: 'post',
                            body: JSON.stringify({
                                "notification_message": this.state.notification_message,
                                "notification_created_by": this.state.username,
                                "notification_publish": notification_publish,
                            })
                        })
                            .then(res => {
                                console.log(res);
                                this.myFormRef.reset()
                                this.setState(prevState => ({
                                    modal: !prevState.modal,
                                }))
                                swal("Row updated!", "Successfully!", "success");
                                this.fetchData();
                                this.setState({ showMsg: false })
                            }
                            )
            }
            // this.setState({
            //     notification_message: '',
            //     notification_publish: ''
            // })
        }

    }
    render() {
        const style = {
            paddingLeft: '5px',
            color: 'red'
        }
        console.log(this.state.data);
        const { data } = this.state;
        return (
            <div>
                {this.state.loading ? <div className="loader-custom">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="line-scale-pulse-out-rapid" />
                            <h6 className="mt-2">
                                Please Wait... Fetching Information
                             </h6>
                        </div>
                    </div>
                </div>
                    :
                    <div className="Notification">
                        <Fragment>
                            <div className="mb-2 heading-section">
                                <Row className="page-title">
                                    <Col xs="12" sm="12" md="7" lg="7" xl="7">
                                        <h5 className="text-primary">Notification</h5>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                    </Col>
                                    <Col xs="12" sm="12" md="5" lg="5" xl="5" className="text-right">
                                        <div className="form-group">
                                            <button className="btn btn-outline-primary pr-5 pl-5 mr-2" onClick={this.goBack}>Add</button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col md="12">
                                    <div className="main-card mb-3">
                                        <ReactTable
                                            className="bg-white"
                                            data={data}
                                            columns={this.columns}
                                            minRows={0}
                                            defaultPageSize={5}
                                            filterable
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Fragment>
                        <Modal isOpen={this.state.modal} toggle={this.goBack} className={this.props.className}>
                            <ModalHeader toggle={this.goBack}>
                                {this.state.addoredit === "add"
                                    ? "Add Message"
                                    : "Edit Message"}
                                {/* Add Message */}
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <Row className="justify-content-center">
                                        <Col md="12">
                                            <form onSubmit={this.onSubmitField} ref={(el) => this.myFormRef = el}>
                                                <div className="mb-2">
                                                    {this.state.showMsg === false ? ' ' : <p className="text-danger error-txt">Please Enter Message</p>}
                                                </div>
                                                <Row className="row-space">
                                                    <Col md="4" className="">
                                                        <label htmlFor="description">Write Your Message<b style={style}>*</b> </label>
                                                    </Col>
                                                    <Col md="7" className="">

                                                        <div className="form-group">
                                                            <Input name="description" type="textarea" className={"form-control"}
                                                                value={this.state.notification_message}
                                                                onChange={this.fieldHandler.bind(this, "notificationmessage")}
                                                                // required
                                                                ref={el => this.inputTitle = el}
                                                            />
                                                            <h6 style={{ color: 'red', fontSize: '13px', padding: '5px 0 0 0' }}>{this.state.lengthError}</h6>
                                                            <span className="text-danger ">{this.state.errorMsg[0]}</span>

                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="4">
                                                        <label htmlFor="description">Publish<b style={style}>*</b> </label>
                                                    </Col>
                                                    <Col md="7">
                                                        <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                                                            data-off-label="OFF"
                                                            onClick={this.handleClick}>
                                                            <div className={cx("switch-animate", {
                                                                'switch-on': this.state.isToggleOn,
                                                                'switch-off': !this.state.isToggleOn
                                                            })}>
                                                                <input type="checkbox" id="yesorno" />
                                                                <span className="switch-left bg-primary">Yes
                                                                    </span>
                                                                <label>&nbsp;</label>
                                                                <span className="switch-right bg-primary">No</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="row">
                                                    <div className="col-md-12 mt-3 pt-3">
                                                        <div className="form-group text-right">
                                                            <button type="submit" className="btn btn-outline-primary pr-5 pl-5 mr-2">Save</button>
                                                            <button type="button" className="btn btn-outline-primary pr-5 pl-5" onClick={this.goBack}>Back</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div >
                }
            </div>
        )
    }
}