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
  chemistry:
    'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fa/6926005ea411e490ff8d4c5d4ff426/chemistry_logo.png?auto=format%2Ccompress&dpr=1',
  music:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGskxL9y6zCAAptr8DB1Ne-jtfa8XKvwLiAXm4fhzoo9MrhQikMWAnJshI0snmi28flns&usqp=CAU',
  tok: 'https://miro.medium.com/max/1400/1*fm6m4T3SllEZnbOxWJQ49w.jpeg',
  hoa: 'https://ichef.bbci.co.uk/images/ic/1920x1080/p08v6mlm.jpg',
  ess: 'https://collegerealitycheck.com/wp-content/uploads/environmental-science-1932365063-1024x768.jpg',
};
