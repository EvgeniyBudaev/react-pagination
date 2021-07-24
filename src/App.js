import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Pagination from './Pagination'
import Posts from './components/Posts'

export const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading && posts.length === 0) {
    return <h2>Loading...</h2>
  }
  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const howManyPages = Math.ceil(posts.length/postsPerPage)

  const handlePageChange = (currentButton) => {
    setCurrentPage(currentButton)
    history.push(`${path}?page=${currentButton}`);
  }

  const handlePageGoBack = (currentButton) => {
    setCurrentPage(prev => prev - 1)
    history.push(`${path} ${currentButton === 1 ? "" : `?page=${currentButton}`}`);
  }

  const handlePageGoForward = (currentButton) => {
    setCurrentPage(prev => prev + 1)
    history.push(`${path}?page=${currentButton}`);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts}/> 
      <Pagination
        pages={howManyPages}
        setCurrentPage={setCurrentPage}
        onChange={handlePageChange}
        onGoBack={handlePageGoBack}
        onGoForward={handlePageGoForward}
      />
    </div>
  );
}
