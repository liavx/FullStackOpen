const { test, describe ,beforeEach , after } = require('node:test')
const assert = require('node:assert')
const Blog = require("../models/blog.js");
const listHelper = require('../utils/listhelper')
const { title } = require('node:process')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)





test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17fd',
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      __v: 0,
      likes:5
    }
  ]

  const BlogNoLiike = [
    {
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      __v: 0
    }
  ]

  const restrictedBlogs = [
    {
      author: 'Leo Tolstoy',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      __v: 0
    },
    {
      title:"checkMePlease",
      author: 'Leo Tolstoy',
      __v: 0
    }
  ]

  const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }  
    ]

    const blog = []

describe('total likes', () => {
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list is empty' ,() => {
        const result = listHelper.totalLikes(blog)
        assert.strictEqual(result,0)
    })

    test('when list is full check sum' , () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result,36)
    })
  })

  describe('show blog with most likes' , () => {
          test('when blog list empty' ,() =>{
            const result = listHelper.favoriteBlog(blog)
            assert.deepEqual(result,{})
          })

          test("when blog list is only one" , () => {
          const result = listHelper.favoriteBlog(listWithOneBlog)
          assert.deepEqual(result,
            {
                title:'Go To Statement Considered Harmful',
                author:'Edsger W. Dijkstra',
                likes:'5'
            }
          )

          test("when blog list is full" , () => {
          const result = listHelper.favoriteBlog(blogs)
          assert.deepEqual(result,
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12,
            }
          )


          })


          })


  }

  
)


describe('show Author with most blogs' , () => {
    test('when blog list empty' ,() =>{
      const result = listHelper.mostBlogs(blog)
      assert.deepEqual(result,{})
    })

    test("when blog list is only one" , () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepEqual(result,
      {
          author:'Edsger W. Dijkstra',
          numOfBlogs:'1'
      }
    )

    test("when blog list is full" , () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual(result,
      {
          author: "Robert C. Martin",
          numOfBlogs: 3,
      }
    )


    })


    })


})

describe('show which author has most likes' , () => {
  test('when blog list empty' ,() =>{
    const result = listHelper.mostLikes(blog)
    assert.deepEqual(result,{})
  })

  test("when blog list is only one" , () => {
  const result = listHelper.mostLikes(listWithOneBlog)
  assert.deepEqual(result,
    {
        author:'Edsger W. Dijkstra',
        likes:'5'
    }
  )

  test("when blog list is full" , () => {
  const result = listHelper.mostLikes(blogs)
  assert.deepEqual(result,
    {
        author: "Edsger W. Dijkstra",
        likes: 17,
    }
  )


  })


  })


})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there are 6 blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 6)
})

describe('adding a blog' , () => {
test('adding a normal blog ', async () => {
  const initialBlogs = await api.get('/api/blogs');
  await api
    .post('/api/blogs')
    .send(listWithOneBlog[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsFinal = await api.get('/api/blogs')
  console.log(blogsFinal.body.length)
  assert.strictEqual(blogsFinal.body.length, initialBlogs.body.length + 1)
  const title = blogsFinal.body.map(blog => blog.title)
  assert(title.some(t => t.includes('War and')))
})
test('adding a blog with no likes' , async () =>{
  await api
    .post('/api/blogs')
    .send(BlogNoLiike[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

const blogsList = await api.get('/api/blogs')
const numOfLikes = blogsList.body[blogsList.body.length -1].likes
console.log(numOfLikes)
assert.strictEqual(numOfLikes,0)
}
)
test('adding a blog with no title' , async() =>{
  await api
  .post('/api/blogs')
  .send(restrictedBlogs[0])
  .expect(400)
})
test('adding a blog with no url' , async() =>{
  await api
  .post('/api/blogs')
  .send(restrictedBlogs[1])
  .expect(400)
})
})

test.only('checking if id is the unique identifier', async () =>{
  const blogs = await api.get('/api/blogs');
  blogid = Object.keys(blogs.body[0])
  assert.strictEqual(blogid[5],"id")

})

after(async () => {
  await mongoose.connection.close();
})

