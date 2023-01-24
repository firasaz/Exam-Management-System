import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="d-flex flex-column justify-content-center align-items-center py-3 my-5">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <Link to="#" className="nav-link px-2 text-muted">
            Goodluck for your Exams
          </Link>
        </li>
      </ul>
      <p className="text-center text-muted">
        © 2022 Exam Management System for EMU
      </p>
    </footer>
  );
}

export default Footer;
