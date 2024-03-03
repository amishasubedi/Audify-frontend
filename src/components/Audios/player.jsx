import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = () => {
  return (
    <div className="container">
      <h1>Hello, audio player!</h1>
      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
        volume={0.5}
      />
    </div>
  );
};

export default Player;
