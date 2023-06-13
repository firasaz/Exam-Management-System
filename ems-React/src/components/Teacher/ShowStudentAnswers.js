import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";
import CheckquizStatusForStudent from "../User/CheckQuizStatusForStudent";

const baseUrl = "http://127.0.0.1:8000/api";
function ShowExam() {
    const [examAns, setExamAns] = useState();
    const {exam_id} = useParams()
    const {student_id} = useParams()

    let totalGrade = 0;
    
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/student-exams-ans/${student_id}/${exam_id}/`).then((res) => {
                setExamAns(res.data)
            })
        } catch(error) { console.log(error) }
    }, [])
    if (examAns == null) {
        return <p>Loading...</p>
    }
    else {
        examAns.forEach(ans => {
            if(ans?.ans_status === true) { totalGrade+=ans?.question?.points }        
        });
        return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">
                            <a href="#" className="text-decoration-none">{examAns[0]?.student?.full_name}</a> Answers</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        {/* <th>Exam</th> */}
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Points</th>
                                        <th>Answer Status</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examAns?.map((row, index) => (
                                        <tr key={index}>
                                            {/* <td>{row?.exam?.name}</td> */}
                                            <td>{row?.question?.question}</td>
                                            <td>{row?.answer_mcq?.text}</td>
                                            <td>{row?.question?.points}</td>
                                            <td className={row?.ans_status.toString() === "true" ? "text-success" : "text-danger"}>
                                                {row?.ans_status.toString().toUpperCase()}
                                            </td>
                                            <td className={row?.ans_status.toString() === "true" ? "text-success" : "text-danger"}>
                                                { row?.ans_status.toString() === "true" ? row?.question?.points : '0' }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="grade d-flex justify-content-end">
                                <p className="text-center fw-bold m-2">Total Grade:</p>
                                <div className="border border-2 border-info" style={{width: '50px'}}>
                                    <p className="text-center m-2">{totalGrade}</p>
                                </div>
                            </div>                                                   
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )}
}
export default ShowExam
