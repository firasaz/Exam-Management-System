import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TeacherSideBar from "./sidebar";
import { useEffect } from "react";

function TeacherCalendar() {
  useEffect(() => {
    document.title = "Calendar";
  });

  const [value, onChange] = useState(new Date());

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <Calendar onChange={onChange} value={value} />
        </section>
      </div>
    </div>
  );
}

export default TeacherCalendar;
