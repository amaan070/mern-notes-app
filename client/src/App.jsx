import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (err) {
      console.error(err);
      setError(
        "Could not load notes. Make sure MongoDB and the Express server are running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please enter both a title and content.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await axios.post(API_URL, {
        title: title.trim(),
        content: content.trim()
      });

      setNotes((currentNotes) => [response.data, ...currentNotes]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setError("Could not create the note.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      setError("");

      await axios.delete(`${API_URL}/${id}`);

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Could not delete the note.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(dateString));
  };

  return (
    <main className="page">
      <section className="app-shell">
        <header className="header">
          <p className="eyebrow">MERN STACK LAB</p>
          <h1>Student Notes</h1>
          <p className="subtitle">
            Create, view, and delete notes with React, Express, and MongoDB.
          </p>
        </header>

        <form className="note-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. DBMS Revision"
            maxLength={120}
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note here..."
            rows={5}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Note"}
          </button>
        </form>

        {error && <div className="message error">{error}</div>}

        <section className="notes-section">
          <div className="section-heading">
            <h2>Your Notes</h2>
            <span>{notes.length} note{notes.length === 1 ? "" : "s"}</span>
          </div>

          {loading ? (
            <div className="message">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="message empty">
              No notes yet — add one above!
            </div>
          ) : (
            <div className="notes-list">
              {notes.map((note) => (
                <article className="note-card" key={note._id}>
                  <div className="note-body">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <time dateTime={note.createdAt}>
                      {formatDate(note.createdAt)}
                    </time>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(note._id)}
                    disabled={deletingId === note._id}
                  >
                    {deletingId === note._id ? "Deleting..." : "Delete"}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
