
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// const baseUrl = "http://127.0.0.1:8000/api";

function Footer() {
  return (
    <footer className="footer d-flex flex-column justify-content-center align-items-center py-3 my-5">
      <hr style={{margin: "1rem"}} />
      {/* <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <p className="text-center text-muted">
          Goodluck for your Exams
        </p>
        {pagesData &&
          pagesData.map((row, index) => (
            <li className="nav-item">
              <Link
                to={`/page/${row.id}${row.url}`}
                className="nav-link px-2 text-muted"
              >
                {row.title}
              </Link>
            </li>
          ))}
      </ul> */}

      <p className="text-center text-muted">
        © 2023 Exam Management System for EMU
      </p>
    </footer>
  );
}

export default Footer;