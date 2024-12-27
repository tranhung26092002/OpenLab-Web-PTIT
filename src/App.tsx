import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import AuthGuard from './components/AuthGuard';
import AdminPage from './pages/AdminPage/AdminPage';
import IoTPage from './pages/IoTPage/IoTPage';
import DashBoard from './pages/DashBoard/DashBoard';
import Broker from './pages/BrokerMQTT/BrokerMQTT'
import Report from './pages/Report/Report';
import GatewayManager from './pages/GatewayManager/GatewayManager';
import Sensor from './pages/Sensor/Sensor';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="" element={<AuthGuard><Home /></AuthGuard>}></Route>

        <Route path='/admin' element={<AuthGuard><AdminPage /></AuthGuard>}></Route>

        <Route path="/dashboard" element={<AuthGuard><DashBoard /></AuthGuard>}></Route>

        <Route path="/broker" element={<AuthGuard><Broker /></AuthGuard>}></Route>

        <Route path="/report" element={<AuthGuard><Report /></AuthGuard>}></Route>

        <Route path="/gateway" element={<AuthGuard><GatewayManager /></AuthGuard>}></Route>

        <Route path="/node/:id" element={<AuthGuard><Sensor /></AuthGuard>} />  {/* Thêm :id vào URL */}

        <Route path="/iot" element={<AuthGuard><IoTPage /></AuthGuard>}></Route>

        <Route path='*' element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

