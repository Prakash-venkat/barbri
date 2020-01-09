import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Modal, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faPlay } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from 'react-switch';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip'

import { getData, updateData, currentState, deleteData, redirectPath } from '../../../../actions/actionMain';
import '../../../../../node_modules/video-react/dist/video-react.css'
import GlobalSearchComponent from '../../../../components/admin/globalSearch'
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import SortIcon from '../../../../components/admin/sortIcon';
import { videoCategory } from '../../../../components/admin/initialRows';
import FilterInputComponent from '../../../../components/admin/FilterInputComponent';
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


class VideoLibrary extends Component {
    constructor() {
        super();
        this.state = {
            adminSession: getSession("AdminSession"),
            modal: false,
            data: [],
            filteredData: [],
            ispublished: 'n',
            isToggleOn: false,
            currentvideo: "",
            controls: true,
            playing: true,
            videoLibraryActive: 'y',
            videoLibraryTitle: "",
            videoLibraryFileName: "",
            selectedvideocategory: videoCategory[0],
        };
    }

    componentDidMount() {
        customPageTitle('Video Library')
        this.props.currentState('videolibrary')
        this.props.getData();
        
    }

    componentWillReceiveProps({ listData }) {
        var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;

        var data = datalistCond.filter(a => { return a.videoLibraryActive != "d" })
        this.setState({
            data: this.state.adminSession.user_role === "1" ? datalistCond : data,
            filteredData: this.state.adminSession.user_role === "1" ? datalistCond : data
        });
    }

    videotoggle = (row) => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
        this.setState(
            { currentvideo: row.original.videoLibraryFileName, }
        );
    }

    videoclose = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    }
    deleteVideo = (row) => {
        const code = row.original.videoLibraryId
        this.props.deleteData(`videolibrary/${code}`);
    };


    handleSetData = data => {
        this.setState({ filteredData: data });
    };


    updateStatus = (row) => {
        this.props.redirectPath('videolibrary');
        var editStatus = JSON.stringify({
            "videoLibraryFileName": row.videoLibraryFileName,
            "videoLibraryActive": row.videoLibraryActive === 'y' ? 'n' : 'y',
            "videoLibraryCategory": row.videoLibraryCategory,
            "videoLibraryTitle": row.videoLibraryTitle,
            "videoLibraryOrder":row.videoLibraryOrder,
        })

        this.props.updateData({
            data: editStatus,
            id: row.videoLibraryId,
            path: 'videolibrary'
        })
        .then(res =>{
            this.props.getData();
        })
    }

    statusHandler = (e) => {
        this.setState({ videoLibraryActive: e.target.value })
    }

    handleCategoryChange = (selectedvideocategory) => {
        this.setState({ selectedvideocategory })
    }
    handleClick = (index) => {
        if (this.state.isToggleOn) {
            this.setState({ ispublished: "n" })
        }
        else {
            this.setState({ ispublished: "y" })
        }
        this.setState(function (prevState) {
            return { isToggleOn: !prevState.isToggleOn };
        });
    }

    columns = [
        {
            columns: [
                {
                    Header: <SortIcon dataList={language.video_title} sort={true} />,
                    accessor: "videoLibraryTitle",
                    width: 250,
                    Filter: props => <FilterInputComponent aria_label="video title" {...props} />,
                    Cell: row => (
                        <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
                    )
                },

                {
                    Header: <SortIcon dataList={language.video_category} sort={true} />,
                    accessor: "videoLibraryCategory",
                    width: 170,
                    Filter: props => <FilterInputComponent aria_label="video subject" {...props} />,
                    Cell: row => (
                        <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
                    )
                },
                {
                    Header: <SortIcon dataList={language.last_modified_date} sort={true} />,
                    width: 117,
                    id: 'date',
                    accessor: "videoLibraryLastModificationDate",
                    Filter: props => <FilterInputComponent aria_label="video subject" {...props} />,
                    Cell: row => (
                        <div className="msedge-table-content-right-align">{row.value}</div>
                    )
                },
                {
                    Header: <SortIcon dataList={language.display_order} sort={true} />,
                    accessor: "videoLibraryOrder",
                    Filter: props => <FilterInputComponent aria_label="video order" {...props} />,
                    Cell: row => (
                        <div className="msedge-table-content-right-align">{row.value}</div>
                    )
                },
                {
                    Header: <div><span>{language.published} </span></div>,
                    accessor: "videoLibraryActive",
                    sortable: false,
                    width: 160,
                    id: "videoLibraryActive",
                    Cell: (row) => {
                        return <div className="msedge-table-content-center-align">
                            {row.value === "d" ? <div><h3 className="mb-0 delete-icon">X</h3></div> :
                                <Switch
                                    checked={row.value === "y" ? true : false}
                                    onChange={this.updateStatus.bind(this, row.original)}
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
                                    tabIndex={0}
                                    disabled={this.state.adminSession.user_role === "3" ? true : false}
                                />}
                        </div>
                    },

                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "y") {
                            return row[filter.id] === "y";
                        }
                        if (filter.value === "n") {
                            return row[filter.id] === "n";
                        } else {
                            return row[filter.id] === "d";
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select className="ada-font-size"
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                            aria-label="select processed status"
                        >
                            <option value="all">{language.show_all}</option>
                            <option value="y">{language.published}</option>
                            <option value="n">{language.draft}</option>
                            <option value="d">{language.deleted}</option>
                        </select>
                    )


                },

                {
                    Header: props => <div><span>{language.action} </span></div>,
                    filterable: false,
                    sortable: false,
                    width: 223,
                    Cell: row => (
                        <div className="msedge-table-content-center-align">
                            <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
                    <span>{language.delete}</span>
                            </ReactTooltip>
                            <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
                    <span>{language.edit}</span>
                            </ReactTooltip>

                            <ReactTooltip className="customeTheme" id='play_video' type='info' effect='solid'>
                                <span>
                                    {language.playVideo}
                                </span>
                            </ReactTooltip>

                            <button
                                data-tip
                                data-for="play_video"
                                className="btn btn-outline-primary fs-icon"
                                aria-label="video play"
                                onClick={this.videotoggle.bind(this, row)}>
                                <FontAwesomeIcon icon={faPlay} />
                            </button>
                            <Link
                                aria-label="link to add"
                                to={{
                                    pathname: this.state.adminSession.user_role == "3" ? "" : "/admin/add_videolibrary",
                                    query: row
                                }}
                                disabled={this.state.adminSession.user_role == "3" ? true : false}
                            >
                                <button
                                    data-tip
                                    data-for="edit_button"
                                    className="ml-3 btn btn-outline-primary fs-icon" aria-label="video edit"
                                    disabled={this.state.adminSession.user_role == "3" ? true : false}
                                >

                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                            </Link>
                            <button
                                data-tip
                                data-for="delete_button"
                                className="ml-3 btn btn-outline-primary fs-icon" aria-label="video delete" onClick={() => this.deleteVideo(row)}
                                disabled={this.state.adminSession.user_role == "2" || this.state.adminSession.user_role == "3" || row.original.videoLibraryActive === "d" ? true : false}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    )
                },
            ]
        }
    ];



    render() {
        return (
            <div>
                <div className="msedge-admin-video-library-segment">
                    <div className="mt-2 container-fluid">
                        <Row>
                            <Col xs="12" sm="12" md="8" lg="8" xl="8">
                                <h1 className="msedge-overview-text msedge-listuser-heading" tabIndex="-1">
                                    {language.video_library}
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
                                                <Link to="/admin/add_videolibrary"
                                                    disabled={this.state.adminSession.user_role == "3" ? true : false}
                                                >
                                                    <button
                                                        type="button"
                                                        tabIndex="-1"
                                                        className="btn btn-outline-primary d-flex"
                                                        disabled={this.state.adminSession.user_role == "3" ? true : false}
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

                    <Fragment>
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="TabsAnimation"
                            transitionAppear={true}
                            transitionAppearTimeout={0}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <Row>
                                <div className="container-fluid bg-grey msedge-overall-padding">
                                    <Col md="12">
                                        <div className="video-library-table">
                                            <ReactTable
                                                className="bg-white"
                                                data={this.state.filteredData == null || this.state.filteredData == [] ? [] : this.state.filteredData}
                                                columns={this.columns}
                                                defaultPageSize={50}
                                                minRows={2}
                                                filterable
                                                defaultFilterMethod={filterCaseInsensitive}
                                                noDataText={'No rows found'}
                                                loading={this.props.loading}
                                            />
                                        </div>
                                    </Col>
                                </div>
                            </Row>
                        </ReactCSSTransitionGroup>
                    </Fragment>

                    <div className="modal two">
                        <Modal isOpen={this.state.modal} className="videolibrary-modal1-size">
                            <ModalBody>
                                <ReactPlayer
                                    className='react-player'
                                    playing url={this.state.currentvideo} playing
                                    controls
                                    autoPlay
                                />
                            </ModalBody>
                            <ModalFooter>
                                <button
                                    className="btn btn-outline-primary pr-5 pl-5 mr-2"
                                    onClick={this.videoclose}
                                >
                                    {language.close}
                                  </button>
                            </ModalFooter>
                        </Modal>
                    </div>

                </div >
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listData: state.main.data,
        loading: state.main.load
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getData,
        updateData,
        currentState,
        deleteData,
        redirectPath
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrary)
