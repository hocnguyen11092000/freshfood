let inMemoryToken: string = "";

export const setToken = (token: string) => {
  inMemoryToken = token;
};

export const getToken = () => inMemoryToken;
