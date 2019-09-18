import React, { Component } from 'react'
import ComingSoon from '../../../../coming-soon'
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import { Button, Col, Row, ListGroup, ListGroupItem } from "reactstrap";
import ReactTable from "react-table";
import Dropzone from 'react-dropzone'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import swal from "sweetalert";

export class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: [],
            files: [],
            selectedFile: { name: ' Select files to upload.', size: '' }
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    columns = [
        {
            columns: [
                {
                    Header: () => (
                        <div>
                            <span>Student Name</span>
                            <i class="lnr-sort-alpha-asc" />
                        </div>
                    ),
                    accessor: "Student_Name",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: () => (
                        <div>
                            <span>Student Code</span>
                            <i class="lnr-sort-alpha-asc" />
                        </div>
                    ),
                    accessor: "Student_Code",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: () => (
                        <div>
                            <span>Phone</span>
                            <i class="lnr-sort-alpha-asc" />
                        </div>
                    ),
                    accessor: "Student_Phone_Number",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: "Email",
                    
                    accessor: "Student_Email",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: "Address",
                    accessor: "Student_Address",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: "Law School",
                    accessor: "Law_School",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: "Barbri Reference #",
                    accessor: "Barbri_Reference_No",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },
                {
                    Header: "Bar Exam Batch",
                    accessor: "Bar_Exam_Batch",
                    Cell: row => (
                        <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                    )
                },

            ]
        }
    ];

    handleChange(e) {
        try {
            const files = e.target.files;
            const extension = files[0].name.split('.')
            if (extension[extension.length - 1] === 'xlsx' || extension[extension.length - 1] === 'csv') {
                console.log(extension[extension.length - 1], "ext")



                if (files && files[0]) this.setState({ file: files[0] });
                this.setState({ selectedFile: { name: e.target.files[0].name, size: e.target.files[0].size + 'bytes' } })
                console.log(e.target.files[0].size)
                console.log(e.target.files[0].name.length)



            } else {
                //alert("invalid ext")
                swal("Invalid File !", "Excel or CSV file only acceptable",);
            }

        }
        catch (e) {
            // alert('File upload message..')
            console.log("Error thrown from try...catch file uploading")
        }
    };


    handleFile() {
        /* Boilerplate to set up FileReader */

        try {
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;

            reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws);
                /* Update state */
                this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
                    console.log(JSON.stringify(this.state.data, null, 2));
                });

            };

            if (rABS) {
                reader.readAsBinaryString(this.state.file);
            } else {
                reader.readAsArrayBuffer(this.state.file);
            };
        }
        catch (e) {
            // alert('Please select excel file')
            console.log("Error thrown from try...catch handleFile function")
        }
    }



    onDrop(files) {
        this.setState({ files });
    }

    onCancel() {
        this.setState({
            files: []
        });
    }

    render() {
        const { data } = this.state;

        const files = this.state.files.map(file => (
            <ListGroupItem key={file.name}>
                {file.name} - {file.size} bytes
            </ListGroupItem>
        ))
        return (
            <div className="upload-student">
                {/* <ComingSoon/> */}
                {/* <label htmlFor="file">Upload an excel to Process Triggers</label>
                <br />
                <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                <br />*/}

                <div className="mb-2 heading-section">
                    <Row className="page-title">
                        <Col xs="12" sm="12" md="5" lg="5" xl="5">
                            <h5 className="text-primary">Students Upload</h5>
                            <p className="text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                              </p>
                        </Col>
                        <Col xs='12' sm='12' md='5' lg='5' xl='5'>
                            <div className="dropzone-wrapper dropzone-wrapper-sm dropzone_file float-right">
                                <Dropzone
                                    onDrop={this.onDrop.bind(this)}
                                    onFileDialogCancel={this.onCancel.bind(this)}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} onChange={this.handleChange} />
                                            <div className="dropzone-content">
                                                <p className='m-0'>{this.state.selectedFile.name.length >= 26 ? this.state.selectedFile.name.substring(0, 7) + '...' : this.state.selectedFile.name}  {'  '}{this.state.selectedFile.size}</p>
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                        </Col>
                        <Col md='2' lg='2'>
                            <button
                                type="submit"
                                className="btn btn-outline-primary pr-5 pl-5 mr-2 float-right"
                                id="pdf"
                                //  onClick={this.createPdf}
                                onClick={this.handleFile}
                            >
                                Upload
                      </button>
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

            </div>
        )
    }
}

export default Add

