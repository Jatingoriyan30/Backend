import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [note, setnote] = useState([])

  function fetchnotes() {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setnote(res.data.data)

      })
  }

  useEffect(() => {
    fetchnotes()
  }, [])

  function handlepost(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data)
        fetchnotes()
      })
  }

  function handleDelete(noteid) {
    axios.delete("http://localhost:3000/api/notes/" + noteid)
      .then((res) => {
        console.log(res.data)
        fetchnotes()
      })
  }

  return (
    <>
      <form className='form' onSubmit={handlepost}>
        <input name='title' type="text" placeholder='Enter Title' />
        <input name='description' type="text" placeholder='Enter Description' />
        <button className='btn'>Create Note</button>
      </form>
      <div className="notes">
        {
          note.map((note, index) => {
            return <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button className='delete-btn' onClick={() => { handleDelete(note._id) }}>Delete</button>
            </div>
          })
        }

      </div>

    </>
  )
}

export default App
