import "../index.css"

function Footer2() {
  return (
    <>
      <footer className="footer2">
        <ul className="footer-links">
            <li><a href="#">Site Home</a></li>
            <li><a href="#">Playground</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Contents</a></li>
        </ul>
        <p className="copyright">© {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </>
  )
}

export default Footer2;