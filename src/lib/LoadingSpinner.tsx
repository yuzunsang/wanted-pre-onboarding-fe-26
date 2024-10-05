import "./loadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg className="loader" height="100%" viewBox="0 0 32 32" width={40}>
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
        ></circle>
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: "rgb(29, 155, 240)",
            strokeDasharray: 80,
            strokeDashoffset: 60,
          }}
        ></circle>
      </svg>
    </div>
  );
}
