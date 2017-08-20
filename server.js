import express from 'express';
import logger from 'morgan';
import compression from 'compression';

const dev = process.env.NODE_ENV !== 'production';
const morganConfig = dev ? 'dev' : 'combined';
const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/static`));
app.use(compression());
app.use(logger(morganConfig));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/asphalt', (req, res) => {
  res.render('asphalt');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/send-message', (req, res) => {
  res.status(201).send({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log('running on port %d', PORT);
});
