import React from 'react'
import Banner from '../components/banner'
import BlogPage from '../components/blogPage'

const Home = () => {
  return (
    <div>
      <Banner/>

      <div className='max-w-7xl mx-auto'>
        <BlogPage/>
      </div>
    </div> 
  )
}

export default Home
