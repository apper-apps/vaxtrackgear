import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Inventory from "@/components/pages/Inventory";
import ReceiveVaccines from "@/components/pages/ReceiveVaccines";
import RecordAdministration from "@/components/pages/RecordAdministration";
import Reports from "@/components/pages/Reports";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/receive" element={<ReceiveVaccines />} />
            <Route path="/administer" element={<RecordAdministration />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />
    </>
  );
}

export default App;