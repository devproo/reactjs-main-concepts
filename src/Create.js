import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('Adam')
  const [isPending, setIsPending] =useState(false)
  const history = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {title, body, author}
    setIsPending(true)
    fetch('http://localhost:8000/blogs', {
        method: 'post',
        headers: {'content-type': "application/json"},
        body: JSON.stringify(blog)
    }).then(()=>{
        console.log('new blog added')
        setIsPending(false)
        //   history.go(-1)
        history.push('/')
    })
  
  }
  return (
    <div className='create'>
      <h2>Add a blog</h2>
      <form onSubmit={handleSubmit} >
        <label>Blog title</label>
        <input
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body</label>
        <textarea required onChange={(e) => setBody(e.target.value)}>
          {' '}
        </textarea>
        <label>Blog author</label>
        <select
        value={author}
        onChange={(e)=> setAuthor(e.target.value)}
        >
          <option value='adam'>Adam</option>
          <option value='adam1'>Adam1</option>
        </select>
       {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog....</button>}
      
       </form>  
    </div>
  )
}

export default Create
