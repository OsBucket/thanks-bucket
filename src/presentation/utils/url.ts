import queryString from 'query-string';

export const queryStringToObject = (str: string, options: {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options
  });

export const objectToQueryString = (obj: any, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options
  });
