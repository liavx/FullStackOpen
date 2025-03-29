const { test, describe ,beforeEach , after } = require('node:test')
const assert = require('node:assert')
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
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
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      __v: 0,
      likes:1
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
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
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
      assert.strictEqual(result, 1)
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

describe('show blog with most likes', () => {
  test('when blog list empty', () => {
    const result = listHelper.favoriteBlog(blog)
    assert.deepEqual(result, {})
  })

  test("when blog list is only one", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepEqual(result, {
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      likes: 1
    })
  })

  test("when blog list is full", () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('show Author with most blogs', () => {
  test('when blog list empty', () => {
    const result = listHelper.mostBlogs(blog)
    assert.deepEqual(result, {})
  })

  test("when blog list is only one", () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepEqual(result, {
      author: 'Leo Tolstoy',
      numOfBlogs: '1'
    })
  })

  test("when blog list is full", () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepEqual(result, {
      author: "Robert C. Martin",
      numOfBlogs: 3,
    })
  })
})

describe('show which author has most likes', () => {
  test('when blog list empty', () => {
    const result = listHelper.mostLikes(blog)
    assert.deepEqual(result, {})
  })

  test("when blog list is only one", () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepEqual(result, {
      author: 'Leo Tolstoy',
      likes: '1'
    })
  })

  test("when blog list is full", () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogObjects = blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there are 6 blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 6)
})

describe('adding a blog', () => {
  test('adding a normal blog', async () => {
    const initialBlogs = await api.get('/api/blogs')
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

  test('adding a blog with no likes', async () => {
    await api
      .post('/api/blogs')
      .send(BlogNoLiike[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsList = await api.get('/api/blogs')
    const numOfLikes = blogsList.body[blogsList.body.length - 1].likes
    console.log(numOfLikes)
    assert.strictEqual(numOfLikes, 0)
  })

  test('adding a blog with no title', async () => {
    await api
      .post('/api/blogs')
      .send(restrictedBlogs[0])
      .expect(400)
  })

  test('adding a blog with no url', async () => {
    await api
      .post('/api/blogs')
      .send(restrictedBlogs[1])
      .expect(400)
  })
})

test('checking if id is the unique identifier', async () => {
  const blogs = await api.get('/api/blogs')
  const blogid = Object.keys(blogs.body[0])
  assert.strictEqual(blogid[5], "id")
})

describe('deletion of a blog', () => {
  test('if id is valid', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const deleteBlog = blogs[0]

    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .expect(204)

    const endResponse = await api.get('/api/blogs')
    const endBlog = endResponse.body
    assert.strictEqual(endBlog.length, blogs.length - 1)
    const title = endBlog.map(blog => blog.title)
    assert(!title.includes(deleteBlog.title))
  })
})

test("check if put succeeds" , async () =>{
const response = (await api.get('/api/blogs')).body
const blogToUpdate = response[0]
await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({likes:15})
    .expect(200)

const endResponse = (await api.get('/api/blogs')).body
modifiedBlog = endResponse[0]
assert.strictEqual(modifiedBlog.likes,15)
})

describe('adding a user check', () => {
  test.only('adding a user with no name', async () => {
    const response =await api
      .post('/api/users')
      .send({password:"ayaa"})
      .expect(400)
      assert.strictEqual(response.body.error, 'Username must be at least 3 characters long');

  })

  test.only('adding a user with no password', async () => {
    const response = await api
      .post('/api/users')
      .send({username:"ayaa"})
      .expect(400)
      assert.strictEqual(response.body.error, 'Password must be at least 3 characters long');

  })
  test.only('adding a user with invaild username', async () => {
    const response =await api
      .post('/api/users')
      .send({username:"ay",
             password:"12345"
      })
      .expect(400)
      assert.strictEqual(response.body.error, 'Username must be at least 3 characters long');
  })
  test.only('adding a user with invaild password', async () => {
    const response = await api
      .post('/api/users')
      .send({username:"ayuas",
             password:"12"
      })
      .expect(400)
      assert.strictEqual(response.body.error, 'Password must be at least 3 characters long');
  })

})


after(async () => {
  await mongoose.connection.close()
})

