import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Button, Col, Row } from "reactstrap";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import ReactTable from "react-table";


export default class DataTableCustomComps extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modal: false,
      isChecked: false,
      status: "Active"
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.state.isChecked) {
      this.setState({ status: "Active" });
    } else {
      this.setState({ status: "InActive" });
    }

    console.log(this.state.isChecked);
  };
  deleteUser = row => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this !",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        const code = row.original.practice_exam_code;
        let url = `http://barbri.thinrootsoftware.com/barbriapi/delete_practiceexam.php?id=${code}`;
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
  };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch("http://barbri.thinrootsoftware.com/barbriapi/practice_exam.php")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  };
  columns = [
    {
      columns: [
        // {
        //   Header: (
        //     <div>
        //       <span>S.No</span>
        //       <i className="lnr-sort-alpha-asc"></i>
        //     </div>
        //   ),
        //   accessor: "practice_exam_code",
        //   Cell: row => (
        //     <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
        //   )
        // },
        {
          Header: (
            <div>
              <span>Practice Exam Code</span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "practice_exam_code",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },

        {
          Header: (
            <div>
              <span>Practice Exam Name</span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "practice_exam_name",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div>
              <span>Practice Exam Description</span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "practice_exam_desc",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div>
              <span>Number of Question include</span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "practice_exam_total_questions",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div>
              <span>Status</span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "practice_exam_status",
          Cell: ({ value }) => (value === "y" ? "Active" : "Inactive"),
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "y") {
              return row[filter.id] === "y";
            } else {
              return row[filter.id] === "n";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="y">Active</option>
              <option value="n">InActive</option>
            </select>
          )
        },
        {
          Header: (
            <div>
              <span>Last Modification Date</span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "practice_exam_created_date.date",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>
                {row.value.split(" ")[0].split("-")[1]}-{row.value.split(" ")[0].split("-")[2]}-{row.value.split(" ")[0].split("-")[0]}
            </div>
          )
        },
        {
          Header: (
            <div>
              <span>Action</span>
            </div>
          ),
          width: 150,
          filterable: false,
          sortable: false,
          Cell: row => (
            <div
              className="text-center"
              style={{ textAlign: "center", width: "100%" }}
            >
              <Link
                to={{
                  pathname: "/admin/practice-add",
                  query: row
                }}
              >
                <Button
                  className="mb-1 ml-3 btn-icon btn-icon-only"
                  color="primary"
                >
                  <i className="pe-7s-pen btn-icon-wrapper"> </i>
                </Button>
              </Link>
              <Button
                className="mb-1 ml-3 btn-icon btn-icon-only"
                color="primary"
                onClick={this.deleteUser.bind(this, row)}
              >
                <i className="pe-7s-trash btn-icon-wrapper"> </i>
              </Button>
            </div>
          )
        }
      ]
    }
  ];
  render() {
    console.log("database", this.state.data);
    const { data } = this.state;
    const style = {
      paddingLeft: "5px",
      color: "red"
    };
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="mb-2 heading-section">
            <Row className="page-title">
              <Col xs="12" sm="12" md="7" lg="7" xl="7">
                <h5 className="text-primary">Pratice Exam</h5>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </Col>
              <Col xs="12" sm="12" md="5" lg="5" xl="5" className="text-right">
                <div className="form-group">
                  <Link to="/admin/practice-add">
                    <button
                      type="submit"
                      className="btn btn-outline-primary pr-5 pl-5 mr-2"
                      onClick={this.toggle}
                    >
                      Add
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col md="12">
              <div className="main-card mb-3">
                <div>
                  <ReactTable
                    className="bg-white"
                    data={data}
                    columns={this.columns}
                    defaultPageSize={5}
                    minRows={0}
                    filterable
                  />
                </div>
              </div>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
