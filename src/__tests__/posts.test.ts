import { Post } from '@prisma/client';
import faker from 'faker';
import supertest from 'supertest';
import { prisma } from '../../prisma/index';
import { app } from '../app';

describe('posts list', () => {
  it('should return empty array', async () => {
    const response = await supertest(app).get('/posts').expect(200);
    expect(JSON.parse(response.text)).toMatchObject([]);
  });

  describe('with existing posts', () => {
    let post1: Post;
    let post2: Post;

    beforeEach(async () => {
      post1 = await prisma.post.create({
        data: {
          title: faker.lorem.words(3),
          content: faker.lorem.words(10),
        },
      });
      post2 = await prisma.post.create({
        data: {
          title: faker.lorem.words(3),
          content: faker.lorem.words(10),
        },
      });
    });

    it('should return posts', async () => {
      const response = await supertest(app).get('/posts').expect(200);
      expect(JSON.parse(response.text)).toMatchObject([post1, post2]);
    });
  });
});
