import Header from "./components/Header";
import Home from "./components/Home";
import CourseDetail from "./components/CourseDetail";
import Search from "./components/Search";

// Users
import Logout from "./components/User/StudentLogout";
import Register from "./components/User/Register";
import Dashboard from "./components/User/Dashboard";
import MyCourses from "./components/User/MyCourses";
import StudentAssignments from "./components/User/StudentAssignments";
import ProfileSetting from "./components/User/ProfileSetting";
import ChangePassword from "./components/User/ChangePassword";

// Teachers
import TeacherDetail from "./components/Teacher/TeacherDetail";
import TeacherRegister from "./components/Teacher/TeacherRegister";
import ForgotPassword from "./components/Teacher/ForgotPassword";
import ForgotChangePassword from "./components/Teacher/ForgotChangePassword";
import TeacherLogout from "./components/Teacher/TeacherLogout";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import TeacherCourses from "./components/Teacher/TeacherCourses";
import EnrolledStudents from "./components/Teacher/EnrolledStudents";
import AddCourse from "./components/Teacher/AddCourse";
import EditCourse from "./components/Teacher/EditCourse";
import UserList from "./components/Teacher/UserList";
import AddAssignment from "./components/Teacher/AddAssignment";
import ShowAssignment from "./components/Teacher/ShowAssignment";
import TeacherProfileSetting from "./components/Teacher/TeacherProfileSetting";
import TeacherChangePassword from "./components/Teacher/TeacherChangePassword";
import ShowExams from "./components/Teacher/ShowExam";
import ShowStudentAnswers from "./components/Teacher/ShowStudentAnswers";

import UserForgotPassword from "./components/User/UserForgotPassword";
import UserForgotChangePassword from "./components/User/UserForgotChangePassword";

// Teacher Dashboard: Quiz
import AllQuiz from "./components/Teacher/AllQuiz";
import AddQuiz from "./components/Teacher/AddQuiz";
import EditQuiz from "./components/Teacher/EditQuiz";
import QuizQuestions from "./components/Teacher/QuizQuestions";
import AddQuizQuestion from "./components/Teacher/AddQuizQuestion";
import AssignQuiz from "./components/Teacher/AssignQuiz";
import AttemptedStudents from "./components/Teacher/AttemptedStudents";

// Student Dashboard: exam
import CourseQuizList from "./components/User/CourseQuizList";
import TakeQuiz from "./components/User/TakeQuiz";

// List Pages
import AllCourses from "./components/AllCourses";
import Category from "./components/Category";
import CategoryCourses from "./components/CategoryCourses";

// import Page from './Page';
import Footer from "./components/Footer";

import MyTeachers from "./components/User/MyTeachers";

//chairman
import ChairLogout from "./components/chairman/chairLogout";
import ChairDashboard from "./components/chairman/dashboard";
import ChairRegister from "./components/chairman/register";

import Login from "./components/Login";
import EditQuizQuestion from "./components/Teacher/EditQuizQuestion";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/detail/:course_id" element={ <CourseDetail /> } />
          <Route path="/search/:searchstring" element={ <Search /> } />
          <Route path="/all-courses" element={ <AllCourses /> } />
          <Route path="/category" element={ <Category /> } />
          <Route path="/course/:category_id/:category_slug" element={ <CategoryCourses /> } />

          {/* Teacher Components Routes */}
          <Route path="/teacher-forgot-password" element={ <ForgotPassword /> } />
          <Route path="/teacher-change-password/:teacher_id" element={ <ForgotChangePassword /> } />
          <Route path="/teacher-logout" element={ <TeacherLogout /> } />
          <Route path="/teacher-register" element={ <TeacherRegister /> } />
          <Route path="/teacher-dashboard" element={ <TeacherDashboard /> } />
          <Route path="/teacher-courses" element={ <TeacherCourses /> } />
          <Route path="/enrolled-students/:course_id" element={ <EnrolledStudents /> } />
          <Route path="/add-course" element={ <AddCourse /> } />
          <Route path="/edit-course/:course_id" element={ <EditCourse /> } />
          <Route path="/add-assignment/:student_id/:teacher_id" element={ <AddAssignment /> } />
          <Route path="/show-assignment/:student_id/:teacher_id" element={ <ShowAssignment /> } />
          <Route path="/show-exams/:student_id/:teacher_id" element={ <ShowExams /> } />
          <Route path="/show-student-answers/:student_id/:exam_id" element={ <ShowStudentAnswers /> } />
          <Route path="/quiz" element={ <AllQuiz /> } />
          <Route path="/add-quiz" element={ <AddQuiz /> } />
          <Route path="/edit-quiz/:quiz_id" element={ <EditQuiz /> } />
          <Route path="/all-questions/:quiz_id" element={ <QuizQuestions /> } />
          <Route path="/edit-question/:question_id" element={ <EditQuizQuestion /> } />
          <Route path="/add-quiz-question/:quiz_id" element={ <AddQuizQuestion /> } />
          <Route path="/assign-quiz/:course_id" element={ <AssignQuiz /> } />
          <Route path="/attempted-students/:quiz_id" element={ <AttemptedStudents /> } />
          <Route path="/teacher-users" element={ <UserList /> } />
          <Route path="/teacher-profile-setting" element={ <TeacherProfileSetting /> } />
          <Route path="/teacher-change-password" element={ <TeacherChangePassword /> } />
          <Route path="/teacher-detail/:teacher_id" element={ <TeacherDetail /> } />

          {/* Student Components Routes */}
          <Route path="/user-forgot-password" element={ <UserForgotPassword /> } />
          <Route path="/user-change-password/:student_id" element={ <UserForgotChangePassword /> } />
          <Route path="/user-logout" element={ <Logout /> } />
          <Route path="/user-register" element={ <Register /> } />
          <Route path="/user-dashboard" element={ <Dashboard /> } />
          <Route path="/my-courses" element={ <MyCourses /> } />
          <Route path="/my-teachers" element={ <MyTeachers /> } />
          <Route path="/profile-setting" element={ <ProfileSetting /> } />
          <Route path="/change-password" element={ <ChangePassword /> } />
          <Route path="/my-assignments/" element={ <StudentAssignments /> } />
          <Route path="/course-quiz/:course_id" element={ <CourseQuizList /> } />
          <Route path="/take-quiz/:quiz_id" element={ <TakeQuiz /> } />

          {/* Chairman Components Routes */}
          <Route path="/chair-logout" element={ <ChairLogout /> } />
          <Route path="/chair-register" element={ <ChairRegister /> } />
          <Route path="/chair-dashboard" element={ <ChairDashboard /> } />
          {/* <Route path="/page/:page_id/:page_slug" element={ <Page /> } /> */}
        </Routes>
        
        <Footer />
      </Router>
    </>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
