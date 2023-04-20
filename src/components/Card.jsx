import React, { useState, useEffect } from 'react'
import Form  from './Form'
import Comment from './Comment'

function Card() {
  const [comments, setComments ] = useState([])

  let URL = 'http://localhost:3000/api/v1'

  // GET De todos los comentarios
  useEffect(() => {
    fetch(`${URL}/posts`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setComments(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <div className='card-container'>
        <Form comments={comments} setComments={setComments} />
        { comments.map((comment, key) => <Comment key={key} comment={comment} comments={comments} setComments={setComments} /> )}
      </div>
    </>
  )
}

export default Card
