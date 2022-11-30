import Header from "./header";
import Home from "./home";
import About from "./about";
import CourseDetail from "./courseDetail";

import Login from "./user/login";
import Register from "./user/register";
import StudentLogout from "./user/studentlogout";
import Dashboard from "./user/dashboard";
import MyCourses from "./user/mycourses";
import StudentAssignments from "./user/studentAssignment";
import ProfileSettings from "./user/profileSettings";
import ChangePasswords from "./user/changePassword";
import Footer from "./footer";
import { Routes, Route } from "react-router-dom";
import UserCalendar from "./user/calendar";

//Teachers
import TeacherLogin from "./teacher/login";
import TeacherRegister from "./teacher/register";
import TeacherDashboard from "./teacher/dashboard";
import TeacherCourses from "./teacher/teacherCourses";
import TeacherProfileSettings from "./teacher/profileSettings";
import TeacherChangePasswords from "./teacher/changePassword";
import AddCourse from "./teacher/addcourse";
import AddExam from "./teacher/addexam";
import EditCourse from "./teacher/editcourse";
import CourseExams from "./teacher/courseExams";
import EditExam from "./teacher/editExam";
import EnrolledStudents from "./teacher/enrolledstudents";
import MyStudents from "./teacher/mystudents";
import AddAssignment from "./teacher/addAssignment";
import ShowAssignment from "./teacher/showAssignment";
import TeacherCalendar from "./teacher/calendar";
import TeacherDetail from "./teacher/teacherdetail";
import TeacherLogout from "./teacher/TeacherLogout";

//List pages
import AllCourses from "./allcourses";

function Main() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/student-login" element={<Login />} />
        <Route path="/student-register" element={<Register />} />
        <Route path="/student-logout" element={<StudentLogout />} />
        <Route path="/student-Dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route
          path="/enrolled-students/:course_id"
          element={<EnrolledStudents />}
        />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/change-password" element={<ChangePasswords />} />
        <Route path="/student-calendar" element={<UserCalendar />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route
          path="/teacher-profile-settings"
          element={<TeacherProfileSettings />}
        />
        <Route
          path="/teacher-change-password"
          element={<TeacherChangePasswords />}
        />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/my-students" element={<MyStudents />} />
        <Route path="/teacher-calendar" element={<TeacherCalendar />} />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/all-exams:course_id" element={<CourseExams />} />
        <Route path="/add-exam/:course_id" element={<AddExam />} />
        <Route
          path="/add-assignment/:student_id/:teacher_id"
          element={<AddAssignment />}
        />
        <Route
          path="/show-assignment/:student_id/:teacher_id"
          element={<ShowAssignment />}
        />
        <Route path="/my-assignments/" element={<StudentAssignments />} />
        <Route path="/edit-exam:exam_id" element={<EditExam />} />

        {/* <Route path="/category/:category_slug" element={<CategoryCourses />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
