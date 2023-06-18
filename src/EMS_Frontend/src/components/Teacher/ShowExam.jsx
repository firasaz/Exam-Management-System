import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import CheckquizStatusForStudent from "../User/CheckQuizStatusForStudent";

const baseUrl = "http://127.0.0.1:8000/api";
function ShowExam() {
    const [exams, setExams] = useState();
    const {teacher_id} = useParams()
    const {student_id} = useParams()
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/student-exams/${student_id}/${teacher_id}/`).then((res) => {
                setExams(res.data)
            })
        } catch(error) { console.log(error) }
    }, [])
    return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
            <TeacherSidebar />
            </aside>
            <section className="col-md-9">
            <div className="card">
                <h5 className="card-header">Exams List</h5>
                <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Exam</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams?.map((row, index) => (
                        <tr key={index}>
                            <td>{row?.name}</td>
                            <CheckquizStatusForStudent
                                exam={row?.id}
                                student={student_id}
                                teacher={teacher_id}
                            />
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </section>
        </div>
    </div>
    )
}
export default ShowExam
