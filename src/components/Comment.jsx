import React, { useState } from 'react'

function Comment({ comment, comments, setComments }) {
  const [ isUpdating, setIsUpdating] =  useState(false)
  const [ updateComment, setUpdateComment] = useState(comment)

  let URL = 'http://localhost:3000/api/v1'

  // DELETE Elminar los comentarios a traves del ID
  const handleDelete = (comment) => {
    fetch(`${URL}/posts/${comment.id}`,{
      method: 'DELETE'
    })
    .then((response) => {
      if (response.status === 204) {
        setComments(
          comments.filter((item) => {
            return item.id !== comment.id
          })
        )
      }
    })
  }

  // UPDATE para Editar cada uno de los comentarios
  const handleUpdate = () => {
    setIsUpdating(!isUpdating)
    setUpdateComment(comment) //cuando le damos cancelar se manda a llamar el handleUpdate -> se esta reseteadod
  }

  const submitHandleUpdate = (e) => {
    e.preventDefault();
    const body = {
      email: updateComment.email,
      comment: updateComment.comment
    }
    fetch(`${URL}/posts/${updateComment.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((data) => {
      setIsUpdating(!isUpdating)
      const copyComments = comments
      const commentToUpdate = copyComments.find((comment) => comment.id === data.id)
      commentToUpdate.email = data.email
      commentToUpdate.comment = data.comment
      setComments(copyComments)
    })
  }

  return (
    <>
      {isUpdating && (
        <div className='comment-container-update'>
          <h2>Edit fields</h2>
          <form className='comment-container-update-form' onSubmit={submitHandleUpdate}>
            <input type="email" placeholder='Email' value={updateComment.email} onChange={(event) => setUpdateComment({ ...updateComment, email: event.target.value })} />
            <textarea className='comment-container-update-form__comment' placeholder='Comment' value={updateComment.comment} onChange={(event) => setUpdateComment({ ...updateComment, comment: event.target.value })}/>
            <div>
              <button className='comment-container-update-form__button' onClick={() => handleUpdate()}>Cancel</button>
              <button className='comment-container-update-form__button' type='submit'>Save</button>
            </div>
          </form>
        </div>
      )}
      {!isUpdating && (
        <div className='comment-container'>
          <h3 className='comment-container__email'>{comment.email}</h3>
          <p className='comment-container__comment'>{comment.comment}</p>
          <div className='comment-container__buttons-container'>
            <button className='comment-container__button' onClick={() => handleDelete(comment)} >Delete</button>
            <button className='comment-container__button' onClick={() => handleUpdate()} >Edit</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Comment
