import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const admin = reduxApi({
  flag: {
    url: '/api/flags',
    // validation: (data, callback) => {
    //   debugger;
    // },
    options: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  },
  flags: {
    url: '/api/flags',
    transformer: transformers.array,
  },
});
admin.use('fetch', adapterFetch(fetch));

export default admin;
