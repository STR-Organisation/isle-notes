import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase-config';

export const getFirstName = displayName => {
  return displayName.split(' ')[0];
};
export const getLastName = displayName => {
  return displayName.split(' ')[1];
};

export const SUBJECT_SHORTHAND = {
  'IB Economics SL': 'econ-sl',
  'IB TOK': 'tok',
  'IB History HL 1': 'hoa',
  'IB ESS SL': 'ess',
  'IB Chemistry SL': 'chem',
  'IB Math A&A HL': 'math-hl',
  'IB Pers. & Prof. Skills': 'pers-prof',
  'IB Spanish SL/HL': 'spanish',
  'IB French SL/HL': 'french',
  'IB CS SL/HL': 'cs',
  'IB Theatre Arts SL/HL': 'theatre',
  'IB Film SL': 'film',
  'IB Psychology SL': 'psych',
  'IB World Religions SL': 'world-religions',
  'IB History HL 2': 'history-2',
  'IB Exercise Science SL': 'exercise-science',
  'IB Physics HL': 'phys',
  'IB Biology HL': 'bio',
  'IB Math A&A SL': 'math-sl',
  'IB Mandarin Chinese SL/HL': 'chinese',
  'IB Japanese SL/HL': 'japanese',
  'IB Lang. and Lit. HL': 'lang-lit',
  'IB Business SL/HL': 'business',
  'IB Visual Arts SL/HL': 'visual-arts',
  'IB Music SL': 'music',
};

export const SUBJECT_PICTURES = {
  'econ-sl':
    'https://www.cato.org/sites/cato.org/files/styles/optimized/public/2021-01/GettyImages-1127256104%20%281%29.jpg?itok=fJ2uAJCi',
  'exercise-science':
    'https://www.unco.edu/nhs/sport-exercise-science/images/exsci5.jpg',
  chem: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fa/6926005ea411e490ff8d4c5d4ff426/chemistry_logo.png?auto=format%2Ccompress&dpr=1',
  music:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGskxL9y6zCAAptr8DB1Ne-jtfa8XKvwLiAXm4fhzoo9MrhQikMWAnJshI0snmi28flns&usqp=CAU',
  tok: 'https://miro.medium.com/max/1400/1*fm6m4T3SllEZnbOxWJQ49w.jpeg',
  hoa: 'https://ichef.bbci.co.uk/images/ic/1920x1080/p08v6mlm.jpg',
  ess: 'https://collegerealitycheck.com/wp-content/uploads/environmental-science-1932365063-1024x768.jpg',
  'visual-arts':
    'https://www.onlinechristiancolleges.com/wp-content/uploads/2021/03/5-Careers-in-the-Visual-Arts-2.jpg',
  business:
    'https://www.incimages.com/uploaded_files/image/1920x1080/getty_180152187_970679970450042_64007.jpg',
  'lang-lit':
    'https://www.siue.edu/marketingadmin/headerimg/pll-header-image.jpg',
  japanese:
    'https://www.esl-languages.com/sites/default/files/country/esl-japan-language-stay-hero.jpg',
  chinese:
    'https://asiasociety.org/sites/default/files/styles/1200w/public/C/calligraphy.jpg',
  'math-sl': 'https://csunshinetoday.csun.edu/wp-content/uploads/Math4-web.jpg',
  'math-hl':
    'https://images.squarespace-cdn.com/content/v1/586ec16bb3db2b558ebfec60/694329ee-2cd8-4786-9406-77ca00f30b07/math-header.jpg?format=1000w',
  bio: 'https://static.scientificamerican.com/sciam/cache/file/DAD8CC8A-45F6-4740-B67DFE1C7D2929AE_source.jpg?w=590&h=800&5C2EF115-DD07-422A-8F1929803993B6F7',
  phys: 'https://www.environmentalscience.org/wp-content/uploads/2018/08/physics-640x416.jpg',
  film: 'https://college.unc.edu/wp-content/uploads/sites/1280/2020/05/film1.jpg',
  'history-2':
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvqe7csKWQ4nzAgbWm8eX76aImBIev9kjzfjoKF1aM3yP2BZYCZhkgAPcdiLmQFv176I&usqp=CAU',
  'world-religions':
    'https://www.reviewofreligions.org/wp-content/uploads/2021/01/world-religion-small-shutterstock_190143092-copy.jpeg',
  psych:
    'https://www.american.edu/cas/psychology/images/colorful-marketing-brain-psych-mob-1710.jpg',
  theatre:
    'https://www.theatreinparis.com/uploads/images/article/la-nouvelle-seine-petits-theatres-paris-header.jpg',
  cs: 'https://images1.content-hci.com/commimg/myhotcourses/blog/post/myhc_89683.jpg',
  french:
    'https://www.clozemaster.com/blog/wp-content/uploads/2017/11/How-Long-Does-it-Take-to-Learn-French.jpg',
  spanish:
    'https://www.fluentin3months.com/wp-content/uploads/2021/09/conversational-spanish-1.jpg',
  'pers-prof':
    'https://www.livecareer.com/wp-content/uploads/2019/06/resume-job-skills-values.jpg',
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

export const formatEmail = email => {
  return '@' + email.slice(0, email.indexOf('@'));
};

export const getProposalURL = async fileName => {
  return await getDownloadURL(ref(storage, `proposals/${fileName}`));
};

export const signUpImage =
  'https://images-ext-2.discordapp.net/external/bgPs0oqCsGt-ZyL09X5WYW7JIM4wl5CwzJ4vbeqMqks/https/upload.wikimedia.org/wikipedia/commons/8/8f/Bachalpsee_reflection.jpg?width=1871&height=1403';
