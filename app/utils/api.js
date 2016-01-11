import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import _ from 'lodash';

export default reduxApi({
  concepts: {
    url: '/search',
    transformer: (data) => (
      transformers.array(data).map((concept) => ({
        // Id of first pit
        id: concept[0].pit.id,
        // Type of first pit
        type: concept[0].pit.type,
        // Name of first valid pit
        name: _.uniq(concept.map((pit) => pit.pit.name)).shift(),
        // Array of datasets
        datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
      })
    )),
  },
  concept: {
    url: '/search',
    transformer: (data) => (
      transformers.array(data).map((concept) => ({
        // Id of first pit
        id: concept[0].pit.id,
        // Type of first pit
        type: concept[0].pit.type,
        // Name of first valid pit
        name: _.uniq(concept.map((pit) => pit.pit.name)).shift(),
        // Array of datasets
        datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
        // Array of pits
        pits: concept.map((pit) => pit.pit),
      })).shift() || null
    ),
    postfetch: [
      ({ actions, dispatch, getState }) => {
        const { data } = getState();
        const id = data.concept.data.id;

        dispatch(actions.conceptRelations({ id }));
      },
    ],
  },
  search: {
    url: '/search',
    transformer: (data) => (
      transformers.array(data).map((concept) => ({
        // Id of first pit
        id: concept[0].pit.id,
        // Type of first pit
        type: concept[0].pit.type,
        // Name of first valid pit
        name: _.uniq(concept.map((pit) => pit.pit.name)).shift(),
        // Array of datasets
        datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
      })
    )),
  },
  conceptRelations: {
    url: '/orgsFromPerson',
    transformer: (data) => (
      transformers.array(data).map((concept) => ({
        // Type of first valid relation
        // TODO: see if we can move this sanity check to the API
        type: concept
          .filter((relation) => relation.relation_type)
          .map((relation) => relation.relation_type)
          .shift(),
        concept: {
          // Id of first pit
          id: concept[0].pit.id,
          // Type of first pit
          type: concept[0].pit.type,
          // Name of first valid pit
          name: _.uniq(concept.map((pit) => pit.pit.name)).shift(),
          // Array of datasets
          datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
        },
      })
    )),
  },
  relationTypes: {
    url: '/schemas/relations',
    transformer: (data) => (transformers.array(data && data.properties.type.enum)),
  },
  types: {
    url: '/schemas/pits',
    transformer: (data) => (transformers.array(data && data.properties.type.enum)),
  },
  datasets: {
    url: '/datasets',
    transformer: (data) => (transformers.array(data)),
  },
}).init(adapterFetch(fetch), fetch, __CONFIG__.api.baseUrl);