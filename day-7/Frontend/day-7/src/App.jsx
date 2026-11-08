import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  const [notes, setnotes] = useState([])


  async function fetchnotes() {
    let response = await axios.get("https://backend-3-20ur.onrender.com/api/notes")
    setnotes(response.data.note)

  }
  useEffect(() => {
    fetchnotes()
  }, [])

  async function handlePost(e) {
    e.preventDefault()
    const { title, description } = e.target.elements

    const response = await axios.post("https://backend-3-20ur.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    })

    e.target.reset()

    fetchnotes()
  }

  async function handleDelete(id) {
    await axios.delete("https://backend-3-20ur.onrender.com/api/notes/" + id)
    fetchnotes()
  }
  return (
    <>
      <form className='form' onSubmit={handlePost}>
        <input name='title' type="text" placeholder='Enter Title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button className='form-btn'>Create note</button>
      </form>
      <div className="notes">
        {
          notes.map((notes, id) => {
            return <div className="note" key={id}>
              <h2>{notes.title}</h2>
              <p>{notes.description}</p>
              <button className='delete-btn' onClick={() => { handleDelete(notes._id) }}>Delete</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App
