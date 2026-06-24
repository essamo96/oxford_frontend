const fs = require('fs');

const file = 'c:\\laragon\\www\\fullmarkdisegn\\academy\\index.html';
let html = fs.readFileSync(file, 'utf8');

// Specialized Programs
html = html.replace('assets/img/featured/tawjihi.png', 'assets/img/programs/prog1.png');
html = html.replace('assets/img/featured/children.png', 'assets/img/programs/prog2.png');
html = html.replace('assets/img/featured/speech.png', 'assets/img/programs/prog3.png');
html = html.replace('assets/img/featured/rehabilitation.png', 'assets/img/programs/prog4.png');

// Latest News
html = html.replace('assets/img/banner/1.jpg', 'assets/img/news/news1.png');
html = html.replace('assets/img/banner/4.jpg', 'assets/img/news/news2.png');
html = html.replace('assets/img/banner/contact.jpg', 'assets/img/news/news3.png');

fs.writeFileSync(file, html, 'utf8');
console.log('Images replaced in index.html');
