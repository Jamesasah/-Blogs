import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import Pagination from './pagination';
import CategorySelection from './CategorySelection';
import SideBar from './SideBar';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12  // blogs per page
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null)


    useEffect(()=> {
        async function fetchBlog() {
            let url = `https://blog-backend-sfxs.onrender.com/blogs?page=${currentPage}&limit=${pageSize}`;

            // filter by category
            if(selectedCategory){
              url +=`&category=${selectedCategory}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            setBlogs(data);
        }

        fetchBlog();
    }, [currentPage, pageSize, selectedCategory])

      //  page changing btn
      const handlePageChange = (pageNumber) =>{
        setCurrentPage(pageNumber);
      }

      const handleCategoryChange = (category) => {
       setSelectedCategory(category);
        setCurrentPage(1);
        setActiveCategory(category)

      }
  
  return (
    <div>
        {/* {category section} */}
      <div><CategorySelection onSelectCategory= {handleCategoryChange} selectedCategory= {selectedCategory} activeCategory= {activeCategory}/> </div>

      {/* {blog cards section} */}
      <div className='flex flex-col lg:flex-row gap-12'>
        {/* {blogCard components} */}
         <BlogCard blogs= {blogs} currentPage= {currentPage} selectedCategory={selectedCategory} pageSize= {pageSize}/>


         {/* {sideBar components} */}
         <div>
          <SideBar/>
         </div>
      </div>

      {/* {pigination section} */}
      <div><Pagination onPageChange= {handlePageChange} currentPage= {currentPage} blogs= {blogs} pageSize= {pageSize}/></div>
    </div>
  )
}

export default BlogPage
