import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = ({ audioUrl }) => {
  return (
    <div className="footer-player">
      <div className="container d-flex">
        <AudioPlayer src={audioUrl} volume={0.5} />
      </div>
    </div>
  );
};

export default Player;
