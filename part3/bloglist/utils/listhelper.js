const _ = require('lodash');


const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (array) => {
    return array.reduce ((sum,curr) => sum + curr.likes,0)
}

const favoriteBlog = (array) => {
    if(array.length == 0){
        return {};
    }
    let max = array.reduce((bigBlog,currBlog) => {
    return bigBlog.likes > currBlog.likes ? bigBlog : currBlog
    },array[0])

    return {title:max.title , author : max.author , likes : max.likes}

}

//using loadash


const mostBlogs = (arr) => {
        const mostBlog = _.countBy(arr, 'author');
        const [author, numOfBlogs] = _.maxBy(Object.entries(mostBlog), ([author, count]) => count) || [];
        return author ? { author:author , numOfBlogs: +numOfBlogs } : {};
}






  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }


