
import axios from "axios";
import { useEffect, useState } from "react";

function GetAllDAta() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getfeedback")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Feedback List</h2>

      {feedbacks.length === 0 && (
        <p>No feedback submitted yet.</p>
      )}

      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback._id}>
            <strong>Name:</strong> {feedback.q1}<br />
            <strong>Department:</strong> {feedback.q2}<br />
            <strong>Session title:</strong> {feedback.q3}<br />
            <strong>Feedback:</strong> {feedback.q4}<br />
            <strong>Suggestions:</strong> {feedback.q5}<br />
            <strong>Submitted At:</strong>{" "}
            {feedback.submittedAt
              ? new Date(feedback.submittedAt).toLocaleString()
              : "Not available"}
            <hr />
          </li>
        ))}
      </ul>

      <a href="/">Back to Survey Form</a>
    </div>
  );
}

export default GetAllDAta;
