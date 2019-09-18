import React, { Fragment, Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Form, Input } from 'reactstrap';
import ReactTable from "react-table";
import cx from 'classnames';
import swal from "sweetalert";
import Loader from 'react-loaders'
import '../../../assets/custom/admin/_admin_messages'

export class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isChecked: false,
            profileStatus: 'g',
            status: 'Active',
            ispublished: "Published",
            isToggleOn: true,
            data: [],
            content_message: "",
            message_created_by: "", //admin 
            message_published_at: "",//date
            message_status: "",//published or unpublished
            message_publish_to: "",//law school or school
            addoredit: 'add',
            editId: '',
            username: '',
            lengthError: '',
            errorMsg: [""],
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
            fetch("http://barbri.thinrootsoftware.com/barbriapi/message_notify.php")
                .then(response => response.json())
                .then(data => this.setState({ data }));
        }
        catch (e) {
            console.log("error found in admin messages list data")
        }
    };

    componentDidMount() {
        this.fetchData();
        localStorage.setItem("username", "Admin")
        var getusername = localStorage.getItem("username");
        this.setState({ username: getusername })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
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
                    const code = row.original.message_id;
                    let url = ` http://barbri.thinrootsoftware.com/barbriapi/delete_message.php?id=${code}`;
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
            console.log("error found in admin message delete")
        }
    };

    fieldHandler(field, event) {
        let row = this.state;
        switch (field) {
            case "messagecontents":
                row.content_message = event.target.value;
                this.setState({ content_message: event.target.value });
                event.target.value.trim() === '' ? errorMsg[0] = 'Invalid Valid' : errorMsg[0] = ''
                break;
            case "messagecreatedby":
                row.message_created_by = event.target.value;
                this.setState({ message_created_by: event.target.value });
                console.log(this.state.message_created_by)
                break;
            case "messagepublishto":
                row.message_publish_to = event.target.value;
                this.setState({ message_publish_to: event.target.value });
                console.log(this.state.message_publish_to)
                break;
            case "messagestatus":
                row.message_status = event.target.value;
                this.setState({ message_status: event.target.value });
                console.log(this.state.message_status)
                break;
        }
    }

    statusHandler = (e) => {
        this.setState({ profileStatus: e.target.value })
        console.log(e.target.value);
    }

    toggle(row) {
        console.log(row.original);
        row.original.message_status === 'Published' ? this.setState({ isToggleOn: true }) : this.setState({ isToggleOn: false })
        this.setState(prevState => ({
            modal: !prevState.modal,
            content_message: row.original.message_title,
            addoredit: 'edit',
            profileStatus: row.original.message_publish_to,
            editId: row.original.message_id,
        }));
    }

    goBack() {
        this.setState(prevState => ({
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
            this.setState({ ispublished: "UnPublished" })
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
            if (index.message_status === "Published") {
                index.message_status = "UnPublished"
            }
            else {
                index.message_status = "Published"
            }
            fetch(`http://barbri.thinrootsoftware.com/barbriapi/Update_message_notify.php?id=${index.message_id}`, {
                method: 'post',
                body: JSON.stringify({
                    "content_message": index.message_title,
                    "message_created_by": this.state.username,
                    "message_publish": index.message_status,
                    "publish_to": index.message_publish_to,
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
            console.log("error found in admin message publish and unpublish update")
        }
    }
    columns = [
        {

            columns: [
                {
                    Header: <div><span>Date </span><i className="lnr-sort-alpha-asc"></i></div>,
                    accessor: "message_created_at.date",
                    width: 110,
                    Cell: row => <div style={{ textAlign: "left", width: "100%" }}>{row.value.split(" ")[0]}</div>
                },
                {
                    Header: <div><span>Message </span><i className="lnr-sort-alpha-asc"></i></div>,
                    accessor: "message_title",
                    width: 450,
                    Cell: row => <div>{row.value}</div>

                },
                {
                    Header: <div><span>Created by </span></div>,
                    sortable: false,
                    accessor: "message_created_by",
                    width: 120,
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }}>
                            <p>{this.state.username}</p>
                        </div>
                    )
                },
                {
                    Header: <div><span>Message Published To</span><i className=""></i></div>,
                    sortable: false,
                    accessor: "message_publish_to",
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }} >{row.value}
                        </div>
                    ),
                    id: "message_publish_to",
                    Cell: ({ value }) =>
                        value === "g" ? "General" : value === "l" ? "LawSchool" : "Students",
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "g") {
                            return row[filter.id] === "g";
                        } else if (filter.value === "l") {
                            return row[filter.id] === "l";
                        } else {
                            return row[filter.id] === "s";
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="g">General</option>
                            <option value="l">LawSchool</option>
                            <option value="s">Students</option>
                        </select>
                    )
                },
                {
                    Header: <div><span>Status</span><i className=""></i></div>,
                    sortable: false,
                    accessor: "message_status",
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }} >{row.value}
                        </div>
                    ),
                    id: "message_status",
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
                    filterable: false,
                    sortable: false,
                    accessor: "",
                    Cell: row => (<div style={{ textAlign: "center", width: "100%" }}>
                        <Button className="mb-1 ml-1 btn-icon btn-icon-only publishedBtn" color="primary" onClick={() => this.publishMessage(row.original)}>
                            {row.original.message_status === "Published" ? 'Unpublish' : 'Publish'}
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
                            <Button className="mb-1  btn-icon btn-icon-only" color="primary" onClick={this.toggle.bind(this, row)} >
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
        try {
            e.preventDefault();
            if (this.state.content_message.trim() === '') {
                this.setState({ showMsg: true })
            }
            else {
                var find_length = this.state.content_message;
                var final_length = find_length.length
                if (final_length >= 255) {
                    this.setState({ lengthError: "Please Enter less than 255 characters!" })
                }
                else {
                    console.log(this.state, "NOTIFICATION PUBLISH FIELD")
                    this.state.addoredit === 'add' ?
                        fetch("http://barbri.thinrootsoftware.com/barbriapi/message_notify.php", {
                            method: 'post',
                            body: JSON.stringify({
                                "content_message": this.state.content_message,
                                "message_created_by": this.state.username,
                                "publish_to": this.state.profileStatus,
                                "message_publish": this.state.ispublished,
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
                            ) : fetch(`http://barbri.thinrootsoftware.com/barbriapi/Update_message_notify.php?id=${this.state.editId}`, {
                                method: 'post',
                                body: JSON.stringify({
                                    "content_message": this.state.content_message,
                                    "message_created_by": this.state.username,
                                    "publish_to": this.state.profileStatus,
                                    "message_publish": this.state.ispublished
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
                this.setState({
                    content_message: '',
                    publish_to: '',
                    message_publish: ''
                })
            }
        }
        catch (e) {
            console.log("error found in admin message add and edit")
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
            <div className="admin-messages-header">
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
                                        <h5 className="text-primary">Messages</h5>
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
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <Row className="justify-content-center">
                                        <Col md="12">
                                            <form onSubmit={this.onSubmitField} ref={(el) => this.myFormRef = el}>
                                                <div className="mb-2">
                                                    {this.state.showMsg === false ? ' ' : <p className="text-danger error-txt">Please fill all mandatory fields correctly</p>}
                                                </div>
                                                <Row className="row-space">
                                                    <Col md="4" className="">
                                                        <label htmlFor="description">Write Your Message<b style={style}>*</b> </label>
                                                    </Col>
                                                    <Col md="7" className="">
                                                        <div className="form-group">
                                                            <Input name="description" type="textarea" className={"form-control"}
                                                                value={this.state.content_message}
                                                                onChange={this.fieldHandler.bind(this, "messagecontents")}
                                                                ref={el => this.inputTitle = el}
                                                            />
                                                            <h6 style={{ color: 'red', fontSize: '13px', padding: '5px 0 0 0' }}>{this.state.lengthError}</h6>
                                                            <span className="text-danger ">{this.state.errorMsg[0]}</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <label htmlFor="">Message Published To:</label>
                                                    </Col>
                                                    <Col md="4"></Col>
                                                    <Col md="2">
                                                        <div className="custom-radio custom-control">
                                                            <input name="profile" type="radio" id="radioYes" className="custom-control-input" value='g'
                                                                onChange={this.statusHandler}
                                                                checked={

                                                                    this.state.profileStatus === "g"
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <label className="custom-control-label" for="radioYes" >General</label>
                                                        </div>
                                                    </Col>
                                                    <Col md="3">
                                                        <div className="custom-radio custom-control">
                                                            <input name="profile" type="radio" id="radioNo" className="custom-control-input" value='l'
                                                                onChange={this.statusHandler}
                                                                checked={
                                                                    this.state.profileStatus === "l"
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <label className="custom-control-label" for="radioNo">Law School</label>
                                                        </div>
                                                    </Col>
                                                    <Col md="2">
                                                        <div className="custom-radio custom-control admin-message-left">
                                                            <input name="profile" type="radio" id="radioDeleted" className="custom-control-input" value='s'
                                                                onChange={this.statusHandler}
                                                                checked={
                                                                    this.state.profileStatus === "s"
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                            <label className="custom-control-label" for="radioDeleted">Students</label>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
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

export default index
