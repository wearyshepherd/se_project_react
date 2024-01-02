import "../blocks/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>Developed by Carlos Chavez</div>
      <div>{new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
