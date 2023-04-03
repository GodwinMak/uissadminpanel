import React from 'react';
import PanelComponent from './components/PanelComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import AddMember from './components/Members/AddMembers';
import EditMember from './components/Members/EditMembers';
import Leaders from './components/Leaders';
import AddLeader from './components/Leaders/AddLeaders';
import EditLeader from './components/Leaders/EditLeaders';
import Programs from './components/Programs';
import AddProgram from './components/Programs/AddPrograms';
import EditProgram from './components/Programs/EditPrograms';
import Projects from './components/Projects';
import AddProject from './components/Projects/AddProjects';
import EditProject from './components/Projects/EditProjects';
import Events from './components/Events';
import AddEvent from './components/Events/AddEvents';
import EditEvent from './components/Events/EditEvents';
import Users from './components/Users';
import AddUser from './components/Users/AddUsers';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent/>}/>
        <Route path="/register" element={<RegisterComponent/>}/>
        <Route path='/dashboard' exact element={<PanelComponent/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/members' element={<Members/>} />
          <Route path='/dashboard/addMember' element={<AddMember/>} />
          <Route path='/dashboard/editMember' element={<EditMember/>} />
          <Route path='/dashboard/leaders' element={<Leaders/>} />
          <Route path='/dashboard/addLeader' element={<AddLeader/>} />
          <Route path='/dashboard/editLeader' element={<EditLeader/>} />
          <Route path='/dashboard/programs' element={<Programs/>} />
          <Route path='/dashboard/AddProgram' element={<AddProgram/>} />
          <Route path='/dashboard/EditProgram' element={<EditProgram/>} />
          <Route path='/dashboard/projects' element={<Projects/>} />
          <Route path='/dashboard/addProject' element={<AddProject/>} />
          <Route path='/dashboard/editProject' element={<EditProject/>} />
          <Route path='/dashboard/events' element={<Events/>} />
          <Route path='/dashboard/addEvent' element={<AddEvent/>} />
          <Route path='/dashboard/editEvent' element={<EditEvent/>} />
          <Route path='/dashboard/users' element={<Users/>} />
          <Route path='/dashboard/addUser' element={<AddUser/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
