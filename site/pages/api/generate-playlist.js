export default async function handler(_, res) {
  const formattedEndpoint = `${process.env.DVA_API_ENDPOINT}/generateplaylist`;
  
  const myHeaders = new Headers();
  myHeaders.append('x-api-key', process.env.DVA_API_KEY);

  const response = await fetch(formattedEndpoint, {
    headers: myHeaders,
    method: 'POST', //TODO: add body
  });

  const data = await response.json();  
  return res.status(200).json(data);
}