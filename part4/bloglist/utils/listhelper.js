const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  return array.reduce ((sum,curr) => sum + curr.likes,0)
}

const favoriteBlog = (array) => {
  if(array.length == 0){
    return {}
  }
  let max = array.reduce((bigBlog,currBlog) => {
    return bigBlog.likes > currBlog.likes ? bigBlog : currBlog
  },array[0])

  return {title:max.title , author : max.author , likes : max.likes}

}

//using loadash


const mostBlogs = (arr) => {
  const mostBlog = _.countBy(arr, 'author')
  const [author, numOfBlogs] = _.maxBy(Object.entries(mostBlog), ([author, count]) => count) || []
  return author ? { author:author , numOfBlogs: +numOfBlogs } : {}
}


const mostLikes = (arr) => {
  const authorLikes = arr.reduce((acc,{author,likes}) =>{
    acc[author] = (acc[author] || 0) + likes
    return acc
  },{})
  const [author , likes] = Object.entries(authorLikes).reduce((max,curr) =>{
    return curr[1]>max[1] ? curr : max
  },['',0])

  return author ? {author:author , likes:likes} : {}
}




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}


