export const itemTagInitialRow = {
  item_tag_code: "",
  item_tag_name: "",
  item_tag_category: "",
  item_tag_status: "y"
};

export const itemBankInitialRow = {
  itemBankCode: "",
  itemBankId: "",
  itemBankQuestion: "",
  itemBankOption1: "",
  itemBankOption2: "",
  itemBankOption3: "",
  itemBankOption4: "",
  itemBankOption5: "",
  itemBankExplanation: "",
  itemBankFontsize: "",
  // itemBankLabelType: "",
  itemBankStyle: "",
  // itemBankCheckAnswerAttempts: [
  //   { value: "0", label: "0" },
  //   { value: "1", label: "1" }
  // ],
  // itemBankMinimumScore: [
  //   { value: "0", label: "0" },
  //   { value: "1", label: "1" }
  // ],
  // itemBankScoringType: [{ value: "e", label: "Exact Match" }],
  // itemBankScore: [{ value: "0", label: "0" }, { value: "1", label: "1" }],
  itemBankSubject: [
    { value: "Torts", label: "Torts" },
    { value: "Civil Procedure", label: "Civil Procedure" }
  ],
  itemBankTopic: [
    { value: "Individual Rights", label: "Individual Rights" },
    { value: "Titles", label: "Titles" }
  ],
  itemBankTag: "tag",
  itemBankValue: "value",
  // itemBankPracticeUsage: "yes",
  // itemBankAutoScore: "yes",
  itemBankDistractorRationale: "",
  itemBankPublicRefrence: "",
  // itemBankAcknowledgement: "",
  itemBankSampleAnswer: "",
  itemBankPrefernceReference: "",
  itemBankPrefrenceStatus: [
    { value: "a", label: "Draft" },
    { value: "b", label: "Review Inprogress" },
    { value: "c", label: "Reviewed" },
    { value: "d", label: "Published" },
    { value: "e", label: "Inactive" },
    { value: "f", label: "Deleted" }
  ],
  itemBankPreferenceDescription: "",
  itemBankPreferenceSource: "",
  // itemBankPreferenceNote: "0",
  itemBankPreferenceAcknowledgement: "",
  itemBankPreferenceFeatureStatus: "",
  questionScoreType: "",
  questionScoreFeatures: "",
  contentTypeTag: "",
  questionTypeTag: "",
  subjectTag: ""
};

export const categories = [
  { value: "Catagory one", label: "Catagory one" },
  { value: "Catagory two", label: "Catagory two" },
  { value: "Catagory three", label: "Catagory three" }
];

export const lawSchoolInitialRow = {
  lawSchoolCode: "",
  lawSchoolName: "",
  lawSchoolPhoneNumber: "",
  lawSchoolPrimaryEmail: "",
  lawSchoolWebsiteLink: "",
  lawSchoolCategory: "",
  lawSchoolAddress: "",
  lawSchoolContactFirstName: "",
  lawSchoolUsernme: "",
  lawSchoolPassword: "",
  lawSchoolType: "y",
  lawSchoolExpectedBarExamDate: "",
  lawSchoolExpectedBarExamState: "",
  lawSchoolContactPersonPhoneNumber: "",
  lawSchoolContactPersonEmail: "",
  lawSchoolCountry: "",
  lawSchoolState: "",
  lawSchoolCity: "",
  lawSchoolZIP: "",
  lawSchoolNoPrevBarExamsTaken: "",
  lawSchoolLawSchoolGPA: "",
  lawSchooLAST: "",
  lawSchoolFullTime: "",
  lawSchoolContactMiddleInitial: "",
  lawSchoolContactLastName: "",
  lawSchoolProfileActive: "y"
};

export const studentInitialRow = {
  student_code: "",
  student_barbri_id: "",
  student_first_name: "",
  student_middle_name: "",
  student_last_name: "",
  student_primary_email: "",
  student_law_school: "",
  student_law_school_GPA: "",
  student_LSAT: "",
  student_expected_bar_exam: "",
  student_expected_bar_exam_state: "",
  student_expected_bar_exam_taken: "",
  student_full_time: "",
  student_transfer: "",
  student_active: "y",
  student_phone: "",
  student_username: "",
  student_password: ""
};

export const UsersInitialRow = {
  user_first_name: "",
  user_last_name: "",
  user_primary_email: "",
  user_phone: "",
  user_role: "",
  user_profile_active: "y",
  user_password: "",
  user_name: "",
  isEmpty: false
};

export const selectUserRole = [
  { value: "1", label: "Controller" },
  { value: "2", label: "Operator" },
  { value: "3", label: "Viewer" },
  { value: "4", label: "Proof Reader" },
  { value: "5", label: "Lawschool" }
];

export const settingsInitialRow = {
  npassword: "",
  rpassword: "",
  settingsStandardQuestionAnswerTime: "",
  settingsInvitationLinkToExpireInHours: ""
};
export const ItemTagInitialRow = {
  item_tag_code: "",
  item_tag_name: "",
  item_tag_category: "",
  item_tag_status: "y"
};

export const settingscard = [
  "Message center notifications",
  "MBE countdown on overview",
  "All user stats on overview",
  "Keyboard shortcuts"
];

export const lawSchool_InitialRow = {
  student_code: "",
  student_barbri_id: "",
  student_first_name: "",
  student_middle_name: "",
  student_last_name: "",
  student_primary_email: "",
  student_law_school: "",
  student_law_school_GPA: "",
  student_LSAT: "",
  student_expected_bar_exam: "",
  student_expected_bar_exam_state: "",
  student_expected_bar_exam_taken: "",
  student_lawschool_admissiontest: "",
  student_org_id: "",
  student_lawschool_id: "",
  student_exp_exam_date: "",
  student_full_time: "",
  student_transfer: "",
  student_active: "y",
  student_phone: "",
  student_username: "",
  student_password: "",
  select_lawschool: "",
  select_exam_batch: "",
  select_barexam_state: "",
  student_status: "y"
};
export const selectLawSchool = [
  { value: "school1", label: "School1" },
  { value: "school2", label: "School2" },
  { value: "school3", label: "School3" }
];

export const selectExamBatch = [
  { value: "jan2019", label: "Jan 2019" },
  { value: "feb2019", label: "Feb 2019" },
  { value: "mar2019", label: "Mar 2019" }
];

export const selectBarExamState = [
  { value: "state1", label: "State 1" },
  { value: "state2", label: "State 2" },
  { value: "state3", label: "State 3" }
];

export const videoCategory = [
  { value: "Introduction", label: "Introduction" },
  { value: "Civil Procedure", label: "Civil Procedure" },
  { value: "Constitutional Law", label: "Constitutional Law" },
  { value: "Contracts", label: "Contracts" },
  { value: "Criminal Law and Procedure", label: "Criminal Law and Procedure" },
  { value: "Evidence", label: "Evidence" },
  { value: "Real Property", label: "Real Property" },
  { value: "Torts", label: "Torts" },
  { value: "Others", label: "Others" }

];
