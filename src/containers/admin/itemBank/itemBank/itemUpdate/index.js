import React, { Component } from "react";
import { Row, Col, Card, CardBody, UncontrolledTooltip, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from "formsy-react";
import Select from "react-select";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from "moment"
import JwPagination from "jw-react-pagination";
import { faCommentAlt, faQuestion, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { currentState, updateData, redirectPath } from "../../../../../actions/actionMain"
import Loading from "../../../../../components/admin/loading";
import MyInput from "../../../../../components/proofReader/input/MyInput";
import { subjectList, civilProcedure, constitutionalLaw, contracts, criminalLaw, evidence, realProperty, torts } from '../../../../../components/commonComponents/subjectTopics'
import { instance, HASH_HISTORY } from '../../../../../actions/constants';
import { customPageTitle } from '../../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../../utils/locale/locale';
import ContentLoader from '../../../../../components/loaders/contentLoader'



const preferenceStatus = [
    { value: 1, label: "Published" },
    { value: 2, label: "Review Inprogress" },
    { value: 3, label: "Reviewed" },
    { value: 4, label: "Draft" },
    { value: 5, label: "Inactive" },
    { value: 6, label: "Deleted" },
];

const components = {
    DropdownIndicator: null,
};

const createOption = (label) => ({
    label,
    value: label,
});

const customLabels = {
    first: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    last: <FontAwesomeIcon icon={faAngleDoubleRight} />,
    previous: <FontAwesomeIcon icon={faAngleLeft} />,
    next: <FontAwesomeIcon icon={faAngleRight} />
};

class ItemUpdate extends Component {
    constructor() {
        super();
        this.state = {
            rowData: [],
            editorState: '',
            distractor: '',
            revisionLoad: true,
            accordion: [true],
            SelectedValuesforValues: '',
            SelectedValuesforValuesIndex: '',
            optionLabel: '',
            selectedStatus: '',
            selectedSubject: '',
            selectedTopic: '',
            contentTypeTagList: [],
            contentTypeTag: [],
            selectedItemTags: "",
            inputValue: '',
            value: [],
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: "",
            choice5: "",
            itemReviewer: [],
            selectedProofReader: "",
            errorMsg: [""],
            revision: [],
            revisionDataChange: [],
            revisionComparision: [],
            modal: false,
            getSubjectID: 1,
            toggleTopicOnValue: 0,
            pageOfItems: [], //pagination
            isSubjectSelected: false,
            isTopicSelected: false,
            revisionDataLoad: true,
            proofReaderLoading: true
        };
    }

    disableButton = () => {
        this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
    }

    enableButton = () => {
        if (this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))).trim() != ""
            && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice1.getCurrentContent()))).trim() != ""
            && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice2.getCurrentContent()))).trim() != ""
            && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice3.getCurrentContent()))).trim() != ""
            && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice4.getCurrentContent()))).trim() != ""
            && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.distractor.getCurrentContent()))).trim() != "") {
            this.setState({ canSubmit: true, cursorDisable: "" });
        } else {
            this.disableButton();
        }
    }


    onEditorStateChange = (editorState) => {

        let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        if (valid.trim() === "") {
            let copyArray = this.state.errorMsg
            copyArray[0] = "Question is required!"
            this.setState({
                editorState, errorMsg: copyArray
            })
        }
        if (valid.trim() != "") {
            let copyArray = this.state.errorMsg
            copyArray[0] = ""
            this.setState({
                editorState,
                errorMsg: copyArray
            }, () => this.trackUpdateChanges());
        }
    };

    onEditorStateChangeChoice1 = (editorState) => {

        let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        if (valid.trim() === "") {
            let copyArray = this.state.errorMsg
            copyArray[1] = "Option 1 is required!"
            this.setState({
                choice1: editorState, errorMsg: copyArray
            },()=>this.disableButton())
        }
        if (valid.trim() != "") {
            let copyArray = this.state.errorMsg
            copyArray[1] = ""
            this.setState({
                choice1: editorState,
                errorMsg: copyArray
            }, () => this.trackUpdateChanges());
        }
    };

    onEditorStateChangeChoice2 = (editorState) => {

        let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        if (valid.trim() === "") {
            let copyArray = this.state.errorMsg
            copyArray[2] = "Option 2 is required!"
            this.setState({
                choice2: editorState, errorMsg: copyArray
            } ,()=>this.disableButton())
        }
        if (valid.trim() != "") {
            let copyArray = this.state.errorMsg
            copyArray[2] = ""
            this.setState({
                choice2: editorState,
                errorMsg: copyArray
            }, () => this.trackUpdateChanges());
        }
    };

    onEditorStateChangeChoice3 = (editorState) => {
        let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        if (valid.trim() === "") {
            let copyArray = this.state.errorMsg
            copyArray[3] = "Option 3 is required!"
            this.setState({
                choice3: editorState, errorMsg: copyArray
            },()=>this.disableButton())
        }
        if (valid.trim() != "") {
            let copyArray = this.state.errorMsg
            copyArray[3] = ""
            this.setState({
                choice3: editorState,
                errorMsg: copyArray
            }, () => this.trackUpdateChanges());
        }
    };

    onEditorStateChangeChoice4 = (editorState) => {
        let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        if (valid.trim() === "") {
            let copyArray = this.state.errorMsg
            copyArray[4] = "Option 4 is required!"
            this.setState({
                choice4: editorState, errorMsg: copyArray
            },()=>this.disableButton())
        }
        if (valid.trim() != "") {
            let copyArray = this.state.errorMsg
            copyArray[4] = ""
            this.setState({
                choice4: editorState
            }, () => this.trackUpdateChanges());
        }

    };

    onEditorStateChangeChoice5 = (editorState) => {
        this.setState({
            choice5: editorState
        }, () => this.trackUpdateChanges());
    };

    onEditorStateDistractorChange = (editorState) => {

        let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        if (valid.trim() === "") {
            let copyArray = this.state.errorMsg
            copyArray[6] = "Distractor rationale is required!"
            this.setState({
                distractor: editorState, errorMsg: copyArray
            })
        }
        if (valid.trim() != "") {
            let copyArray = this.state.errorMsg
            copyArray[6] = ""
            this.setState({
                distractor: editorState,
                errorMsg: copyArray
            }, () => this.trackUpdateChanges());
        }
    }

    trackUpdateChanges = () => {

        if (this.props.location.query.itemBankQuestion != draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            || this.props.location.query.itemBankOption1 != draftToHtml(convertToRaw(this.state.choice1.getCurrentContent()))
            || this.props.location.query.itemBankOption2 != draftToHtml(convertToRaw(this.state.choice2.getCurrentContent()))
            || this.props.location.query.itemBankOption3 != draftToHtml(convertToRaw(this.state.choice3.getCurrentContent()))
            || this.props.location.query.itemBankOption4 != draftToHtml(convertToRaw(this.state.choice4.getCurrentContent()))
            || this.props.location.query.itemBankOption5 != draftToHtml(convertToRaw(this.state.choice5.getCurrentContent()))
            || this.props.location.query.itemBankDistractorRationale != draftToHtml(convertToRaw(this.state.distractor.getCurrentContent()))) {

            this.enableButton();
        } else {
            this.disableButton();
        }
    }

    toggleClose = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    };


    fetchData = () => {
        instance.get(`admin/proofreader`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {
                let result = res.data.data === null ? [] : res.data.data.map((value, index) => {
                    return (
                        { value: value.userId, label: value.userName }
                    )
                })
                this.setState({ itemReviewer: result, proofReaderLoading: false}, () => { this.selectProof() });
            })
    };

    toggle = (bankCode, revisionID) => {
        instance.get(`itembank/revisions/${bankCode}/${revisionID}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {
                this.setState({ revisionComparision: res.data.data, revisionDataLoad: false });
            })
            .catch(err => {
                this.setState({ revisionDataLoad: false })
            })
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    selectProof = () => {
        if (this.props.location.query) {
            let proofReaderselect = this.props.location.query.itemBankProofReader
            this.state.itemReviewer.forEach(function (element) {
                element.value === proofReaderselect ? proofReaderselect = element : null
            });
            this.setState({
                selectedProofReader: proofReaderselect
            })
        }
    }

    revisionData = () => {
        instance.get(`itembank/revision/${this.props.location.query.itemBankCode}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {

                this.setState({ revision: res.data.data, revisionLoad: false });
            })
            .catch(e => {
                this.setState({ revisionLoad: false })
            })
    };
    componentDidUpdate(){

        var els = document.querySelectorAll('.page-link');
    
                for (var i=0; i < els.length; i++) {
                        // els[i].setAttribute("tabindex", "0") ;
                        els[i].setAttribute("href", "javascript:void(0)") ;
    
            }
          }

    componentDidMount() {
        if (this.props.location.query === undefined || null) {
            HASH_HISTORY.push("/admin/list_itembank")
        } else {
            this.revisionData()

            this.fetchData()

            instance.get("admin/itemtags", {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,        
                }
              })
                .then(res => {

                    if (res.data.data != false) {
                        this.setState({
                            contentTypeTagList: res.data.data
                        }, () => this.itemTagSelection())
                    }
                })
            if (this.props.location.query) {
                
                customPageTitle('Items Update');

                this.props.currentState("admin/itembank/");
                const html = this.props.location.query.itemBankQuestion === null || this.props.location.query.itemBankQuestion === "" ? "<p></p>" : this.props.location.query.itemBankQuestion;
                    const distractor = this.props.location.query.itemBankDistractorRationale === null || this.props.location.query.itemBankDistractorRationale === "" ? "<p></p>" : this.props.location.query.itemBankDistractorRationale;
                    const choice1 = this.props.location.query.itemBankOption1;
                    const choice2 = this.props.location.query.itemBankOption2;
                    const choice3 = this.props.location.query.itemBankOption3;
                    const choice4 = this.props.location.query.itemBankOption4;
                    const choice5 = this.props.location.query.itemBankOption5;
                    const contentBlock = htmlToDraft(html);
                    const contentDistractor = htmlToDraft(distractor);
                    const contentChoice1 = htmlToDraft(choice1 === null || choice1 === "" ? "<p><p>" : choice1);
                    const contentChoice2 = htmlToDraft(choice2 === null || choice1 === "" ? "<p><p>" : choice2);
                    const contentChoice3 = htmlToDraft(choice3 === null || choice1 === "" ? "<p><p>" : choice3);
                    const contentChoice4 = htmlToDraft(choice4 === null || choice1 === "" ? "<p><p>" : choice4);
                    const contentChoice5 = htmlToDraft(choice5 === null || choice1 === "" ? "<p><p>" : choice5);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            editorState: editorState
                        })
                    }
                    if (contentDistractor) {
                        const contentState = ContentState.createFromBlockArray(contentDistractor.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            distractor: editorState
                        })
                    }
                    if (contentChoice1) {
                        const contentState = ContentState.createFromBlockArray(contentChoice1.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            choice1: editorState
                        })
                    }
                    if (contentChoice2) {
                        const contentState = ContentState.createFromBlockArray(contentChoice2.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            choice2: editorState
                        })
                    }
                    if (contentChoice3) {
                        const contentState = ContentState.createFromBlockArray(contentChoice3.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            choice3: editorState
                        })
                    }
                    if (contentChoice4) {
                        const contentState = ContentState.createFromBlockArray(contentChoice4.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            choice4: editorState
                        })
                    }
                    if (contentChoice5) {
                        const contentState = ContentState.createFromBlockArray(contentChoice5.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        this.setState({
                            choice5: editorState
                        })
                    }
                    let base = this.props.location.query;
                    let itemBankStatus = base.itemBankStatus === null || base.itemBankStatus === undefined ? "" : base.itemBankStatus;

                    var statusArray = preferenceStatus.filter(function (el) {
                        return el.value.toString() === itemBankStatus.toString()
                      });

                    let subject = base.itemBankSubject === null || base.itemBankSubject === undefined ? "" : base.itemBankSubject;
                    let subjectId = base.itemBankSubjectId === null || base.itemBankSubjectId === undefined ? "" : base.itemBankSubjectId;

                    var subjectArray = subjectList.filter(function (el) {
                        return el.value.toLowerCase() === subject.toLowerCase() || el.label.toLowerCase() === subject.toLowerCase() || el.id.toString() === subjectId.toString()
                      });

                    let getSubjectID = subjectArray[0].id
                    let topic = base.itemBankTopic === null || base.itemBankTopic === undefined ? "" : base.itemBankTopic;
                    let topicId = base.itemBankTopicId === null || base.itemBankTopicId === undefined ? "" : base.itemBankTopicId;

                    let topicArray;
                    if (getSubjectID === 1) {
                        topicArray = civilProcedure.filter(function (el) {
                            return el.value.toLowerCase() === topic.toLowerCase() || el.label.toLowerCase() === topic.toLowerCase() || el.topicID.toString() === topicId.toString()
                          });
                    } else if (getSubjectID === 2) {
                        topicArray = constitutionalLaw.filter(function (el) {
                            return el.value.toLowerCase() === topic.toLowerCase() || el.label.toLowerCase() === topic.toLowerCase() || el.topicID.toString() === topicId.toString()
                          });
                    } else if (getSubjectID === 3) {
                        topicArray = contracts.filter(function (el) {
                            return el.value.toLowerCase() === topic.toLowerCase() || el.label.toLowerCase() === topic.toLowerCase() || el.topicID.toString() === topicId.toString()
                          });
                    } else if (getSubjectID === 4) {
                        topicArray = criminalLaw.filter(function (el) {
                            return el.value.toLowerCase() === topic.toLowerCase() || el.label.toLowerCase() === topic.toLowerCase() || el.topicID.toString() === topicId.toString()
                          });
                    } else if (getSubjectID === 5) {
                        topicArray = evidence.filter(function (el) {
                            return el.value.toLowerCase() === topic.toLowerCase() || el.label.toLowerCase() === topic.toLowerCase() || el.topicID.toString() === topicId.toString()
                          });
                    } else if (getSubjectID === 6) {
                        topicArray = realProperty.filter(function (el) {
                            return el.value.toLowerCase() === topic.toLowerCase() || el.label.toLowerCase() === topic.toLowerCase() || el.topicID.toString() === topicId.toString()
                          });
                    } else if (getSubjectID === 7) {
                        topicArray = torts.filter(function (el) {
                            return el.value.toLowerCase() === topic.toLowerCase() || el.label.toLowerCase() === topic.toLowerCase() || el.topicID.toString() === topicId.toString()
                          });
                    }


                    var item = (this.props.location.query.itemBankTag === null || this.props.location.query.itemBankTag === undefined ? "" : this.props.location.query.itemBankTag).split(',')
                    let selectedItemTags = item.map(a => { return { value: a, label: a } })


                    this.setState({
                        rowData: this.props.location.query || null,
                        selectedStatus: statusArray[0],
                        selectedSubject: subjectArray[0],
                        selectedTopic: topicArray[0],
                        getSubjectID: getSubjectID,
                        toggleTopicOnValue: getSubjectID,
                        value: selectedItemTags,
                        isTopicSelected: true,
                        isSubjectSelected: true,
                        SelectedValuesforValuesIndex:
                            this.props.location.query.itemBankValue === "A"
                                ? 0
                                : this.props.location.query.itemBankValue === "B"
                                    ? 1
                                    : this.props.location.query.itemBankValue === "C"
                                        ? 2
                                        : this.props.location.query.itemBankValue === "D"
                                            ? 3
                                            : this.props.location.query.itemBankValue === "E"
                                                ? 4
                                                : ""
                    })


            }

        }
    }

    itemTagSelection = () => {
        const data = this.state.contentTypeTagList.filter(value => { return value.itemTagStatus === "y" ? value.itemTagStatus : "" })
        let result = data.map((value, index) => {
            return (
                { value: value.itemTagName, label: value.itemTagName }
            )
        })
        this.setState({ contentTypeTag: result })
    }

    removeHTMLTags = (str) => {
        let a = str === null || str === undefined ? "<p></p>" : str.replace(/<[^>]*>?|&nbsp;/gm, "")
        return a;
      };


    submit = (model) => {
        var a =this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice1.getCurrentContent()))).trim();
        var b = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice2.getCurrentContent()))).trim();
        var c = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice3.getCurrentContent()))).trim();
        var d = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice4.getCurrentContent()))).trim();
        var e = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice5.getCurrentContent()))).trim();
        

if( a ==  b || a ==  c || a ==  d || a == e || b == c || b == d || b == e || c ==  d || c ==  e || d == e ) {
    swal(language.invalid, language.itemBankDifferentOptions);
    return false;
}
else{
        this.props.redirectPath('itembank');

        let list = this.state.value.map(a => { return a.value })
        var multivaluetags = list.join(',');
        if (this.props.location.query.itemBankOption1 != draftToHtml(convertToRaw(this.state.choice1.getCurrentContent()))
            || this.props.location.query.itemBankOption2 != draftToHtml(convertToRaw(this.state.choice2.getCurrentContent()))
            || this.props.location.query.itemBankOption3 != draftToHtml(convertToRaw(this.state.choice3.getCurrentContent()))
            || this.props.location.query.itemBankOption4 != draftToHtml(convertToRaw(this.state.choice4.getCurrentContent()))
            || this.props.location.query.itemBankOption5 != draftToHtml(convertToRaw(this.state.choice5.getCurrentContent()))
        ) {
            this.state.revisionDataChange.push("Multiple choice")
        }

        if (this.props.location.query.itemBankQuestion != draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        ) {
            this.state.revisionDataChange.push("Question")
        }
        if (this.props.location.query.itemBankDistractorRationale != draftToHtml(convertToRaw(this.state.distractor.getCurrentContent()))
        ) {
            this.state.revisionDataChange.push("Answer")
        }
        if (this.props.location.query.itemBankStatus != this.state.selectedStatus.value) {

            let status = preferenceStatus[this.state.selectedStatus.value - 1].label;
            this.state.revisionDataChange.push(`status to ${status}`)
        }

        let validResponse = this.state.SelectedValuesforValuesIndex == 0 ? 'A'
            : this.state.SelectedValuesforValuesIndex == 1 ? 'B'
                : this.state.SelectedValuesforValuesIndex == 2 ? 'C'
                    : this.state.SelectedValuesforValuesIndex == 3 ? 'D'
                        : this.state.SelectedValuesforValuesIndex == 4 ? 'E'
                            : this.props.location.query.itemBankValue;

        if (this.props.location.query.itemBankValue != validResponse) {
            this.state.revisionDataChange.push(`valid response to ${validResponse}`)
        }
        if (this.props.location.query.itemBankTag != multivaluetags) {
            this.state.revisionDataChange.push(`tag to ${multivaluetags}`)
        }
        if (this.props.location.query.itemBankSubject != this.state.selectedSubject.value) {
            this.state.revisionDataChange.push(`subject to  ${this.state.selectedSubject.value}`)
        }
        if (this.props.location.query.itemBankTopic != this.state.selectedTopic.value) {
            this.state.revisionDataChange.push(`topic to  ${this.state.selectedTopic.value}`)
        }
        var itembankchange = this.state.revisionDataChange.join(',');


        const data = JSON.stringify({
            "itemBankCode": this.state.rowData.itemBankCode,
            "itemBankQuestion": draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            "itemBankOption1": draftToHtml(convertToRaw(this.state.choice1.getCurrentContent())),
            "itemBankOption2": draftToHtml(convertToRaw(this.state.choice2.getCurrentContent())),
            "itemBankOption3": draftToHtml(convertToRaw(this.state.choice3.getCurrentContent())),
            "itemBankOption4": draftToHtml(convertToRaw(this.state.choice4.getCurrentContent())),
            "itemBankOption5": this.removeHTMLTags(draftToHtml(convertToRaw(this.state.choice5.getCurrentContent()))).trim() === "" ? "" : draftToHtml(convertToRaw(this.state.choice5.getCurrentContent())),
            "itemBankCreatedDate": null,
            "itemBankCreatedBy": "Adm01",
            "itemBankSubject": this.state.selectedSubject.value,
            "itemBankSubjectId": this.state.selectedSubject.id,
            "itemBankTopic": this.state.selectedTopic.value,
            "itemBankTopicId": this.state.selectedTopic.topicID,
            "itemBankTag": multivaluetags,
            "itemBankValue": this.state.SelectedValuesforValuesIndex === 0 ? 'A' : this.state.SelectedValuesforValuesIndex === 1 ? 'B' : this.state.SelectedValuesforValuesIndex === 2 ? 'C' : this.state.SelectedValuesforValuesIndex === 3 ? 'D' : this.state.SelectedValuesforValuesIndex === 4 ? 'E' : this.props.location.query.itemBankValue,
            "itemBankStatus": this.state.selectedStatus.value,
            "itemBankDistractorRationale": draftToHtml(convertToRaw(this.state.distractor.getCurrentContent())),
            "itemBankProofReader": this.state.selectedProofReader === null ? null : this.state.selectedProofReader.value,
            "itemBankChange": itembankchange
        })

        this.props.updateData({
            data: data,
            id: this.state.rowData.itemBankId,
            path: 'admin/itembanks'
        })
    };
}

    selectedValueForValue = (index, answer, e) => {

        this.setState({
            optionLabel: e.target.value,
            SelectedValuesforValuesIndex: index,
            SelectedValuesforValues: answer,
        }, () => this.enableButton());
    }


    userNamehandleChange = (value, actionMeta) => {
        this.enableButton();
        this.setState({ value });
    };

    handleInputChange = (inputValue) => {
        this.setState({ inputValue });
    };

    handleKeyDown = (event) => {
        const { inputValue, value } = this.state;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                this.setState({
                    inputValue: '',
                    value: [...value, createOption(inputValue)],
                    isMultiEmail: true,
                }, () => this.enableButton());
                event.preventDefault();
        }
    };



    subjectTag = (selectedValue) => {
        this.setState({
            selectedSubject: selectedValue, selectedTopic: '', isSubjectSelected: true
        }, () => this.disableButton());
        if (selectedValue.id == 1) {
            this.setState({ toggleTopicOnValue: 1 })
        } else if (selectedValue.id == 2) {
            this.setState({ toggleTopicOnValue: 2 })
        } else if (selectedValue.id == 3) {
            this.setState({ toggleTopicOnValue: 3 })
        } else if (selectedValue.id == 4) {
            this.setState({ toggleTopicOnValue: 4 })
        } else if (selectedValue.id == 5) {
            this.setState({ toggleTopicOnValue: 5 })
        } else if (selectedValue.id == 6) {
            this.setState({ toggleTopicOnValue: 6 })
        } else if (selectedValue.id == 7) {
            this.setState({ toggleTopicOnValue: 7 })
        }
    };

    topicTag = (selectedValue) => {
        this.setState({
            selectedTopic: selectedValue, isTopicSelected: true
        }, () => { this.enableButton() });
    };

    preferenceStatus = (selectedValue) => {
        if (selectedValue.value === 2) {
            this.setState({
                selectedStatus: selectedValue,
            }, this.state.selectedProofReader == null ?  () => this.disableButton() :() => this.enableButton()
            );
        } else {
            this.setState({
                selectedStatus: selectedValue,
            }, () => this.enableButton());
        }
    };

    itemReviewer = (selectedValue) => {
        this.setState({
            selectedProofReader: selectedValue
        }, () => {
            this.enableButton();
            this.state.selectedProofReader, "SELECTED PROOF READER"
        });

    };

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems }); //pagination
    }

    render() {

        const changeData = this.state.pageOfItems.map(a => { return a.item })
        const { editorState, distractor } = this.state;
        const option1 = this.state.rowData.itemBankOption1
        const option2 = this.state.rowData.itemBankOption2
        const option3 = this.state.rowData.itemBankOption3
        const option4 = this.state.rowData.itemBankOption4
        const option5 = this.state.rowData.itemBankOption5
        const values = [
            { value: "0", optionLabel: "A", answer: option1 },
            { value: "1", optionLabel: "B", answer: option2 },
            { value: "2", optionLabel: "C", answer: option3 },
            { value: "3", optionLabel: "D", answer: option4 },
            { value: "4", optionLabel: "E", answer: option5 }
        ]

        return (
            <div>
                <Formsy
                    onValidSubmit={this.submit}
                    onInvalid={this.disableButton}
                >
                    <div className="mb-2 container-fluid mt-3">

                        <Row>
                            <Col
                                xs="12"
                                sm="12"
                                md="5"
                                lg="5"
                                xl="5"
                                className="msedge-admin-title"
                            >
    <h1 className="msedge-overview-text">{language.items}</h1>
                            </Col>
                            <Col xs="12" sm="12" md="7" lg="7" xl="7" className="text-right">
                                <div className="form-group">
                                    {!this.props.isLoading ? (
                                        <span className="msedge-questions-start msedge-right-br">
                                            <button
                                                type="submit"
                                                className="btn btn-outline-primary mr-2"
                                                disabled={!this.state.canSubmit}

                                                style={{ cursor: this.state.cursorDisable }}
                                            >
                                                <li>
                                                    <i className="pe-7s-note" aria-hidden="true"></i>
                                                </li>
                                    <li className="text-uppercase">{language.update}</li>
                                            </button>
                                        </span>
                                    ) : (
                                            <span className="msedge-questions-start msedge-right-br mr-2">
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    disabled
                                                >
                                                    <li>
                                                        <span
                                                            className="spinner-border spinner-border-sm mr-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                    </li>
                                                    <li className="text-uppercase">
                                                        {language.buttonLoading}
                                        </li>
                                                </button>
                                            </span>
                                        )}
                                    <span className="msedge-questions-start msedge-right-br">
                                        <Link to="/admin/list_itembank">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                            >
                                                <li>
                                                    <i className="pe-7s-back" aria-hidden="true"></i>
                                                </li>
                                    <li className="text-uppercase">{language.back}</li>
                                            </button>
                                        </Link>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md="6" xl="6" sm="12" xs="12">
                            <Row>
                                <div className="container-fluid bg-grey msedge-admin-add">
                                    <Card>
                                        <CardBody>
                                            <div className="msedge-proof-reader-update">
                                                <div>
                                                    <h2 className="text-primary pb-3 border-bottom"> {language.reference} : {""}<span className="text-grey">{this.state.rowData.itemBankCode}</span></h2>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-8 px-4">
                                                        <p>{language.question} <abbr className="text-danger">{" "}*</abbr></p>

                                                        <span id="qustion" className="info-icons">
                                                            <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                                                            <FontAwesomeIcon
                                                                className="question-icon"
                                                                icon={faQuestion}
                                                            />
                                                        </span>
                                                        <UncontrolledTooltip placement="right" target="qustion">
                                                            {language.edit_question}
                                                                </UncontrolledTooltip>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="textarea-size">
                                                            <Editor
                                                                editorState={editorState}
                                                                wrapperClassName="demo-wrapper"
                                                                editorClassName="demo-editor"
                                                                onEditorStateChange={this.onEditorStateChange}
                                                                toolbar={{
                                                                    options: ['inline', 'blockType'],
                                                                    inline: { options: ['bold', 'italic', 'underline'] }
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-danger pl-2">
                                                            {this.state.errorMsg[0]}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="d-flex border-top">
                                                        <div className="pt-3 pb-1">
                                                            <h2 className="text-primary">
                                                                {language.multiple_choice_option}
                                                     </h2>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom pb-3">
                                                        <div className="row">
                                                            <div className="col-md-8  px-4">
                                                                <p>{language.option} 1 <abbr className="text-danger">{" "}*</abbr></p>
                                                                <span id="option1" className="info-icons">
                                                                    <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                                                                    <FontAwesomeIcon
                                                                        className="question-icon"
                                                                        icon={faQuestion}
                                                                    />
                                                                </span>
                                                                <UncontrolledTooltip placement="right" target="option1">
                                                                    {language.edit_option} 1
                                                                </UncontrolledTooltip>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="textarea-size">
                                                                    <Editor
                                                                        editorState={this.state.choice1}
                                                                        wrapperClassName="demo-wrapper"
                                                                        editorClassName="demo-editor"
                                                                        fieldHandler={this.fieldHandler}
                                                                        onEditorStateChange={this.onEditorStateChangeChoice1}
                                                                        toolbar={{
                                                                            options: ['inline', 'blockType'],
                                                                            inline: { options: ['bold', 'italic', 'underline'] }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-danger pl-2">
                                                                    {this.state.errorMsg[1]}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-8  px-4">
                                                                <p className="text-muted">{language.option} 2<abbr className="text-danger">{" "}*</abbr></p>

                                                                <span id="option2" className="info-icons">
                                                                    <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                                                                    <FontAwesomeIcon
                                                                        className="question-icon"
                                                                        icon={faQuestion}
                                                                    />
                                                                </span>
                                                                <UncontrolledTooltip placement="right" target="option2">
                                                                    {language.edit_option} 2
                                                                </UncontrolledTooltip>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="textarea-size">
                                                                    <Editor
                                                                        editorState={this.state.choice2}
                                                                        wrapperClassName="demo-wrapper"
                                                                        editorClassName="demo-editor"
                                                                        onEditorStateChange={this.onEditorStateChangeChoice2}
                                                                        toolbar={{
                                                                            options: ['inline', 'blockType'],
                                                                            inline: { options: ['bold', 'italic', 'underline'] }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-danger pl-2">
                                                                    {this.state.errorMsg[2]}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-8  px-4">
                                                                <p className="text-muted">{language.option} 3 <abbr className="text-danger">{" "}*</abbr></p>

                                                                <span id="option3" className="info-icons">
                                                                    <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                                                                    <FontAwesomeIcon
                                                                        className="question-icon"
                                                                        icon={faQuestion}
                                                                    />
                                                                </span>

                                                                <UncontrolledTooltip placement="right" target="option3">
                                                                {language.edit_option} 3
                                                                </UncontrolledTooltip>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="textarea-size">
                                                                    <Editor
                                                                        editorState={this.state.choice3}
                                                                        wrapperClassName="demo-wrapper"
                                                                        editorClassName="demo-editor"
                                                                        onEditorStateChange={this.onEditorStateChangeChoice3}
                                                                        toolbar={{
                                                                            options: ['inline', 'blockType'],
                                                                            inline: { options: ['bold', 'italic', 'underline'] }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-danger pl-2">
                                                                    {this.state.errorMsg[3]}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-8  px-4">
                                                                <p className="text-muted">{language.option} 4 <abbr className="text-danger">{" "}*</abbr></p>
                                                                <span id="option4" className="info-icons">
                                                                    <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                                                                    <FontAwesomeIcon
                                                                        className="question-icon"
                                                                        icon={faQuestion}
                                                                    />
                                                                </span>
                                                                <UncontrolledTooltip placement="right" target="option4">
                                                                {language.edit_option} 4
                                                                </UncontrolledTooltip>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="textarea-size">
                                                                    <Editor
                                                                        editorState={this.state.choice4}
                                                                        wrapperClassName="demo-wrapper"
                                                                        editorClassName="demo-editor"
                                                                        onEditorStateChange={this.onEditorStateChangeChoice4}
                                                                        toolbar={{
                                                                            options: ['inline', 'blockType'],
                                                                            inline: { options: ['bold', 'italic', 'underline'] }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-danger pl-2">
                                                                    {this.state.errorMsg[4]}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-8  px-4">
                                                                <p className="text-muted">{language.option} 5 </p>
                                                                <span id="option5" className="info-icons">
                                                                    <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                                                                    <FontAwesomeIcon
                                                                        className="question-icon"
                                                                        icon={faQuestion}
                                                                    />
                                                                </span>
                                                                <UncontrolledTooltip placement="right" target="option5">
                                                                {language.edit_option} 5
                                                                </UncontrolledTooltip>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="textarea-size">
                                                                    <Editor
                                                                        editorState={this.state.choice5}
                                                                        wrapperClassName="demo-wrapper"
                                                                        editorClassName="demo-editor"
                                                                        onEditorStateChange={this.onEditorStateChangeChoice5}
                                                                        toolbar={{
                                                                            options: ['inline', 'blockType'],
                                                                            inline: { options: ['bold', 'italic', 'underline'] }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="text-danger pl-2">
                                                                    {this.state.errorMsg[5]}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-3 pb-1">
                                                        <h2 className="text-primary">
                                                            {language.explanation}
                                                     </h2>
                                                    </div>
                                                    <div className="row item-answer-explanation  pb-2">
                                                        <div className="col-md-8  px-4">
                                                            <p>{language.distractor_rationale} <abbr className="text-danger">{" "}*</abbr></p>

                                                            <span id="disatractorRational" className="info-icons">
                                                                <FontAwesomeIcon
                                                                    className="tooltip-info"
                                                                    icon={faCommentAlt} />
                                                                <FontAwesomeIcon
                                                                    className="question-icon"
                                                                    icon={faQuestion}
                                                                />
                                                                <UncontrolledTooltip placement="right" target="disatractorRational">
                                                                    {language.edit_explanation}
                                                </UncontrolledTooltip>
                                                            </span>

                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="textarea-size">
                                                                <Editor
                                                                    editorState={distractor}
                                                                    wrapperClassName="demo-wrapper"
                                                                    editorClassName="demo-editor"
                                                                    onEditorStateChange={this.onEditorStateDistractorChange}
                                                                    toolbar={{
                                                                        options: ['inline', 'blockType'],
                                                                        inline: { options: ['bold', 'italic', 'underline'] }
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-danger pl-2">
                                                                {this.state.errorMsg[6]}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="msedge-preference-collapse">
                                                    <div className="pt-3 pb-1 border-top">
                                                        <h2 className="text-primary">
                                                            {language.preferences}
                                                     </h2>
                                                    </div>
                                                    <div className="textarea-size">
                                                        <div className="pb-3">
                                                            <div className="d-flex">
                                                                <label className="fieldname-font-size">{language.status} <abbr className="text-danger">{" "}*</abbr></label>
                                                                <div id="status" className="info-icons pl-2">
                                                                    <FontAwesomeIcon
                                                                        className="tooltip-info"
                                                                        icon={faCommentAlt}
                                                                    />
                                                                    <FontAwesomeIcon
                                                                        className="question-icon"
                                                                        icon={faQuestion}
                                                                    />
                                                                </div>
                                                                <UncontrolledTooltip placement="right" target="status">
                                                                    {language.select_status}
                                                </UncontrolledTooltip>
                                                            </div>

                                                            <Select
                                                                aria-label="status"
                                                                onChange={this.preferenceStatus}
                                                                value={this.state.selectedStatus}
                                                                options={preferenceStatus}
                                                            />
                                                        </div>

                                                        {this.state.selectedStatus.value == 2 ?
                                                        <>
                                                        {this.state.proofReaderLoading ? 
                                                                <ContentLoader/>
                                                                :
                                                                <div className="pb-3">
                                                                <div className="d-flex">
                                                                    <label className="fieldname-font-size">{language.proof_reader} <abbr className="text-danger">{" "}*</abbr></label>
                                                                    <div id="status" className="info-icons pl-2">
                                                                        <FontAwesomeIcon
                                                                            className="tooltip-info"
                                                                            icon={faCommentAlt}
                                                                        />
                                                                        <FontAwesomeIcon
                                                                            className="question-icon"
                                                                            icon={faQuestion}
                                                                        />
                                                                    </div>

                                                                </div>
                                                                <Select
                                                                    aria-label=""
                                                                    onChange={this.itemReviewer}
                                                                    value={this.state.selectedProofReader}
                                                                    options={this.state.itemReviewer}
                                                                />
                                                            </div>
                                                    }
                                                        
                                                        </>
                                                            
                                                            : ""}

                                                        <div className="msedge-valid-response mt-2">
                                                            <div className="d-flex">
                                                                <label className="fieldname-font-size">{language.valid_response} <abbr className="text-danger">{" "}*</abbr></label>
                                                                <div className="info-icons" id="validResponse">
                                                                    <FontAwesomeIcon
                                                                        className="tooltip-info ml-2"
                                                                        icon={faCommentAlt}
                                                                        id="validResponse"
                                                                    />
                                                                    <FontAwesomeIcon
                                                                        className="question-icon"
                                                                        icon={faQuestion}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <UncontrolledTooltip
                                                                placement="right"
                                                                target="validResponse"
                                                            >
                                                                {language.select_resposnse}
                                               </UncontrolledTooltip>
                                                            <div className="" >
                                                                {values.map((option, index) => (

                                                                    <Row className={
                                                                        this.state.SelectedValuesforValuesIndex === index
                                                                            ? "item-bank-value-list-selected msedge-flex-center"
                                                                            : "item-bank-value-list-not-selected msedge-flex-center"
                                                                    } htmlFor={index} onClick={(e) => this.selectedValueForValue(index, option.answer, e)}>
                                                                        <Col md="2" className="option-label">
                                                                            <span >{option.optionLabel}</span>
                                                                        </Col>

                                                                        <Col md="10" className="item-bank-answer-list">
                                                                            <div >
                                                                                <label>
                                                                                    <input
                                                                                        type="radio"
                                                                                        id={index}
                                                                                        aria-label="answer value"
                                                                                        name={index}
                                                                                        value={values.answer}
                                                                                        autocomplete="off"
                                                                                        checked={this.state.SelectedValuesforValuesIndex === index ? true : false}
                                                                                        style={{ display: "none" }}
                                                                                    ></input>
                                                                                    <label dangerouslySetInnerHTML={{ __html: option.answer }}></label>
                                                                                </label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                ))}
                                                            </div>
                                                        </div>


                                                        <Row className="mt-3">
                                                            <Col md="4" className="text-left">
                                                       <p className="m-0 p-2 add-item-dese">{language.tags}</p>
                                                            </Col>
                                                            <Col md="8" className="text-left">
                                                                <div className="m-1 p-1">
                                                                    <Select
                                                                        aria-label="content type"
                                                                        closeMenuOnSelect={false}
                                                                        value={this.state.selectedItemTags}
                                                                        isMulti
                                                                        options={this.state.contentTypeTag}
                                                                        onChange={this.userNamehandleChange}
                                                                        onInputChange={this.handleInputChange}
                                                                        onKeyDown={this.handleKeyDown}
                                                                        components={components}
                                                                        inputValue={this.state.inputValue}
                                                                        isClearable
                                                                        value={this.state.value}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-3">
                                                            <Col md="4" className="text-left">
                                                                <p className="m-0 p-2 add-item-dese">{language.subject_or} <abbr className="text-danger">{" "}*</abbr></p>
                                                            </Col>
                                                            <Col md="8" className="text-left">
                                                                <div className="m-1 p-1">
                                                                    <Select
                                                                        aria-label="select subject"
                                                                        onChange={this.subjectTag}
                                                                        value={this.state.selectedSubject}
                                                                        labelKey="label"
                                                                        valueKey="value"
                                                                        options={subjectList}

                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-3">
                                                            <Col md="4" className="text-left">
                                                                <p className="m-0 p-2 add-item-dese">{language.topic} <abbr className="text-danger">{" "}*</abbr></p>
                                                            </Col>
                                                            <Col md="8" className="text-left">
                                                                <div className="m-1 p-1">
                                                                    <Select
                                                                        aria-label="select subject"
                                                                        onChange={this.topicTag}
                                                                        value={this.state.selectedTopic}
                                                                        labelKey="label"
                                                                        valueKey="value"
                                                                        options={this.state.toggleTopicOnValue === 1 ? civilProcedure :
                                                                            this.state.toggleTopicOnValue === 2 ? constitutionalLaw :
                                                                                this.state.toggleTopicOnValue === 3 ? constitutionalLaw :
                                                                                    this.state.toggleTopicOnValue === 4 ? criminalLaw :
                                                                                        this.state.toggleTopicOnValue === 5 ? evidence :
                                                                                            this.state.toggleTopicOnValue === 6 ? realProperty :
                                                                                                torts
                                                                        }
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Row>
                        </Col>
                        <Col md="6" xl="6" sm="12" xs="12" className="px-0">
                            <div className="view-content">
                                <div className="container-fluid view-bg-grey ">
                                    <Card>
                                        <CardBody>
                                            <div className="view-question-section">

                                                <div className="view-question-content">

                                                    <div className="view-question">
                                                        <p dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankQuestion }}></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="view-option-section">
                                                <div className="view-option-content border">
                                                    <div className="view-option">
                                                        <Row className="view-letter-content m-0">
                                                            <Col md="2" className={this.state.rowData.itemBankValue === "A" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                <p className="view-letter-option">A</p>
                                                            </Col>
                                                            <Col md="10" className="vew-text-content">
                                                                <p className="view-text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption1 }}></p>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                    <div className="view-option">
                                                        <Row className="view-letter-content m-0">
                                                            <Col md="2" className={this.state.rowData.itemBankValue === "B" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                <p className="view-letter-option">B</p>
                                                            </Col>
                                                            <Col md="10" className="vew-text-content">
                                                                <p className="view-text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption2 }}></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className="view-option">
                                                        <Row className="view-letter-content m-0">
                                                            <Col md="2" className={this.state.rowData.itemBankValue === "C" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                <p className="view-letter-option">C</p>
                                                            </Col>
                                                            <Col md="10" className="vew-text-content">
                                                                <p className="view-text-option pt-2" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption3 }}></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className="view-option">
                                                        <Row className="view-letter-content m-0">
                                                            <Col md="2" className={this.state.rowData.itemBankValue === "D" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                <p className="view-letter-option">D</p>
                                                            </Col>
                                                            <Col md="10" className="vew-text-content">
                                                                <p className="view-text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption4 }}></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className="view-option">
                                                        <Row className="m-0 view-letter-content">
                                                            <Col md="2" className={this.state.rowData.itemBankValue === "E" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                <p className="view-letter-option">E</p>
                                                            </Col>
                                                            <Col md="10" className="vew-text-content">
                                                                <p className="view-text-option pt-2" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption5 }}></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                                <div className="view-answer-explanation-content">
                                                    <p>{this.state.rowData.itemBankExplanation}
                                                    </p>
                                                </div>
                                            </div>

                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                            <div className="view-content">
                                <div className="container-fluid view-bg-grey pt-0">

                                    <Card>
                                        <CardBody>
                                            <div className="d-flex">
                                                <div className="pb-1">
                                                    <h2 className="text-primary msedge-font-for-revision">
                                                        {language.revision_history}
                                                     </h2>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                                    {this.state.revisionLoad ? <Loading /> :
                                                        <>
                                                            {this.state.revision === null || this.state.revision === [] ?
                                                           <p className="text-center">{language.no_history_found}</p>

                                                                :
                                                                <div>
                                                                    {this.state.pageOfItems.map((data, index) => (
                                                                        <div>
                                                                            {data.item_bank_change === null || "" ? "" :
                                                                                <>
                                                                                    <div className="border-bottom revision-history-border msedge-align-rev-history">
                                                                                        <h6 className="mb-0 ">
                                                                                            <span className="font-weight-bold" >{data.user_first_name}</span> {" modified "}
                                                                                            <span className="font-weight-light ">
                                                                                                {data.item_bank_change}
                                                                                                {data.item_bank_change.split(',').includes("Multiple choice") === true || data.item_bank_change.split(',').includes("Answer") === true || data.item_bank_change.split(',').includes("Question") === true ?
                                                                                                    <span className="revision-show-details" onClick={() => this.toggle(data.item_bank_code, data.item_bank_revision)}>-Show details</span>
                                                                                                    : ""
                                                                                                }
                                                                                            </span>
                                                                                        </h6>
                                                                                        <span className="font-weight-light item-bank-add-ada">{moment(data.item_bank_revision_date).fromNow()}</span>
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    ))}
                                                                    <div className="mt-3 text-center">
                                                                        <JwPagination
                                                                            pageSize={10}
                                                                            items={this.state.revision}
                                                                            onChangePage={this.onChangePage}
                                                                            labels={customLabels}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </>
                                                    }

                                                </div>
                                            </div>

                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Modal
                        isOpen={this.state.modal}
                        className={`${this.props.className} itembank-revision-history-showdetail-model`}
                    >
                        <Col md="12" className="admin-revision-model-header">
                            <Row>

                                <Col md="3" className="content-weight-set my-3">
                                    {language.content}:
                                </Col>

                                <Col md="3" className="my-3">
                                    {language.older}
                                </Col>
                                <Col md="3" className="text-right my-3">
                                    {language.new}
                                        </Col>
                                <Col md="3" className="text-right my-3">

                                    <i className="pe-7s-close btn-close" data-for="close" onClick={this.toggleClose}></i>

                                </Col>
                            </Row>
                        </Col>
                        <div className="scroller-itembank-modal">
                            <ModalBody >
                                <CardBody className="pt-0">
                                    <Row>
                                        <Col md="12">
                                            {this.state.revisionDataLoad === true ? <Loading />
                                                :
                                                <>
    {this.state.revisionComparision === [] || this.state.revisionComparision.length === 0 ? <p className="text-center">{language.something_went_wrong}</p> :
                                                        <Row>
                                                            {this.state.revisionComparision.map((item, index) => (
                                                                <Col md="6">
                                                                    <div className="view-question-section">
                                                                        <div className="view-question-content">
                                                                            <div className="view-question">
                                                                                <div className="msedge-subhead">
                                                                                    <h2 className="text-primary modelpop-question">{language.question} :</h2>
                                                                                </div>
                                                                                <p dangerouslySetInnerHTML={{ __html: item.item_bank_question }}></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="view-option-section">
                                                                        <div className="msedge-subhead">
                                                                            <h2 className="text-primary modelpop-question pb-2">{language.multiple_choice}:</h2>
                                                                        </div>
                                                                        <div className="view-option-content border">
                                                                            <div className="view-option">
                                                                                <Row className="view-letter-content border-bottom m-0">
                                                                                    <Col md="2" className={item.itemBankValue === "A" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                                        <p className="view-letter-option option-text">A</p>
                                                                                    </Col>
                                                                                    <Col md="10" className="vew-text-content option-text bg-grey">
                                                                                        <p className="view-text-option item-bank-revision-model-popup-option" dangerouslySetInnerHTML={{ __html: item.item_bank_option1 }}></p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>

                                                                            <div className="view-option">
                                                                                <Row className="view-letter-content border-bottom m-0">
                                                                                    <Col md="2" className={item.itemBankValue === "B" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                                        <p className="view-letter-option option-text">B</p>
                                                                                    </Col>
                                                                                    <Col md="10" className="vew-text-content option-text bg-grey">
                                                                                        <p className="view-text-option item-bank-revision-model-popup-option" dangerouslySetInnerHTML={{ __html: item.item_bank_option2 }}></p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div className="view-option">
                                                                                <Row className="view-letter-content border-bottom m-0">
                                                                                    <Col md="2" className={item.itemBankValue === "C" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                                        <p className="view-letter-option option-text">C</p>
                                                                                    </Col>
                                                                                    <Col md="10" className="vew-text-content option-text bg-grey">
                                                                                        <p className="view-text-option item-bank-revision-model-popup-option" dangerouslySetInnerHTML={{ __html: item.item_bank_option3 }}></p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div className="view-option">
                                                                                <Row className="view-letter-content border-bottom m-0">
                                                                                    <Col md="2" className={item.itemBankValue === "D" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                                        <p className="view-letter-option option-text">D</p>
                                                                                    </Col>
                                                                                    <Col md="10" className="vew-text-content option-text bg-grey">
                                                                                        <p className="view-text-option item-bank-revision-model-popup-option" dangerouslySetInnerHTML={{ __html: item.item_bank_option4 }}></p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div className="view-option">
                                                                                <Row className="m-0 view-letter-content border-bottom">
                                                                                    <Col md="2" className={item.itemBankValue === "E" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                                                        <p className="view-letter-option option-text">E</p>
                                                                                    </Col>
                                                                                    <Col md="10" className="vew-text-content option-text bg-grey">
                                                                                        <p className="view-text-option item-bank-revision-model-popup-option" dangerouslySetInnerHTML={{ __html: item.item_bank_option5 }}></p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </div>
                                                                        <div className="view-answer-explanation-content">
                                                                            <div className="msedge-subhead">
                                                                                <h2 className="text-primary modelpop-question pt-3">{language.answer_explanation}:</h2>
                                                                            </div>

                                                                            <p dangerouslySetInnerHTML={{ __html: item.item_bank_distractor_Rationale }}>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    }
                                                </>
                                            }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </ModalBody>
                        </div>
                        <ModalFooter className="msedge-close-btn">
                            <button
                                className="btn btn-outline-primary mr-2"
                                onClick={this.toggleClose}
                            >
                                <li>
                                    <i className="pe-7s-close" data-for="close"></i>
                                </li>
                                        <li className="text-uppercase">{language.close}</li>
                            </button>
                        </ModalFooter>
                    </Modal>

                    <div className="container-fluid">
                        <Row>
                            <Col xs="12" sm="12" md="5" lg="5" xl="5"></Col>
                            <Col
                                xs="12"
                                sm="12"
                                md="7"
                                lg="7"
                                xl="7"
                                className="text-right"
                            >
                                <div className="form-group">
                                    {!this.props.isLoading ? (
                                        <span className="msedge-questions-start msedge-right-br">
                                            <button
                                                type="submit"
                                                className="btn btn-outline-primary mr-2"
                                                disabled={!this.state.canSubmit}

                                                style={{ cursor: this.state.cursorDisable }}
                                            >
                                                <li>
                                                    <i className="pe-7s-note" aria-hidden="true"></i>
                                                </li>
                                    <li className="text-uppercase">{language.update}</li>
                                            </button>
                                        </span>
                                    ) : (
                                            <span className="msedge-questions-start msedge-right-br mr-2">
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    disabled
                                                >
                                                    <li>
                                                        <span
                                                            className="spinner-border spinner-border-sm mr-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                    </li>
                                                    <li className="text-uppercase">
                                                        {language.buttonLoading}
                                                    </li>
                                                </button>
                                            </span>
                                        )}
                                    <span className="msedge-questions-start msedge-right-br">
                                        <Link to="/admin/list_itembank">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                            >
                                                <li>
                                                    <i className="pe-7s-back" aria-hidden="true"></i>
                                                </li>
                                    <li className="text-uppercase">{language.back}</li>
                                            </button>
                                        </Link>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </Formsy>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.main.isDataAdding
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        currentState,
        updateData,
        redirectPath

    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdate)