import axios from 'axios';

export default ({ req }) => {
  // we need to add condition here to check if we are executing function from backend or frontend context and handle domain accordingly
  if (typeof window === 'undefined') {
    // We are on the server
    return axios.create({
      baseURL: 'http://www.capsule-corp.pl',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};
