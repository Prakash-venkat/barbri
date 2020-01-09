import React, { Component } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    currentState,
    getData
} from "../../../../../actions/actionMain";
import { instance, HASH_HISTORY } from '../../../../../actions/constants'
import { getSession } from '../../../../routes/routePaths'

import Loading from "../../../../../components/admin/loading";
import { language } from '../../../../../utils/locale/locale'

import logo_new from "../../../../../assets/utils/images/logo-new-pdf.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  textStyles: {
    margin: 10,
    fontSize: 10,
    textAlign: "left"
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    fontFamily: "Times-Roman"
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "#549cd0"
  },
  tableRow1: { margin: "auto", flexDirection: "row" },
  tableRow2: {
    margin: "auto",
    flexDirection: "row",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  tableCol1: {
    width: "38%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol2: {
    width: "33%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol3: {
    width: "29%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol4: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: { margin: 5, fontSize: 9, textAlign: "left" },
  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "black"
  },
  header: {
    color: "black",
    flexDirection: "row"
  },
  body: {
    paddingTop: 25,
    paddingBottom: 65,
    paddingHorizontal: 25
  },
  validAnswer: {
    height: 15,
    width: 15
  },
  headerContent: {
    marginBottom: 20,
    borderStyle: "solid",
    paddingBottom: 15,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0
  }
});

class Pdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      loading: true,
      progressData: [],
      load: false,
      studentSession: getSession("StudentSession")
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  convertToMin=(time)=>{
    return Math.floor(time / 60)+' '+ 'Minute' + ' ' + +Math.floor(time % 60) + ' ' + 'seconds';
  }

  fetchData = () => {
    this.setState({
      load: true
    });
    instance
      .get(`exams/${this.props.examId}/reports`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        return response;
      })
      .then(res => {
        if (res.status === 200) {
            const totalTime = res.data.data.map(data => {
                const totalTimetaken = data.timeTaken;
                //Math.floor(data.timeTaken / 60) + ' ' + "min" + ' ' + (data.timeTaken % 60 ? data.timeTaken % 60 + ' ' + 'sec' : '0' + ' ' + 'sec')
                return totalTimetaken;
              });
            const arrayTotalTime =  totalTime.reduce((a, b) => a + b, 0)
            const totalQs =  res.data.data.map(data => {
                const totalQuestions = data.totalQuestions;
                return totalQuestions;
              });
              const arrayTotalQuestion =  totalQs.reduce((a, b) => a + b, 0)
              this.setState({
                arrayTotalTime:arrayTotalTime,
                arrayTotalQuestion:arrayTotalQuestion
              })
          this.setState({ progressData: res.data.data, load: false });

        } else {
          HASH_HISTORY.push("/students/exam-reports");
        }
      });
  };
  MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ paddingBottom: 10, width: "60%" }}>
            <Image source={logo_new} style={{ height: "35", width: "110" }} />
          </View>
          <View style={{ width: "40%" }}>
            <Text
              style={{
                fontSize: "14",
                textAlign: "right",
                color: "#006ebd",
                fontFamily: "Times-Bold",
                paddingBottom: 3
              }}
            >
              {language.your_report}{' '}
            </Text>
            <Text
              style={{
                fontSize: "11",
                textAlign: "right",
                color: "grey",
                fontFamily: "Times-Bold",
                paddingBottom: 2
              }}
            >
              {" "}
              {language.student} #{" "}
              <Text style={{ color: "black" }}>{this.state.studentSession.userId}</Text>
            </Text>
            <Text
              style={{
                fontSize: "11",
                textAlign: "right",
                color: "grey",
                fontFamily: "Times-Bold",
                paddingBottom: 2
              }}
            >
                {language.student_name}{' '}
              <Text style={{ color: "black" }}>{this.state.studentSession.name}</Text>
            </Text>
            <Text
              style={{
                fontSize: "11",
                textAlign: "right",
                color: "grey",
                fontFamily: "Times-Bold",
                paddingBottom: 2
              }}
            >
              {language.exam_name}{' '}
              <Text style={{ color: "black" }}>{this.props.examName}</Text>
            </Text>
            <Text
              style={{
                fontSize: "11",
                textAlign: "right",
                color: "grey",
                fontFamily: "Times-Bold",
                paddingBottom: 20
              }}
            >
              {language.exam_date}{' '}
              <Text style={{ color: "black" }}>{this.props.examDate}</Text>
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 11,
            paddingTop: 17,
            borderStyle: "solid",
            fontFamily: "Times-Roman",
            borderTop: 1
          }}
        >
         {language.below_is}
        </Text>
        <Text
          style={{
            color: "#006ebd",
            fontSize: 12,
            paddingTop: 10,
            paddingBottom: 9,
            fontFamily: "Times-Bold",
            textTransform :'uppercase'
            
          }}
        >
          {language.overall_score}
        </Text>
        <Text
          style={{ fontSize: 11, paddingBottom: 3, fontFamily: "Times-Roman" }}
        >
          <Text style={{ fontFamily: "Times-Bold" }}>Total Score : </Text>You
          answered{" "}
          <Text style={{ fontFamily: "Times-Bold" }}>
            {this.props.examRightAnswersCount} questions correctly out of{" "}
            {this.props.examTotalQuestions}
          </Text>
          , which equals {Math.round(this.props.examScore)}% correctly.
        </Text>
        <Text style={{ fontSize: 11, fontFamily: "Times-Roman" }}>
          <Text style={{ fontFamily: "Times-Bold" }}>Total Time : </Text>You
          took { Math.floor(this.state.arrayTotalTime/ 60) +  "." + (this.state.arrayTotalTime % 60 ? this.state.arrayTotalTime % 60 + ' ' + 'minutes' : '0' + ' ' + 'minutes')}

           {/* {Math.floor(this.state.arrayTotalTime/60)}  */}
          
           {" "}on this Exam, which equals{" "}
                    <Text style={{ fontFamily: "Times-Bold" }}>  {this.convertToMin(this.state.arrayTotalTime/this.state.arrayTotalQuestion)} per questions.</Text>

        </Text>

        <Text
          style={{
            color: "#006ebd",
            fontSize: 12,
            paddingTop: 10,
            paddingBottom: 11,
            fontFamily: "Times-Bold"
          }}
        >
          SCORE BY SUBJECT
        </Text>

        <View style={styles.table}>
          <View style={{ ...styles.tableRow1 }}>
            <View style={{ ...styles.tableCol1 }}>
              <Text
                style={{
                  ...styles.tableCell,
                  textAlign: "center",
                  fontSize: 10,
                  fontFamily: "Times-Bold"
                }}
              >
                Subject / Topic
              </Text>
            </View>
            
            <View style={{ ...styles.tableCol2 }}>
              <Text
                style={{
                  ...styles.tableCell,
                  textAlign: "center",
                  fontSize: 10,
                  fontFamily: "Times-Bold"
                }}
              >
                Correct answers
              </Text>
            </View>
            <View style={{ ...styles.tableCol3 }}>
              <Text
                style={{
                  ...styles.tableCell,
                  textAlign: "center",
                  fontSize: 10,
                  fontFamily: "Times-Bold"
                }}
              >
                Average Time
              </Text>
            </View>
          </View>

          {!this.state.progressData
            ? ""
            : this.state.progressData.map((progressdata, index) => (
                <>
                  <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCol1 }}>
                      <Text
                        style={{
                          ...styles.tableCell,
                          color: "white",
                          fontSize: 11
                        }}
                      >
                        {progressdata.subjectName}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol2 }}>
                      <Text
                        style={{
                          ...styles.tableCell,
                          color: "white",
                          textAlign: "center",
                          fontSize: 11
                        }}
                      >
                        {progressdata.rightAnswers} out of{" "}
                        {progressdata.answeredQuestions} (
                        {isNaN(
                          Math.round(
                            (progressdata.rightAnswers /
                              progressdata.answeredQuestions) *
                              100
                          )
                        ) ||
                        Math.round(
                          (progressdata.rightAnswers /
                            progressdata.answeredQuestions) *
                            100
                        ) === Infinity
                          ? 0
                          : Math.round(
                              (progressdata.rightAnswers /
                                progressdata.answeredQuestions) *
                                100
                            )}
                        %)
                      </Text>
                    </View>
                     <View style={{ ...styles.tableCol3 }}>
                      <Text
                        style={{
                          ...styles.tableCell,
                          color: "white",
                          textAlign: "center",
                          fontSize: 11
                        }}
                      >
                         { Math.floor(progressdata.timeTaken / 60) +  "." + (progressdata.timeTaken % 60 ? progressdata.timeTaken % 60 + ' ' + 'minutes' : '0' + ' ' + 'minutes')}

                      </Text>
                    </View>
                  </View>
                  {progressdata.topics.map((topic, index) => (
                    <>
                      <View
                        style={{
                          ...styles.tableRow,
                        //   borderBottomWidth: 1,
                          backgroundColor: index % 2 == 0 ? "#f9f9f9" : "white"
                        }}
                      >
                        <View
                          style={{
                            ...styles.tableCol1,
                            paddingLeft: 3
                          }}
                        >
                          <Text style={{ ...styles.tableCell, fontSize: 11 }}>
                            {topic.topicName}
                          </Text>
                        </View>
                     
                        <View style={{ ...styles.tableCol2 }}>
                          <Text
                            style={{
                              ...styles.tableCell,
                              textAlign: "center",
                              fontSize: 11
                            }}
                          >
                            {topic.rightAnswers} out of{" "}
                            {topic.answeredQuestions} (
                            {isNaN(
                              Math.round(
                                (topic.rightAnswers / topic.answeredQuestions) *
                                  100
                              )
                            ) ||
                            Math.round(
                              (topic.rightAnswers / topic.answeredQuestions) *
                                100
                            ) === Infinity
                              ? 0
                              : Math.round(
                                  (topic.rightAnswers /
                                    topic.answeredQuestions) *
                                    100
                                )}
                            %)
                          </Text>
                        </View>
                           <View style={{ ...styles.tableCol3 }}>
                          <Text
                            style={{
                              ...styles.tableCell,
                              textAlign: "center",
                              fontSize: 11
                            }}
                          >
                        { Math.floor(topic.timeTaken / 60) +  "." + (topic.timeTaken % 60 ? topic.timeTaken % 60 + ' ' + 'minutes' : '0' + ' ' + 'minutes')}

                          </Text>
                        </View>
                      </View>
                    </>
                  ))}
                </>
              ))}
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );

  render() {
    return (
      <div>
        {this.state.load ? (
          <Loading />
        ) : (
          <div>
            <PDFDownloadLink
              document={this.MyDoc()}
              fileName={`Exam report-${this.state.studentSession.name}.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <button
                  type="submit"
                  className="btn btn-outline-primary msedge-lawschool-download d-flex msedge-right-br msedge-exam-review-btn"
                >
                  <li>
                    <i class="pe-7s-download" aria-hidden="true"></i>
                  </li>
              <li className="text-uppercase">{language.download}</li>
                </button>
              )}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.main.data,
    loading: state.main.load
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentState,
      getData
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Pdf);
