import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import swal from "sweetalert";
import {language} from "../../utils/locale/locale"

class GlobalSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () =>
      this.globalSearch()
    );
  };

  globalSearch = () => {
    let { searchInput } = this.state;

    if (this.props.data === '' || null) {
      return swal(language.oops, language.noDataFoundToSearch, "error");
    } else {
      let filteredData = this.props.data.filter(value => {
        switch (this.props.currentstate) {
          case "admin/users":
            return (
              value.userFirstName != null && (value.userLastName + ' ' + value.userFirstName).toLowerCase().includes(searchInput.toLowerCase()) ||
              value.userLastName != null && value.userLastName.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.userPrimaryEmail != null && value.userPrimaryEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.userName != null && value.userName.toLowerCase().includes(searchInput.toLowerCase()) 
     );
          case "admin/students":
            return (
              value.studentLastName != null && (value.studentLastName + ' ' + value.studentFirstName).toLowerCase().includes(searchInput.toLowerCase()) ||
              value.studentCode != null && value.studentCode.toLowerCase().toString().includes(searchInput.toLowerCase()) || value.studentBarExamBatch != null &&
              value.studentBarExamBatch.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.studentLawschoolName != null && value.studentLawschoolName.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.studentPrimaryEmail != null && value.studentPrimaryEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.studentPhoneNumber != null && value.studentPhoneNumber.toLowerCase().includes(searchInput.toLowerCase())
            )
          case "gettingstudentbylawschoolid":
            return (
              value.lastName != null && (value.firstName + '  ' + value.lastName).toLowerCase().includes(searchInput.toLowerCase()) ||
              value.studentCode != null && (value.studentCode + ' ' + value.firstName + ' ' + value.lastName).toLowerCase().toString().includes(searchInput.toLowerCase().toString()) || 
              value.barExamBatch != null && value.barExamBatch.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.primaryEmail != null && value.primaryEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.phoneNumber != null && value.phoneNumber.toLowerCase().includes(searchInput.toLowerCase())
            )
          case "videolibrary":
            const dateFormate = moment(value.videoLibraryLastModificationDate).format("MM-DD-YYYY")
            return (
              value.videoLibraryTitle != null && value.videoLibraryTitle
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.videoLibraryCategory != null && value.videoLibraryCategory.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.videoLibraryOrder != null && value.videoLibraryOrder.toString().includes(searchInput.toString()) ||
              dateFormate != null && dateFormate.toString().includes(searchInput.toString())

            );
          case "admin/messages":
            const dateFormatetwo = moment(value.messageCreatedAt).format(
              "MM-DD-YYYY"
            );
            return (
              dateFormatetwo != null && dateFormatetwo.toString().includes(searchInput.toString()) ||
              value.messageTitle != null && value.messageTitle
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.messageContents != null && value.messageContents
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            );
          case "lawschool/messages":
            const dateFormatelawschool = moment(value.messageCreatedAt).format(
              "MM-DD-YYYY"
            );
            return (
              dateFormatelawschool != null && dateFormatelawschool.toString().includes(searchInput.toString()) ||
              value.messageTitle != null && value.messageTitle
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.messageContents != null && value.messageContents
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            );
          case "admin/itemtags":
            const dateFormatefinal = moment(value.itemTagLastModifiedAt).format(
              "MM-DD-YYYY"
            );
            return (
              value.itemTagItemCode != null && value.itemTagItemCode.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.itemTagName != null && value.itemTagName.toLowerCase().includes(searchInput.toLowerCase()) ||
              dateFormatefinal != null && dateFormatefinal.toString().includes(searchInput.toString()) ||
              value.itemTagCategory != null && value.itemTagCategory
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            );
          case "admin/itemerrors/":
            return (
              value.item_bank_code != null && value.item_bank_code.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.item_error_subject != null && value.item_error_subject
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.item_error_topic != null && value.item_error_topic.toString().includes(searchInput.toString()) ||
              value.item_error_question != null && value.item_error_question
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.TotalReported != null && value.TotalReported.toString().includes(searchInput.toString())
            );
          case "admin/schools":
            return (
              value.lawSchoolName != null && value.lawSchoolName.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.lawSchoolCode != null && value.lawSchoolCode.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.lawSchoolPrimaryEmail != null && value.lawSchoolPrimaryEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.lawSchoolContactPersonEmail != null && value.lawSchoolContactPersonEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.lawSchoolAddress != null && value.lawSchoolAddress.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.lawSchoolContactLastName != null && (value.lawSchoolContactLastName + ' ' + value.lawSchoolContactFirstName).toLowerCase().includes(searchInput.toLowerCase()) ||
              value.lawSchoolPhoneNumber != null && value.lawSchoolPhoneNumber.toString().includes(searchInput.toLowerCase()) || value.lawSchoolContactPersonPhoneNumber != null && value.lawSchoolContactPersonPhoneNumber.toString().includes(searchInput.toLowerCase())
            );
          case "admin/schools/enquiry":
            return (
              value.enquiryPrimaryEmail != null && value.enquiryPrimaryEmail
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.enquiryName != null && value.enquiryName
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.enquiryLawschoolName != null && value.enquiryLawschoolName
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.enquiryPhoneNumber != null && value.enquiryPhoneNumber
                .toString()
                .includes(searchInput.toString())
            );
          case "admin/exams/precreated":
            return (
              value.precreatedExamCode != null && value.precreatedExamCode
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.precreatedExamName != null && value.precreatedExamName
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.precreatedExamDesc != null && value.precreatedExamDesc
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.precreatedExamTotalQuestions != null && value.precreatedExamTotalQuestions.toString().includes(searchInput.toString())
            );


            case "/admin/logs/error":
              return (
                value.errorLogUser != null && value.errorLogUser
                  .toString()
                  .includes(searchInput.toString()) ||
                value.errorLogDescription != null && value.errorLogDescription
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                value.errorLogScreen != null && value.errorLogScreen
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                value.errorLogDateTime != null && value.errorLogDateTime.toString().includes(searchInput.toString())
              );

              case "admin/auditlog":
              return (
                value.auditLogRequestType != null && value.auditLogRequestType
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                value.auditLogResponseCode != null && value.auditLogResponseCode
                  .toString()
                  .includes(searchInput.toString()) ||
                value.auditLogUserPrimaryEmail != null && value.auditLogUserPrimaryEmail
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                  value.auditLogRequestURL != null && value.auditLogRequestURL
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                value.auditLogCreatedDate != null && value.auditLogCreatedDate.toString().includes(searchInput.toString())
              );


          case "admin/itembank/":
            return (
              value.itemBankSubject != null && value.itemBankTopic && (value.itemBankSubject + ' / ' + value.itemBankTopic).toLowerCase().includes(searchInput.toLowerCase()) ||
              value.itemBankCode != null && value.itemBankCode
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.itemBankContentType != null && value.itemBankContentType.toLowerCase().includes(searchInput.toLowerCase()) ||
              value.itemBankQuestion != null && value.itemBankQuestion
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              value.itemBankPrefrenceStatus != null && value.itemBankPrefrenceStatus.toString().includes(searchInput.toString())
            );
          default:
            return null;

        }

      });
      this.props.handleSetData(filteredData);
    }

  };

  render() {
    return (
      <>
        <div className="form-group ">
          <input
            className="text-body msedge-form-control-onsearch"
            name="searchInput"
            placeholder="Search.."
            value={this.state.searchInput || ""}
            onChange={this.handleChange}
            label="Search"
            aria-label="Table over all search"
          />
          <span className="btn pe-7s-search msedge-onsearch-icon"></span>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentstate: state.main.state
  };
};

export default connect(mapStateToProps)(GlobalSearch);
