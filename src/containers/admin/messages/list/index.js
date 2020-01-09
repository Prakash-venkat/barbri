import React, { Fragment, Component } from 'react'
import { Link } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import ReactTable from "react-table";
import moment from 'moment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from "react-switch";
import ReadMoreAndLess from 'react-read-more-less';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive"
import { language } from '../../../../utils/locale/locale';
import SortIcon from '../../../../components/admin/sortIcon';
import GlobalSearchComponent from '../../../../components/admin/globalSearch';
import { currentState, deleteData, getData, updateData, redirectPath } from '../../../../actions/actionMain';
import FilterInputComponent from '../../../../components/admin/FilterInputComponent';
import ReactTooltip from 'react-tooltip'
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle'


var messageInitialRow = {
    messageStatus: "",
    messagePublishedTo: "g",
}

class ListMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminSession: getSession("AdminSession"),
            data: [],
            rowData: messageInitialRow,
            filteredData: [],
        };
    }

    componentDidMount() {

        customPageTitle('Messages')
        this.props.currentState("admin/messages")
        this.props.getData()
       
    }

    componentWillReceiveProps({ listData }) {
        var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;

        var data = datalistCond.filter(a => { return a.messageStatus != "d" })
        this.setState({
            data: this.state.adminSession.user_role === "1" ? datalistCond : data,
            filteredData: this.state.adminSession.user_role === "1" ? datalistCond : data
        });
    }

    handleSetData = data => {
        this.setState({
            filteredData: data
        })
    }

    updateStatus = (row, e) => {
        this.props.redirectPath("messagenotify")
        var publishDate = null;
        if (row.messageStatus === 'n') {
            let date = Date.now()
            publishDate = moment(date).format("MM-DD-YYYY");
        }
        else {
            publishDate = row.messagePublishedAt;
        }
        const body = JSON.stringify({
            messageTitle: row.messageTitle,
            messageOrganisation: row.messageOrganisation,
            messageContents: row.messageContents,
            messagePublishedTo: row.messagePublishedTo,
            messageStatus: row.messageStatus === 'y' ? 'n' : 'y',
            messageCreatedBy: row.messageCreatedBy,
            messageCreatedAt: row.messageCreatedAt,
            messagePublishedBy: row.messagePublishedBy,
            messagePublishedAt: publishDate,
            messageArchive: row.messageArchive,
            messageRead: row.messageRead,
            messageType: 1,
        })

        this.props.updateData({
            data: body,
            id: "",
            path: `messages/${row.messageId}`
        })
        .then(res =>{
            this.props.getData();
        })
        
    };

    deleteMessage = (row) => {
        const code = row.original.messageId
        this.props.deleteData(`messages/${code}`)
    }


    columns = [
        {
            columns: [
                {
                    Header: <SortIcon dataList={language.date} sort={true} number={true} />,
                    Filter: props => <FilterInputComponent aria_label="message created" {...props} />,
                    width: 120,
                    accessor: "messageCreatedAt",
                    Cell: row => <div className="msedge-table-content-right-align">
                        <span> {row.value}</span>
                    </div>
                },
                {
                    Header: <SortIcon dataList={language.message} sort={true} />,
                    Filter: props => <FilterInputComponent aria_label="message" {...props} />,
                    width: 500,
                    id: "message",
                    accessor: el => (el.messageTitle + "  " + el.messageContents),
                    Cell: props => {
                        return (
                            <div className="msedge-table-content-left-align admin-list-word-wrap">
                                <p>
                                    <strong>{props.original.messageTitle}</strong>
                                </p>
                                <ReadMoreAndLess
                                    ref={this.ReadMore}
                                    className="read-more-content"
                                    charLimit={150}
                                    readMoreText=" Read more"
                                    readLessText=" Read less"
                                >
                                    {props.original.messageContents ? props.original.messageContents : ''}
                                </ReadMoreAndLess>

                            </div>
                        )
                    }
                },
                {
                    Header: <SortIcon dataList={language.message_published_to} sort={true} />,
                    accessor: "messagePublishedTo",
                    width: 140,
                    Cell: row => {
                        return (
                            <div className="msedge-table-content-left-align admin-list-word-wrap">
                                {row.value === 1
                                    ? "Everyone"
                                    : row.value === 2
                                        ? " Lawschools"
                                        : row.value === 3
                                            ? "Students"
                                            : row.value === 4
                                                ? "Proof readers"
                                                : "null"}
                            </div>
                        );
                    },
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "1") {
                            return row[filter.id] === 1;
                        }
                        if (filter.value === "2") {
                            return row[filter.id] === 2;
                        }
                        if (filter.value === "3") {
                            return row[filter.id] === 3;
                        } else {
                            return row[filter.id] === 4;
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            aria-label="role"
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                    <option value="all">{language.show_all}</option>
                    <option value="1">{language.message_sendto_all}</option>
                    <option value="2">{language.lawschool}</option>
                    <option value="3">{language.students}</option>
                    <option value="4">{language.proof_reader}</option>
                        </select>
                    )
                },
                {
                    Header: <SortIcon dataList={language.published} sort={false} />,
                    accessor: "messageStatus",
                    sortable: false,
                    id: "messageStatus",
                    Cell: (row) => {
                        return <div className="msedge-table-content-center-align">
                            {row.value === "d" ? <div><h3 className="mb-0 delete-icon">X</h3></div> :
                                <Switch
                                    checked={row.value === "y" ? true : false}
                                    onChange={() => this.updateStatus(row.original)}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={23}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={15}
                                    width={42}
                                    aria-label="processed"
                                    onHandleColor="#006EBD"
                                    tabindex="0"
                                />}
                        </div>
                    },
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "y") {
                            return row[filter.id] === "y";
                        } else if (filter.value === "n") {
                            return row[filter.id] === "n";
                        } else {
                            return row[filter.id] === "d";
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select aria-label="message published"
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">{language.show_all}</option>
                            <option value="y">{language.published}</option>
                            <option value="n">{language.draft}</option>
                            <option value="d">{language.deleted}</option>

                        </select>
                    )
                },
                {
                    Header: <SortIcon dataList={language.action} sort={false} />,
                    filterable: false,
                    sortable: false,
                     width: 160,
                    Cell: row => (
                        <div className="msedge-table-content-center-align" >
                            <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
                                <span>Delete</span>
                            </ReactTooltip>
                            <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
                                <span>Edit</span>
                            </ReactTooltip>
                            <Link
                                aria-label="link to edit"
                                to={{ pathname: this.state.adminSession.user_role === "3" ? "" : "/admin/add_messagenotify", query: row.original }}
                                className="add-user-btn"
                                disabled={this.state.adminSession.user_role === "3" ? true : false}
                            >
                                <button
                                    data-tip
                                    data-for="edit_button"
                                    className="btn btn-outline-primary fs-icon"
                                    aria-label="user edit"
                                    disabled={this.state.adminSession.user_role === "3" ? true : false}
                                >
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                            </Link>

                            <button
                                data-tip
                                data-for="delete_button"
                                className="ml-3 btn btn-outline-primary fs-icon"
                                onClick={() => this.deleteMessage(row)}
                                aria-label="delete"
                                disabled={this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" || row.original.messageStatus === "d" ? true : false}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                                
                            </button>
                        </div>

                    )
                },
            ]
        }
    ];

    handleSetData = data => {
        this.setState({ filteredData: data });
    };
    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <div className="msedge-admin-message">
                        <div className="">
                            <Fragment>
                                <div className="mt-2 container-fluid">
                                    <Row>
                                        <Col xs="12" sm="12" md="8" lg="8" xl="8">
                                            <h1 className="msedge-overview-text msedge-listuser-heading" tabIndex="-1">
                                                {language.messages}
                                            </h1>
                                        </Col>

                                        <Col xs="12" sm="12" md="4" lg="4" xl="4"
                                            className="msedge-bank-listbtns"
                                        >
                                            <Row className="pull-right">
                                                <Col xs="12" sm="12" md="6" lg="7" xl="7" className="pr-0">
                                                    <GlobalSearchComponent
                                                        data={this.state.data === null || this.state.data === "" ? [] : this.state.data}
                                                        handleSetData={this.handleSetData}
                                                        aria-label={language.Overall_search}
                                                    />
                                                </Col>

                                                <Col xs="12" sm="12" md="6" lg="5" xl="5" className="pl-2">
                                                    <div className="form-group">
                                                        <span className="msedge-questions-start msedge-right-br msedge-student-list-btn">
                                                            <Link to="/admin/add_messagenotify"
                                                                disabled={this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" ? true : false}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    tabIndex="-1"
                                                                    className="btn btn-outline-primary d-flex"
                                                                    disabled={this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" ? true : false}
                                                                >
                                                                    <li>
                                                                        <i className="pe-7s-plus" aria-hidden="true"></i>
                                                                    </li>
                                                                    <li className="text-uppercase">
                                                                        {language.add}
                                                                    </li>
                                                                </button>
                                                            </Link>
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <Row>
                                    <div className="container-fluid bg-grey msedge-overall-padding">
                                        <Col md="12">
                                            <div className="messages-table">
                                                <ReactTable
                                                    className="bg-white"
                                                    data={this.state.filteredData == null || this.state.filteredData == "" ? [] : this.state.filteredData}
                                                    columns={this.columns}
                                                    minRows={2}
                                                    defaultPageSize={50}
                                                    filterable
                                                    defaultFilterMethod={filterCaseInsensitive}
                                                    noDataText="No rows found"
                                                    loading={this.props.isLoading}
                                                />
                                            </div>
                                        </Col>
                                    </div>
                                </Row>
                            </Fragment>
                        </div >
                    </div >
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listData: state.main.data,
        isLoading: state.main.load
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        currentState,
        deleteData, getData, updateData, redirectPath
    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(ListMessage)