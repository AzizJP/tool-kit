const getEnvVar = (key: string) => {
  const env = import.meta.env[key];

  if (env === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }

  return env || '';
};

export const GITHUB_GRAPHQL_API = getEnvVar('VITE_GITHUB_GRAPHQL_API');
export const GITHUB_ACCESS_TOKEN = getEnvVar('VITE_GITHUB_ACCESS_TOKEN');
