import React, {useEffect, useState} from "react";
import axios from "axios";


const API_URL = "http://localhost:5000/api/subjects";

function App (){
  const [subjects, setSubjects] = useState([]);
  const [subjectDescription, setSubjectDescription] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    axios
    .get(API_URL)
    .then((response) => setSubjects(response.data))
    .catch((error) => console.error("Error fetching items:", error));
  }, []);

const addSubject = () => {
  axios
  .post(API_URL, {Subject_Description: subjectDescription, Day: day, Time: time, Room: room})
  .then((response) => {
    
    setSubjects([...subjects, response.data])
    setSubjectDescription("");
    setDay("");
    setTime("");
    setRoom("");
  
  })
  .catch((error) => console.error("Error adding items:", error));
};

const updateSubject = (id, field, value) => {

  const subjectToUpdate = subjects.find(subject => subject.id === id);
  if(!subjectToUpdate) return;

  const updateData = {
    Subject_Description: subjectToUpdate.Subject_Description,
    Day: subjectToUpdate.Day,
    Time: subjectToUpdate.Time,
    Room: subjectToUpdate.Room,
    [field]: value
  };
  
  axios
  .put(`${API_URL}/${id}`, updateData)
  .then((response) => {
    setSubjects(subjects.map((subject) => (subject.id === id ? response.data : subject)));
  })
  .catch((error) => console.error("Error updating subject:", error));
};

const deleteSubject = (id) => {
  axios
  .delete(`${API_URL}/${id}`)
  .then(() => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  })
  .catch((error) => console.error("Error deleting subject:", error));
};


return(
  <div style={{marginLeft:"100px"}}>
    <center> 
    <h1>Assignment #1 (Subject List)</h1>
    <div style={{ display: "flex", marginBottom: "10px" }}>
        <input style={{width:"500px"}} type="text" value={subjectDescription} onChange={(e) => setSubjectDescription(e.target.value)} placeholder="Subject Description" />
        <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" />
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") {addSubject();}}} placeholder="Room" />
        <input type="button" value="Add Subject" onClick={addSubject} />
    </div>
    <table border="1px">
        <thead>
            <tr>
            <th>Subject</th>
            <th>Day</th>
            <th>Time</th>
            <th>Room</th>
            </tr>
        </thead>
        <tbody>
            {subjects.map((subject) => (
                <tr key={subject.id}>
                    <td><input style={{width:"500px", textAlign:"center"}} type="text" value={subject.Subject_Description} onChange={(e) => updateSubject(subject.id, "Subject_Description", e.target.value)}/></td>
                    <td><input type="text" value={subject.Day} onChange={(e) => updateSubject(subject.id, "Day", e.target.value)} /></td>
                    <td><input type="text" value={subject.Time} onChange={(e) => updateSubject(subject.id, "Time", e.target.value)} /></td>
                    <td><input type="text" value={subject.Room} onChange={(e) => updateSubject(subject.id, "Room", e.target.value)} /></td>
                    <td><input type="button" value="Delete" onClick={() => deleteSubject(subject.id)} /></td>
                </tr>
            ))}
        </tbody>
    </table>
    </center>
</div>
);
};
export default App;