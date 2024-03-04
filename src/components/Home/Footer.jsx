const Footer = ({ currentSong }) => {
  return (
    <footer>
      {currentSong && (
        <div className="footer-current-song">
          <img src={currentSong.imageUrl} alt={currentSong.title} />
          <div>
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
