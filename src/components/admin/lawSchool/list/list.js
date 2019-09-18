//Authorization:
//Designed : by Rasbehari Das
//Purpose: Created for List of law school
//Description: Table for displaying data Item

import React, {Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import ReactTable from "react-table";
import swal from "sweetalert";
import Loader from "react-loaders";
import jsPDF from "jspdf";
import "./utils/jspdf.plugin.js";
import "./utils/jspdf.min.js";


class List extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      data: [],
      modal: false,
      isChecked: false,
      status: "Active",
      selectedRow: null,
      lawschool: [],
      filteredData: [],
      loading: true
    };
  }
  createPdf = () => {
    var pdfsize = "a3";
    let columns = [
      "School Code",
      "School Name",
      "Address",
      "Contact",
      "Status",
      "Last Modified Date"
    ];
    let rows = [];
    this.state.filteredData.forEach(function(obj) {
      rows.push([
        obj["lawschool_code"],
        obj["lawschool_name"],
        obj["lawschool_address"],
        obj["lawschool_contact_first_name"] +
          " ," +
          obj["lawschool_contact_email"] +
          " ," +
          obj["lawschool_contact_phone_number"],
        obj["lawschool_profile_active"] === "y"
          ? "Active"
          : obj["lawschool_profile_active"] === "n"
          ? "Inactive"
          : "Deleted",
        obj["lawschool_last_modified_date"].date.split(" ")[0].split("-")[1] +
          "-" +
          obj["lawschool_last_modified_date"].date.split(" ")[0].split("-")[2] +
          "-" +
          obj["lawschool_last_modified_date"].date.split(" ")[0].split("-")[0]
      ]);
    });

    console.log(rows);

    var doc = new jsPDF("p", "pt", pdfsize);
    doc.text("LawSchool List", 350, doc.autoTableEndPosY() + 50);
    doc.autoTable(columns, rows, {
      startY: 60,
      tableWidth: "auto",
      columnWidth: "auto",
      styles: {
        overflow: "linebreak"
      }
    });
    doc.save("schools.pdf");
  };

  fetchData = () => {
    try {
      fetch("http://barbri.thinrootsoftware.com/barbriapi/law_school.php")
        .then(response => response.json())
        .then(data => this.setState({ filteredData: data, data }))
        .then(error => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.fetchData();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  deleteUser = row => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this !",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          const code = row.original.lawschool_id;
          let url = `http://barbri.thinrootsoftware.com/barbriapi/deletelawschool.php?id=${code}`;
          console.log(url);
          fetch(url, { method: "post" })
            .then(resp => resp.json())
            .then(result => {
              if (result.status === 1) {
                swal("Row deleted successfully!", {
                  icon: "success"
                });
              } else {
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: "Something went wrong!"
                });
              }
            });

          this.fetchData();
        } else {
          swal("Cancelled!");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  columns = [
    {
      columns: [
        {
          Header: (
            <div>
              <span>School Code </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "lawschool_code",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div>
              <span>School Name </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "lawschool_name",
          width: 200,
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div>
              <span>Address </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "lawschool_address",
          width: 200,
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
          // filterable: false
        },
        {
          Header: "Contact",
          id: "contact",
          accessor: el => (el.lawschool_contact_first_name + el.lawschool_contact_phone_number + el.lawschool_contact_email),
          filterMethod: (filter, row) => {
            const escapedStr = filter.value.toLowerCase();
            const termsArr = escapedStr.split(" ");
            const finalRegexStr = termsArr.reduce(
              (acc, curr, idx) => acc + "(?=.*" + curr + ")",
              ""
            );
            const regex = new RegExp(finalRegexStr);
            return regex.test(row[filter.id]);
          },
          Cell: props => <span>{props.original.lawschool_contact_first_name} <br /> {props.original.lawschool_contact_phone_number} <br/>{props.original.lawschool_contact_email}</span>
        },
        // {
        //   id: "contact",
        //   width: 200,
        //   Header: (
        //     <div>
        //       <span>Contact</span>
        //       <i className="lnr-sort-alpha-asc"></i>
        //     </div>
        //   ),
        //   accessor: contact => {
        //     const name = contact.lawschool_contact_first_name;
        //     const phone = contact.lawschool_contact_phone_number;
        //     const email = contact.lawschool_contact_email;
        //     return (
        //       <div>
        //         <div className="">{name},</div>
        //         <div>{email},</div>
        //         <div className="">{phone}.</div>
        //       </div>
        //     );
        //   }
        //   // filterable: false
        // },
        {
          Header: "Status",
          accessor: "lawschool_profile_active",
          sortable: false,
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>
              {row.value}
            </div>
          ),
          id: "lawschool_profile_active",
          Cell: ({ value }) =>
            value === "y" ? "Active" : value === "n" ? "InActive" : "Deleted",
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
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="y">Active</option>
              <option value="n">InActive</option>
              <option value="d">Deleted</option>
            </select>
          )
        },

        {
          Header: (
            <div>
              <span>Last Modified Date</span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "lawschool_last_modified_date.date",
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>
              {row.value.split(" ")[0].split("-")[1]}-
              {row.value.split(" ")[0].split("-")[2]}-
              {row.value.split(" ")[0].split("-")[0]}
            </div>
          )
          // filterable: false
        },

        {
          Header: "Action",
          filterable: false,
          sortable: false,
          width: 150,
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>
              <Link
                to={{
                  pathname: "/admin/law-school-add",

                  query: row
                }}
                className="add-law-school-btn"
              >
                <Button
                  onCLick={this.onClickRow}
                  className="mb-1  btn-icon btn-icon-only"
                  color="primary"
                >
                  <i className="pe-7s-pen btn-icon-wrapper"> </i>
                </Button>
              </Link>
              <Button
                className="mb-1 ml-1 btn-icon btn-icon-only"
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
  handleChange = event => {
    const query = event.target.value;
    this.setState({ query: event.target.value });
    this.setState(prevState => {
      const filteredData = this.state.data.filter(element => {
        return (
          element.lawschool_name.toLowerCase().includes(query.toLowerCase()) ||
          element.lawschool_code.toString().includes(query.toLowerCase())
        );
      });
      return {
        query,
        filteredData
      };
    });
  };
  render() {
    console.log(this.state.filteredData);
    const { filteredData } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <div className="loader-custom">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale-pulse-out-rapid" />
                <h6 className="mt-2">Please Wait... Fetching Information</h6>
              </div>{" "}
            </div>
          </div>
        ) : (
          <div className="list-law-school">
            <Fragment>
              <div className="mb-2 heading-section">
                <Row className="page-title">
                  <Col xs="12" sm="12" md="7" lg="7" xl="7">
                    <h5 className="text-primary">List of Law School</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </p>
                  </Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="5"
                    lg="5"
                    xl="5"
                    className="text-right"
                  >
                    <div className="form-group">
                      <Link
                        to="/admin/law-school-add"
                        className="add-law-school-btn"
                      >
                        <button
                          type="submit"
                          className="btn btn-outline-primary pr-5 pl-5 mr-2"
                        >
                          Add
                        </button>
                      </Link>
                    
                      <Button
                        className="mb-2 mr-2 btn-icon btn-icon-only"
                        color="link"
                        onClick={this.createPdf}
                      >
                        <i className="pe-7s-download download btn-icon-wrapper"> </i>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-3 col-lg-3 col-xl-3  ml-auto">
                  <div className="form-group ">
                    <input
                      type="text"
                      className="text-body"
                      className="form-control"
                      placeholder="Search School"
                      value={this.state.query}
                      onChange={this.handleChange}
                    />
                    <span className="btn pe-7s-search search"></span>
                  </div>
                </div>
              </div>
              <Row>
                <Col md="12">
                  <div className="main-card mb-3">
                    <ReactTable
                      id="table"
                      className="bg-white"
                      data={filteredData}
                      columns={this.columns}
                      defaultPageSize={5}
                      minRows={0}
                      filterable
                    />
                  </div>
                </Col>
              </Row>
            </Fragment>
          </div>
        )}
      </div>
    );
  }
}

export default List;