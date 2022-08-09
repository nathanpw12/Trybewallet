const URL_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrentApi = async () => {
  const response = await fetch(URL_API);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.resolve(json);
};

export default getCurrentApi;
