import React, { useState } from 'react'

function Form({comments, setComments}) {
  const [email, setEmail] = useState('')
  const [comment, setComment ] = useState('')

  let URL = 'http://localhost:3000/api/v1'

  // POST de la creacion de cada uno de los comentarios
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      email,
      comment
    }
    fetch(`${URL}/posts`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((data) => {
      setComments([...comments, data])
      setEmail("")
      setComment("")
    })
  }

  return (
    <>
      <form className='form-container' onSubmit={(e) => handleSubmit(e)}>
        <input className='form-container__email' value={email} type="email" placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
        <textarea className='form-container__comment' value={comment} placeholder='Add a Comment' onChange={(event) => setComment(event.target.value)}/>
        <div className='form-container__button-container'>
          <button className='form-container__button' type='submit'>Comment</button>
        </div>
      </form>
    </>
  )
}

export default Form
