import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MeetingPage from "./meeting";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

/**
 * ADMIN
 *
 */
import { AdminLogin } from "./pages/Admin/auth";
import { AdminDashboard } from "./pages/Admin/dashboard";
import { AdminSettings } from "./pages/Admin/account";
/**
 * LAYOUTS
 *
 */
import { DefaultLayout } from "./layout/DefaultLayout";
import { TeacherLayout } from "./layout/TeacherLayout";
import { StudentLayout } from "./layout/StudentLayout";
import { ClassroomLayout } from "./layout/ClassroomLayout";
import { AdminLayout } from "./layout/AdminLayout";
/**
 * LANDING PAGE
 *
 */
import { LandingPage } from "./pages/landing";
import { AboutPage } from "./pages/about";
import { FAQPage } from "./pages/faq";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";

/**
 * ERROR PAGE
 *
 */

import { NotFound } from "./components/Not Found Page/404";

/**
 * TEACHER MAIN PAGES
 *
 */
import { Home } from "./pages/Teacher/Home/Home";
import { Calendar } from "./pages/Teacher/Calendar/ViewCalendar";
import { Assignments } from "./pages/Teacher/Assignment/ViewAllAssignment";
import { Grades } from "./pages/Teacher/Grade/ViewAllGrade";
import { ClassroomView } from "./pages/Teacher/Class/ViewClass";
import { ViewAssignment } from "./pages/Teacher/Assignment/ViewAssignment";
// import { ViewAllAssignments } from './pages/Teacher/Assignment/AllAssignments'
import { CreateAssignment } from "./pages/Teacher/Assignment/CreateAssignment";
import { CreateSchedule } from "./pages/Teacher/Calendar/CreateCalendar";
import { Members } from "./pages/Teacher/Members/ViewMembers";
import { AddMember } from "./pages/Teacher/Members/AddMember";
import { RemoveMember } from "./pages/Teacher/Members/RemoveMember";

// TEACHER SETTINGS
import { AccountSettings } from "./pages/Teacher/Account/Account";

/**
 * TEACHER AUTH
 *
 */
import { TeacherSignup } from "./pages/Teacher/Auth/Signup";
import { TeacherLogin } from "./pages/Teacher/Auth/Login";
import { TeacherForgot } from "./pages/Teacher/Auth/Forgot";
import { TeacherReset } from "./pages/Teacher/Auth/Reset";

/**
 * VIDEO CONFRENCE
 *
 */
import { VideoConference } from "./pages/Video Conference/VideoConference";

/**
 * STUDENT AUTH
 *
 */
import { StudentLogin } from "./pages/Student/Auth/Login";
import { StudentSignup } from "./pages/Student/Auth/Signup";
import { StudentForgot } from "./pages/Student/Auth/Forgot";
import { StudentReset } from "./pages/Student/Auth/Reset";
/**
 * STUDENT MAIN PAGES
 *
 */

import { StudentHome } from "./pages/Student/Home/Home";
import { StudentAccountSettings } from "./pages/Student/Account/Account";
import { StudentCalendar } from "./pages/Student/Calendar/ViewCalendar";
import { StudentClassroomView } from "./pages/Student/Class/ViewClass";
import { StudentAssignments } from "./pages/Student/Assignment/ViewAllAssignment";
import { StudentMembers } from "./pages/Student/Members/ViewMembers";
import { StudentGrades } from "./pages/Student/Grade/ViewAllGrade";
import { StudentViewAssignment } from "./pages/Student/Assignment/ViewAssignment";
import { StudentVideoConference } from "./pages/Student/Video Conference/VideoConference";
import StudentViewDashboard from "./pages/Student/Dashboard/ViewDashboard";
function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/meeting/:class_id/:meeting_name"
              element={<MeetingPage />}
            />
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />

              <Route
                path="teacher/login"
                element={
                  <ProtectedRoute>
                    <TeacherLogin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="teacher/signup"
                element={
                  <ProtectedRoute>
                    <TeacherSignup />
                  </ProtectedRoute>
                }
              />

              <Route
                path="teacher/forgot"
                element={
                  <ProtectedRoute>
                    <TeacherForgot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="teacher/reset"
                element={
                  <ProtectedRoute>
                    <TeacherReset />
                  </ProtectedRoute>
                }
              />

              <Route
                path="student/login"
                element={
                  <ProtectedRoute>
                    <StudentLogin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student/signup"
                element={
                  <ProtectedRoute>
                    <StudentSignup />
                  </ProtectedRoute>
                }
              />

              <Route
                path="student/forgot"
                element={
                  <ProtectedRoute>
                    <StudentForgot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student/reset"
                element={
                  <ProtectedRoute>
                    <StudentReset />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path={`/teacher`}
              element={<Navigate to={`login`} replace />}
            />
            <Route
              path={`/teacher/:teacher_id`}
              element={<Navigate to={`class`} replace />}
            />
            <Route path={`/teacher/:teacher_id`} element={<TeacherLayout />}>
              <Route path="class" element={<Home />} />
              <Route path="class" element={<ClassroomLayout />}>
                <Route path=":class_id/posts" element={<ClassroomView />} />
                <Route path=":class_id/assignments" element={<Assignments />} />
                <Route path=":class_id/grades" element={<Grades />} />
                <Route path=":class_id/members" element={<Members />} />

                <Route
                  path=":class_id/assignments/:assignment_id/view"
                  element={<ViewAssignment />}
                />
                <Route
                  path=":class_id/assignments/new"
                  element={<CreateAssignment />}
                />
                <Route path=":class_id/schedule" element={<CreateSchedule />} />

                <Route path=":class_id/members/new" element={<AddMember />} />
                <Route
                  path=":class_id/members/remove"
                  element={<RemoveMember />}
                />
              </Route>
              <Route path="calendar" element={<Calendar />} />
              <Route path="account" element={<AccountSettings />} />
            </Route>
            <Route
              path="teacher/:teacher_id/class/:class_id/meeting"
              element={<VideoConference />}
            />

            <Route
              path={`/student`}
              element={<Navigate to={`login`} replace />}
            />
            <Route
              path={`/student/:teacher_id`}
              element={<Navigate to={`class`} replace />}
            />
            <Route path="/student/:student_id" element={<StudentLayout />}>
              <Route path="class" element={<StudentHome />} />
              <Route path="class" element={<ClassroomLayout />}>
                <Route
                  path=":class_id/dashboard"
                  element={<StudentViewDashboard />}
                />
                <Route
                  path=":class_id/posts"
                  element={<StudentClassroomView />}
                />
                <Route
                  path=":class_id/assignments"
                  element={<StudentAssignments />}
                />
                <Route path=":class_id/grades" element={<StudentGrades />} />
                <Route path=":class_id/members" element={<StudentMembers />} />
                <Route
                  path=":class_id/assignments/:assignment_id/view"
                  element={<StudentViewAssignment />}
                />
              </Route>
              <Route path="calendar" element={<StudentCalendar />} />
              <Route path="account" element={<StudentAccountSettings />} />
            </Route>
            <Route
              path="student/:student_id/class/:class_id/meeting"
              element={<StudentVideoConference />}
            />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="teachers" element={<AdminDashboard />} />
              <Route path="account" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
