import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button, Modal, ModalHeader, ModalBody, Col, Row, Form, Input } from 'reactstrap';
import _ from "lodash";
import ReactTable from "react-table";
import axios from 'axios';
import swal from "sweetalert";
import Loader from 'react-loaders'
import Select from "react-select";

// const options = [
//     { value: "Category 1", label: "Category 1" },
//     { value: "Category 2", label: "Category 2" },
//     { value: "Category 3", label: "Category 3" },
//     { value: "Category 4", label: "Category 4" },
//     { value: "Category 5", label: "Category 5" },
// ];

export class VideoLibrary extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            // selectedOption: options[0],
            modal: false,
            status: 'Active',
            video: [],
            addoredit: 'add',
            editId: '',
            video_title: "",
            video_library_file_name: "",
            video_library_category: "",
            video_library_active: "y",
            errorMsg: ["", "", "", "", ""],
            showMsg: false,
            validateAll: [],
            loading: true
        };
        this.toggle = this.toggle.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    fetchData = () => {
        try {
            axios.get('http://barbri.thinrootsoftware.com/barbriapi/video_library.php')
                .then(res => {
                    const video = res.data;
                    this.setState({ data: video });
                })
        }
        catch (e) {
            alert('Error thrown from video-library fetchData function')
        }
    }

    componentDidMount() {
        this.fetchData();
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
    }

    fieldHandler(field, event) {
        let row = this.state;
        //let errorMsg = this.state.errorMsg;
        let videoUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        let letterReg = /([A-Za-z])/;
        let errorMsg = this.state.errorMsg
        switch (field) {
            case "videotitle":
                row.video_title = event.target.value;
                event.target.value.trim() === '' ? errorMsg[0] = 'Invalid Title'
                    : letterReg.test(event.target.value) === false ? errorMsg[0] = "number is not accept"
                        : errorMsg[0] = ''

                this.setState({ video_title: event.target.value, errorMsg: errorMsg });
                break;
            case "videofilename":
                event.target.value.trim() === '' ? errorMsg[1] = 'Invalid Url Like (https://www.youtube.com/)'
                    : videoUrl.test(event.target.value) === false ? errorMsg[1] = "Invalid Url"
                        : errorMsg[1] = ''

                row.video_library_file_name = event.target.value;
                this.setState({ video_library: event.target.value, errorMsg: errorMsg });
                break;
            case "category":
                event.target.value.trim() === '' ? errorMsg[2] = 'select the category'
                    : letterReg.test(event.target.value) === false ? errorMsg[2] = ""
                        : errorMsg[2] = ''
                row.video_library_category = event.target.value;
                this.setState({ video_library_category: event.target.value });
                break;
            case "status":
                row.video_library_active = event.target.value;
                this.setState({ video_library_active: event.target.value });
                break;
        }
        this.fetchData();
    }

    deleteUser = row => {
        try {
            swal({
                title: "Are you sure?",
                text:
                    "Once deleted, you will not be able to recover!",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    const code = row.original.video_library_id;
                    let url = `http://barbri.thinrootsoftware.com/barbriapi/delete_videolibrary.php?id=${code}`;
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
        catch (e) { alert('Error thrown from video-library deleteUser function') }
    };

    onSubmitField = (e) => {
        e.preventDefault()
        try {
            let validateAll = false;
            let obj = this.state;
            validateAll = this.state.errorMsg.every((val, i, arr) => val === "" ? true : false); // true
            if (validateAll === true) {
                if (
                    obj['video_title'] == '' ||
                    obj['video_library_file_name'] == ''
                )
                    validateAll = false
            }
            if (validateAll === true) {
                this.state.addoredit === 'add' ?
                    fetch("http://barbri.thinrootsoftware.com/barbriapi/video_library.php", {
                        method: 'post',
                        body: JSON.stringify({
                            "video_title": this.state.video_title,
                            "video_library_file_name": this.state.video_library_file_name,
                            "video_library_category": this.state.video_library_category,
                            "video_library_active": this.state.video_library_active
                        })
                    })
                        .then(res => {
                            console.log(res);
                            this.setState(prevState => ({
                                modal: !prevState.modal,
                            }));
                            swal("Data Added!", "Successfully!", "success");
                            this.state.video_title = "";
                            this.state.video_library_file_name = "";
                            this.state.video_library_category = "";
                            //  this.state.video_library_active="";
                            this.fetchData();
                        }
                        ) : fetch(`http://barbri.thinrootsoftware.com/barbriapi/update_videolibrary.php?id=${this.state.editId}`, {
                            method: 'post',
                            body: JSON.stringify({
                                "video_title": this.state.video_title,
                                "video_library_file_name": this.state.video_library_file_name,
                                "video_library_category": this.state.video_library_category,
                                "video_library_active": this.state.video_library_active
                            })
                        })
                            .then(res => {
                                console.log(res);
                                this.setState(prevState => ({
                                    modal: !prevState.modal,
                                }));
                                swal("Row updated!", "Successfully!", "success");
                                this.fetchData();
                            }
                            )
                this.setState({
                    video_title: '',
                    video_library_file_name: '',
                    video_library_category: '',
                })
            } else {
                this.setState({
                    showMsg: true
                });
            }
        }
        catch (e) {
            alert('Error thrown from video-library add, edit function')
        }
    }

    toggle(row) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            video_title: row.original.video_title,
            video_library_file_name: row.original.video_library_file_name,
            video_library_category: row.original.video_library_category,
            video_library_active: row.original.video_library_active,
            addoredit: 'edit',
            editId: row.original.video_library_id,
            // selectedOption: option
        }));
    }

    goBack() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            addoredit: 'add',
            showMsg: false,
            // selectedOption: option
        }));
    }

    Addbtn = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }

    columns = [
        {
            columns: [
                {
                    Header: props => <div><span>Video Title </span><i className="lnr-sort-alpha-asc"></i></div>,
                    accessor: "video_title",
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: props => <div><span>Video File Name</span></div>,
                    accessor: "video_library_file_name",
                    filterable: false,
                    sortable: false,
                    Cell: row => (
                        <a href={row.value} className="popup" style={{ textAlign: "center", width: "100%" }} target="blank">{row.value}</a>
                    )
                },
                {
                    Header: props => <div><span>Video Category </span><i className="lnr-sort-alpha-asc"></i></div>,
                    accessor: "video_library_category",
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: "Status",
                    accessor: "video_library_active",
                    Cell: row => (
                        <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
                    ),
                    id: "video_library_active",
                    Cell: ({ value }) => (value === 'y' ? "Active" : "Inactive"),
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "y") {
                            return row[filter.id] === 'y';
                        }
                        else {
                            return row[filter.id] === 'n';
                        }
                    },
                    Filter: ({ filter, onChange }) =>
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%", textAlign: "left" }}
                            value={filter ? filter.value : "all"} >
                            <option value="all">Show All</option>
                            <option value="y">Active</option>
                            <option value="n">InActive</option>
                        </select>
                },
                {
                    Header: props => <div><span>Last Modification Date</span><i className="lnr-sort-alpha-asc"></i></div>,
                    accessor: "video_library_last_modification_date.date",
                    filterable: false,

                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value.split(" ")[0].split("-")[1]}-{row.value.split(" ")[0].split("-")[2]}-{row.value.split(" ")[0].split("-")[0]}</div>
                    )
                },
                {
                    Header: "Actions",
                    accessor: "action",
                    filterable: false,
                    sortable: false,
                    width: 150,
                    Cell: row => (
                        <div className="text-center">
                            <Button className="mb-1 ml-3 btn-icon btn-icon-only"
                                onClick={this.toggle.bind(this, row)}
                                color="primary">
                                <i className="pe-7s-pen btn-icon-wrapper"> </i>
                            </Button>
                            <Button className="mb-1 ml-3 btn-icon btn-icon-only" onClick={this.deleteUser.bind(this, row)} color="primary">
                                <i className="pe-7s-trash btn-icon-wrapper"> </i>
                            </Button>
                        </div>
                    )
                },
            ]
        }
    ];

    render() {
        const { data } = this.state;
        // const { selectedOption } = this.state;
        const style = {
            paddingLeft: '5px',
            color: 'red',
        }
        console.log(this.state.addOredit)
        return (
            <div>
                {this.state.loading ?
                    <div className="loader-custom">
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
                    <div className="video-library-segment">
                        <div className="mb-2 heading-section">
                            <Row className="page-title">
                                <Col xs="12" sm="12" md="7" lg="7" xl="7">
                                    <h5 className="text-primary">Video Library</h5>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </Col>
                                <Col xs="12" sm="12" md="5" lg="5" xl="5" className="text-right">
                                    <div className="form-group">
                                        <button type="button" onClick={this.goBack} className="btn btn-outline-primary pr-5 pl-5 mr-2">Add</button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Fragment>
                            <ReactCSSTransitionGroup
                                component="div"
                                transitionName="TabsAnimation"
                                transitionAppear={true}
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}>
                                <Row>
                                    <Col md="12">
                                        <div className="main-card mb-3">
                                            <div>
                                                <ReactTable
                                                    className="bg-white"
                                                    data={data}
                                                    columns={this.columns}
                                                    defaultPageSize={5}
                                                    minRows={1}
                                                    filterable
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </ReactCSSTransitionGroup>
                        </Fragment>

                        <Modal isOpen={this.state.modal} toggle={this.goBack} className={this.props.className}>
                            <ModalHeader toggle={this.goBack}>{this.state.addoredit === "add" ? "Add Message" : "Edit Message"}</ModalHeader>
                            <ModalBody>
                                {this.state.showMsg === false ? null : (
                                    <div className="error-txt d-block justify-content-center text-center text-danger">
                                        Please fill all mandatory fields correctly{" "}
                                    </div>
                                )}
                                <div>
                                    <Row className="justify-content-center">
                                        <Col md="12">

                                            <form onSubmit={this.onSubmitField} className="form-group">
                                                <div className="form-group">
                                                    <label htmlFor="videotitle">Video Title<b style={style}>*</b></label>
                                                    <Input name="videotitle" type="text" className={"form-control"}
                                                        value={this.state.video_title}
                                                        onChange={this.fieldHandler.bind(
                                                            this,
                                                            "videotitle"
                                                        )}

                                                    />
                                                    <span className="text-danger">
                                                        {this.state.errorMsg[0]}
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="videofilename">Video File Name<b style={style}>*</b></label>
                                                    <Input name="videofilename" type="url" className={"form-control"}
                                                        value={this.state.video_library_file_name}
                                                        onChange={this.fieldHandler.bind(
                                                            this,
                                                            "videofilename"
                                                        )}

                                                    />
                                                    <span className="text-danger">
                                                        {this.state.errorMsg[1]}
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    {/* 
                                                    <label htmlFor="category">
                                                        Category<b style={style}>*</b>
                                                    </label>

                                                    <div className="form-group">
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={this.handleChange}
                                                            options={options}
                                                        />
                                                    </div> */}

                                                    <label htmlFor="category">Category<b style={style}>*</b></label>
                                                    <Input
                                                        name="category"
                                                        id="category"
                                                        type="select"
                                                        component="select"
                                                        className={"form-control"}
                                                        value={this.state.video_library_category}
                                                        onChange={this.fieldHandler.bind(this, 'category')}
                                                    >
                                                        {/* <option value="" className="select-option text-primary">Please select</option> */}
                                                        <option value="Category 1">Category 1</option>
                                                        <option value="Category 2">Category 2</option>
                                                        <option value="Category 3">Category 3</option>
                                                        <option value="Category 4">Category 4</option>
                                                        <option value="Category 5">Category 5</option>
                                                    </Input>
                                                    {/* <span className="text-danger">{this.state.errorMessage[2]}</span> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="status">Status<b style={style}>*</b></label>
                                                    <Row>
                                                        <Col md="3">
                                                            <div className="custom-radio custom-control">
                                                                <input
                                                                    name="status"
                                                                    type="radio"
                                                                    id="radioYes"
                                                                    className="custom-control-input"
                                                                    value="y"
                                                                    onChange={this.fieldHandler.bind(
                                                                        this,
                                                                        "status"
                                                                    )}
                                                                    checked={
                                                                        this.state
                                                                            .video_library_active === "y"
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                <label className="custom-control-label" for="radioYes">
                                                                    Active
                                                        </label>
                                                            </div>
                                                        </Col>
                                                        <Col md="3">
                                                            <div className="custom-radio custom-control">
                                                                <input
                                                                    name="status"
                                                                    type="radio"
                                                                    id="radioNo"
                                                                    className="custom-control-input"
                                                                    value="n"
                                                                    onChange={this.fieldHandler.bind(
                                                                        this,
                                                                        "status"
                                                                    )}
                                                                    checked={
                                                                        this.state
                                                                            .video_library_active === "n"
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                <label className="custom-control-label" for="radioNo">
                                                                    In Active
                                                        </label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="col-md-12 mt-3 pt-3" style={{ borderTop: '1px solid #ccc' }}>
                                                    <div className="form-group text-right">
                                                        <button type="submit" className="btn btn-outline-primary pr-5 pl-5 mr-2">Save</button>
                                                        <button type="button" className="btn btn-outline-primary pr-5 pl-5" onClick={this.goBack}>Back</button>
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


export default VideoLibrary
