import express from 'express';
import { prisma } from '../prisma';

const app = express();

app.get('/', (req, res) => {
  return res.send('Go to /posts or /posts/new?title=hello&content=world');
});

app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.send(posts);
});

app.get('/posts/new', async (req, res) => {
  const { title, content } = req.query;

  if (!title || typeof title !== 'string' || !content || typeof content !== 'string') {
    return res.status(400).send('invalid query params');
  }

  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: true,
    },
  });

  return res.send(post);
});

export { app };
