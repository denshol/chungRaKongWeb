import React from "react";

const SkeletonLoader = () => {
  return (
    <div
      className="skeleton-loader"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "30px",
          backgroundColor: "#e0e0e0",
          marginBottom: "20px",
          borderRadius: "4px",
          animation: "pulse 1.5s infinite",
        }}
      ></div>
      <div
        style={{
          width: "70%",
          height: "20px",
          backgroundColor: "#f0f0f0",
          marginBottom: "10px",
          borderRadius: "4px",
          animation: "pulse 1.5s infinite",
        }}
      ></div>
      <div
        style={{
          width: "60%",
          height: "20px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          animation: "pulse 1.5s infinite",
        }}
      ></div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonLoader;
