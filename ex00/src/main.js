
//如果入口文件是js，所以在這裡import css files.
import '../assets/index.css'

// 不能加了 css 又有 less
// import '../assets/index.less'
// if index.less not found,
// ERROR in ./src/main.js
// Module not found: Error: Can't resolve '../assets/index.less' in 'C:\Users\maxfan\Desktop\pj_cd\ex00\src'
// @ ./src/main.js 3:0-29


//-----------------------------------------------------------------
// 如果想用 file loader, 就要用 css load image
// (1) 其實係合理, static images 係 樣式一部分
// (2) dynamic image (e.g. albumn) 係 api data driven
// 所以, 不用在 html 打 image source
//-----------------------------------------------------------------
// import RestaurantView from '../assets/restaurant-view.jpg';
// import HappyBirthdayMp3 from '../assets/HappyBirthday.mp3';

import '../assets/restaurant-view.jpg';
import '../assets/HappyBirthday.mp3';

console.log('hello world!')

// document.querySelector('body').classList.add('with-styles');
