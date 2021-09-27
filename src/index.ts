import { app } from './app';

export const port = 8000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
