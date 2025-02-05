import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../styles/AdminDashboard.module.css";

const socket = io("http://localhost:5000"); // 서버 URL에 맞게 수정

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    socket.on("newApplication", (newApp) => {
      setApplications((prev) => [newApp, ...prev]);
    });

    return () => {
      socket.off("newApplication");
    };
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>관리자 대시보드</h1>
      </header>
      <section className="notifications">
        <h2>실시간 신청 알림</h2>
        {applications.length === 0 ? (
          <p className="no-notifications">새로운 신청이 없습니다.</p>
        ) : (
          <ul className="application-list">
            {applications.map((app, index) => (
              <li key={index} className="application-item">
                <div className="application-title">{app.programTitle}</div>
                <div className="application-info">
                  <span className="applicant-name">{app.name}</span> |{" "}
                  <span className="applicant-email">{app.email}</span> |{" "}
                  <span className="applicant-phone">{app.phone}</span>
                </div>
                {app.message && (
                  <div className="application-message">{app.message}</div>
                )}
                <div className="application-date">
                  {app.createdAt
                    ? new Date(app.createdAt).toLocaleString()
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
