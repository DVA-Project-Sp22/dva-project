export default async function handler(req, res) {
  let formattedEndpoint = `https://xl22m4quvvtnitrymnl6fa2slu0ssrjr.lambda-url.us-east-1.on.aws/`;

  const response = await fetch(formattedEndpoint, {
    method: 'POST', //TODO: add body
    body: req.body
  });

  const data = await response.json();  
  return res.status(200).json(data);
}