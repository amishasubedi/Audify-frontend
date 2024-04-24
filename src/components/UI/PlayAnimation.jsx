import "./Style.css";

const PlayAnimation = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="d-flex align-items-end" style={{ height: "20px" }}>
        <div
          className="animated-stroke stroke-1"
          style={{ height: "15px" }}
        ></div>
        <div
          className="animated-stroke stroke-2"
          style={{ height: "20px" }}
        ></div>
        <div
          className="animated-stroke stroke-3"
          style={{ height: "15px" }}
        ></div>
      </div>
    </div>
  );
};

export default PlayAnimation;
