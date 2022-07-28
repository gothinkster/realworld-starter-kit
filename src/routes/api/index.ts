const serverFunction = async () => {
  return new Response('{ "msg": "Hello World" }');
};

export const get = serverFunction;
