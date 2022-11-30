import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About us";
  });
  return <h2>About Us Page</h2>;
}

export default About;
