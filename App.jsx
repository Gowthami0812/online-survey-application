
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/feedback",
        formData
      );

      setMessage(response.data.message || "Feedback submitted successfully!");
      setFormData({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage(
        error.response?.data?.message ||
          "Unable to submit feedback. Please check that the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <section className="survey-container">
        <h1>Online Survey Application</h1>
        <p className="subtitle">
          Please share your feedback with us.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="q1">Name</label>
            <input
              id="q1"
              type="text"
              name="q1"
              placeholder="Enter your name"
              value={formData.q1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="q2">Department</label>
            <input
              id="q2"
              type="text"
              name="q2"
              placeholder="Enter your department"
              value={formData.q2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="q3">Session Title</label>
            <input
              id="q3"
              type="text"
              name="q3"
              placeholder="Enter the session title"
              value={formData.q3}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="q4">Feedback</label>
            <textarea
              id="q4"
              name="q4"
              placeholder="Share your feedback"
              value={formData.q4}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="q5">Suggestions</label>
            <textarea
              id="q5"
              name="q5"
              placeholder="Any suggestions for improvement?"
              value={formData.q5}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {message && (
          <p className="status-message" role="status">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
