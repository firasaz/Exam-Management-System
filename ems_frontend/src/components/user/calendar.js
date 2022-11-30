import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SideBar from "./sidebar";
import { useEffect } from "react";

function UserCalendar() {
  useEffect(() => {
    document.title = "Calendar";
  });
  const [value, onChange] = useState(new Date());

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <Calendar onChange={onChange} value={value} />
        </section>
      </div>
    </div>
  );
}

export default UserCalendar;
