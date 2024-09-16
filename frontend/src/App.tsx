import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

/**
 * LAYOUTS
 * 
 */
import { DefaultLayout } from './layout/DefaultLayout'
import { TeacherLayout } from './layout/TeacherLayout'
import { StudentLayout } from './layout/StudentLayout'


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
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<DefaultLayout />}>
              <Route index element={<LandingPage/>} />
              <Route path='teacher/login' element={<TeacherLogin/>} />
              <Route path='teacher/signup' element={<TeacherSignup/>} />
              <Route path='video' element={<VideoConference/>} />
            </Route>
            <Route path='/teacher' element={<TeacherLayout />} >
              
              
              <Route path='class' element={<Home/>} />
              <Route path='calendar' element={<Calendar/>} />
              {/* <Route path='assignments' element={<ViewAllAssignments/>} /> */}
              <Route path='class/:id/assignments/new' element={<CreateAssignment/>} />
              <Route path='class/:id/schedule' element={<CreateSchedule/>} />
              
              <Route path='class/:id/assignments' element={<Assignments/>} />
              <Route path='class/:id/assignments/:assignment_id/view' element={<ViewAssignment/>} />
              <Route path='class/:id/grades' element={<Grades/>} />
              <Route path='class/:id/posts' element={<ClassroomView/>} />
          
              <Route path='class/:id/members' element={<Members/>} />
              <Route path='class/:id/members/new' element={<AddMember/>} />
              <Route path='class/:id/members/remove' element={<RemoveMember/>} />

              <Route path='account' element={<AccountSettings/>} />
              
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
