import { Bounce, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import { ProtectedRoute } from './Auth/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

/**
 * LAYOUTS
 * 
 */
import { DefaultLayout } from './layout/DefaultLayout'
import { TeacherLayout } from './layout/TeacherLayout'
import { StudentLayout } from './layout/StudentLayout'
import { TeacherClassLayout } from './layout/TeacherClassLayout';

/**
 * LANDING PAGE
 * 
 */
import { LandingPage } from './pages/landing';



/**
 * TEACHER MAIN PAGES
 * 
 */
import { Home } from './pages/Teacher/Home/Home'
import { Calendar } from './pages/Teacher/Calendar/ViewCalendar'
import { Assignments } from './pages/Teacher/Assignment/ViewAllAssignment'
import { Grades } from './pages/Teacher/Grade/ViewAllGrade'
import { ClassroomView } from './pages/Teacher/Class/ViewClass'
import { ViewAssignment } from './pages/Teacher/Assignment/ViewAssignment';
// import { ViewAllAssignments } from './pages/Teacher/Assignment/AllAssignments'
import { CreateAssignment } from './pages/Teacher/Assignment/CreateAssignment'
import { CreateSchedule } from './pages/Teacher/Calendar/CreateCalendar'
import { Members } from './pages/Teacher/Members/ViewMembers'
import { AddMember } from './pages/Teacher/Members/AddMember'
import { RemoveMember } from './pages/Teacher/Members/RemoveMember';

// TEACHER SETTINGS
import { AccountSettings } from './pages/Teacher/Account/Account';

/**
 * TEACHER AUTH
 * 
 */
import { TeacherSignup } from './pages/Teacher/Auth/Signup';
import { TeacherLogin } from './pages/Teacher/Auth/Login';

/**
 * VIDEO CONFRENCE
 * 
 */
import { VideoConference } from './pages/Video Conference/VideoConference';

/**
 * ERROR PAGE
 * 
 */

import { NotFound } from './components/Not Found Page/404'
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
            <Route path='/' element={<DefaultLayout />}>
              <Route index element={<LandingPage/>} />
              <Route path='teacher/login' element={
                <ProtectedRoute>
                  <TeacherLogin/>
                </ProtectedRoute>
              } />
              <Route path='teacher/signup' element={
                <ProtectedRoute>
                  <TeacherSignup/>
                </ProtectedRoute>
              } />
              
            </Route>
                        
              <Route path={`/teacher`} element={<Navigate to={`login`} replace />} />
              <Route path={`/teacher/:teacher_id`} element={<Navigate to={`class`} replace />} />
              <Route path={`/teacher/:teacher_id`} element={<TeacherLayout />} >            
                <Route path='class' element={<Home/>} />
                <Route path='class' element={<TeacherClassLayout />} >
                  <Route path=':class_id/posts' element={<ClassroomView/>} />
                  <Route path=':class_id/assignments' element={<Assignments/>} />
                  <Route path=':class_id/grades' element={<Grades/>} />
                  <Route path=':class_id/members' element={<Members/>} />

                  <Route path=':class_id/assignments/:assignment_id/view' element={<ViewAssignment/>} />
                  <Route path=':class_id/assignments/new' element={<CreateAssignment/>} />
                  <Route path=':class_id/schedule' element={<CreateSchedule/>} />

                  <Route path=':class_id/members/new' element={<AddMember/>} />
                  <Route path=':class_id/members/remove' element={<RemoveMember/>} />                                
                </Route>
                <Route path='calendar' element={<Calendar/>} />
                <Route path='account' element={<AccountSettings/>} /> 
                <Route path='video' element={<VideoConference/>} />
              </Route>
            
            <Route path='/student' element={<StudentLayout />} >
              
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
