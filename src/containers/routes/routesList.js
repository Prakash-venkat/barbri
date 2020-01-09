//Admin Routes
import AdminOverView from "../admin/overview/index";
import LawSchoolList from "../admin/lawSchool/list";
import LawSchoolAdd from "../admin/lawSchool/add";
import LawSchoolEnquiry from "../admin/lawSchool/enquiry";
import StudentAdd from "../admin/student/add";
import StudentList from "../admin/student/list";
import StudentUpload from "../admin/student/upload/index";
import StudentInvite from "../admin/student/invite/index";
import ItemTagList from "../admin/itemBank/itemTag/list";
import ItemTagAdd from "../admin/itemBank/itemTag/add/index";
import ItemBankList from "../admin/itemBank/itemBank/list/index";
import ItemBankAdd from "../admin/itemBank/itemBank/add/index";
import ItemBankView from "../admin/itemBank/itemBank/itemView/index"
import ItemBankUpdate from "../admin/itemBank/itemBank/itemUpdate/index"
import ItemError from "../admin/itemBank/itemError/index";
import PracticeExamList from "../admin/precreatedExam/list";
import PracticeExamAdd from "../admin/precreatedExam/add";
import UserList from "../admin/user/list";
import UserAdd from "../admin/user/add";
import VideoLibraryList from '../admin/videoLibrary/list'
import VideoLibraryAdd from '../admin/videoLibrary/add'
import MessagesList from "../admin/messages/list/index";
import Messagesadd from "../admin/messages/add/index"
import AdminSettings from "../admin/settings";
import AdminSupport from "../admin/support";
import Auditlog from "../admin/troubleshooting/auditLog/index"
import Uilog from "../admin/troubleshooting/erroLog/index"
import NotAllowed from "../../landingPages/forbidden/index";

export const adminRoutePaths=[
  {
    target: '',
    component: AdminOverView
  },{
    target: 'list_lawschool',
    component: LawSchoolList
  },{
    target: 'add_lawschool',
    component: LawSchoolAdd
  },{
    target: 'list_lawschool_enquiry',
    component: LawSchoolEnquiry
  },{
    target: 'add_student',
    component: StudentAdd
  },{
    target: 'list_student',
    component: StudentList
  },{
    target: 'upload_student',
    component: StudentUpload
  },{
    target: 'invite_student',
    component: StudentInvite
  },{
    target: 'list_itemtag',
    component: ItemTagList
  },{
    target: 'add_itemtag',
    component: ItemTagAdd
  },{
    target: 'list_itembank',
    component: ItemBankList
  },{
    target: 'add_itembank',
    component: ItemBankAdd
  },{
    target: 'view_itembank',
    component: ItemBankView
  },{
    target: 'edit_itembank',
    component: ItemBankUpdate
  },{
    target: 'itemerror',
    component: ItemError
  },{
    target: 'list_precreatedexam',
    component: PracticeExamList
  },{
    target: 'add_precreatedexam',
    component: PracticeExamAdd
  },{
    target: 'edit_precreatedexam',
    component: PracticeExamAdd
  },{
    target: 'list_user',
    component: UserList
  },{
    target: 'add_user',
    component: UserAdd
  },{
    target: 'list_videolibrary',
    component: VideoLibraryList
  },{
    target: 'add_videolibrary',
    component: VideoLibraryAdd
  },{
    target: 'settings',
    component: AdminSettings
  },{
    target: 'list_messagenotify',
    component: MessagesList
  },{
    target: 'add_messagenotify',
    component: Messagesadd
  },{
    target: 'get_help',
    component: AdminSupport
  },{
    target: 'audit_log',
    component: Auditlog
  },{
    target: 'ui_log',
    component: Uilog
  },{
    target: 'not_allowed',
    component: NotAllowed
  },
]


//LawSchool Routes
import LawSchoolOverView from "../lawSchool/overview/index";
import LawSchoolMessages from "../lawSchool/messages/inbox/index";
import Download from "../lawSchool/students/download/index";
import Students from "../lawSchool/students/index";
import LawSchoolSupport from "../lawSchool/support/index";
import LawSchoolSettings from "../lawSchool/settings/index";
import Videolecture from "../lawSchool/videolectures/index";
import addMessage from "../lawSchool/messages/add/index";
import listMessage from "../lawSchool/messages/list/index";


export const lawSchoolRoutePaths=[
  {
    target: '',
    component: LawSchoolOverView
  },{
    target: 'messages',
    component: LawSchoolMessages
  },{
    target: 'add-message',
    component: addMessage
  },{
    target: 'list-messages',
    component: listMessage
  },{
    target: 'students',
    component: Students
  },{
    target: 'download',
    component: Download
  },{
    target: 'get-help',
    component: LawSchoolSupport
  },{
    target: 'settings',
    component: LawSchoolSettings
  },{
    target: 'videolecture',
    component: Videolecture
  }
]


//Student Routes
import StudentOverview from "../student/overview/index";
import PracticeExam from "../student/exams/practiceExam/index";
import PrecreatedExam from "../student/exams/precratedexam/index"
import OngoingExam from "../student/ongoingexam/index"
import ExamReports from "../student/exams/examReports/index";
import ExamPerformanceTiming from "../student/exams/examPerformance/timing/index";
import Questions from "../student/questions/questions/index";
import QuestionsProgress from "../student/questions/questionsProgress/index";
import StudentSettings from "../student/settings/index";
import VideoLectures from "../student/videoLectures/index";
import StudentMessages from "../student/messages/index";
import StudentSupport from "../student/support";
import QuestionAndAnswers from "../student/questions/questions/q&a/index";
import examQuestion from "../student/exams/practiceExam/q&a/index";
import StudentReview from "../student/exams/practiceExam/q&a/review";

export const  studentRoutePaths =[
  {
   target: '',
   component : StudentOverview
 },{
   target: 'exam-practice',
   component : PracticeExam
},{
  target: 'pre-created-exam',
  component : PrecreatedExam
},{
  target: 'ongoing-exam',
  component : OngoingExam
},{
  target: 'exam-reports',
  component : ExamReports
},{
  target: 'timing',
  component : ExamPerformanceTiming
},{
  target: 'questions',
  component : Questions
},{
  target: 'performance',
  component : QuestionsProgress
},{
  target: 'settings',
  component : StudentSettings
},{
  target: 'video-lectures',
  component : VideoLectures
},{
  target: 'inbox',
  component : StudentMessages
},{
  target: 'get-help',
  component : StudentSupport
},{
  target: 'question-answers',
  component : QuestionAndAnswers
},{
  target: 'exam-question',
  component : examQuestion
},{
  target: 'exam-review',
  component : StudentReview
},]


//ProofReader Routes
import ItemReview from "../proofReader/itemsReview/index";
import UpdateReview from "../proofReader/updateReview/index";
import ChangePassword from "../proofReader/changePassword/index"
import ProofReaderSupport from "../proofReader/support/index";
import ProofReaderMessages from "../proofReader/messages/index";
import ItemPreview from "../proofReader/itemsPreview/index"


export const proofReaderRoutePaths=[
  {
  target: '',
  component: ItemReview
},{
  target: 'update-review',
  component: UpdateReview
},{
  target: 'get-help',
  component: ProofReaderSupport
},{
  target: 'change-password',
  component: ChangePassword
},{
  target: 'inbox',
  component: ProofReaderMessages
},{
  target: 'item-preview',
  component: ItemPreview
}]