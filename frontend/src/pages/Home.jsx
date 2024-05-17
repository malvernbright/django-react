import { useState, useEffect } from "react"
import api from "../api"
import Notes from "../components/Notes"
import "../styles/Home.css"
import LoadingIndicator from "../components/LoadingIndicator"

export default function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const getNotes = async () => {
    setLoading(true)
    await api.get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
        setNotes(data)
        setLoading(false)
      })
      .catch((err) => {
        alert(err)
        console.log(err)
        setLoading(false)
      });
  }

  const deleteNote = async (id) => {
    await api.delete(`/api/notes/${id}/delete/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted successfully")
          getNotes()
        }
        else { alert("Something went wrong") }
      })
      .catch((err) => {
        alert(err)
        console.log(err)
      });

  }

  const createNote = async (event) => {
    event.preventDefault()
    setLoading(true)
    await api.post("/api/notes/", {
      title,
      content,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created successfully")
          setTitle("")
          setContent("")
          getNotes()
        } else {
          alert("Something went wrong")
          console.log(res)
          setLoading(false)
          getNotes()
        }
      }
      )
      .catch((err) => {
        alert(err)
        console.log(err)
        setLoading(false)
      })

  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <>
      <h2>Notes</h2>
      <div className="notes">
        {
          notes.map((note) => (
            <Notes key={note.id} note={note} onDelete={deleteNote} />
          ))
        }
      </div>
      <div className="create-note">
        <form onSubmit={createNote}>
          <label htmlFor="title">Title: </label> <br />
          <input type="text" required id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" /> <br />
          <label htmlFor="content">Content: </label> <br />
          <textarea id="content" required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" /> <br />
          {loading && <LoadingIndicator />}
          <input type="submit" disabled={loading} value="Submit"/>
        </form>
      </div>
    </>
  )
}
