import React from 'react'
import "./styles.css"
import {Link} from 'react-router-dom'
export const Header = () => {
  return (
    <header className='home-header'>
      <div>
        <h2>BlogSphere</h2>
        <h1>
            <span>“</span> Blog <span>”</span>
        </h1>
        <p>
            awesome place to make yourself <br/> productive and entertained through
            daily updates.
        </p>
      </div>
      <div className='addNewPost'>
        <img src="https://cdn.pixabay.com/photo/2012/05/07/11/10/idea-48100_960_720.png" alt="" />
        <div>Want to share your ideas?</div>
        <Link to='/NewPost'><button>Add A New Blog</button></Link>
      </div>
    </header>
  )
}
