import express from 'express';

const app = express();
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/static`));

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


app.listen(3000, () => {
  console.log('running on port %d', 3000);
});
