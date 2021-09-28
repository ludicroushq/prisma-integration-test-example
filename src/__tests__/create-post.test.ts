import faker from 'faker';
import supertest from 'supertest';
import { prisma } from '../../prisma/index';
import { app } from '../app';

describe('post create', () => {
  it('should create a post', async () => {
    expect(await prisma.post.count()).toBe(0);
    const title = faker.lorem.word();
    const content = faker.lorem.word();
    const response = await supertest(app)
      .get(`/posts/new?title=${title}&content=${content}`)
      .expect(200);
    expect(JSON.parse(response.text)).toEqual(expect.objectContaining({ title, content }));
    expect(await prisma.post.count()).toBe(1);
  });

  describe('with invalid values', () => {
    it('should return an error', async () => {
      expect(await prisma.post.count()).toBe(0);
      const response = await supertest(app).get(`/posts/new`).expect(400);
      expect(response.text).toBe('invalid query params');
      expect(await prisma.post.count()).toBe(0);
    });
  });
});
