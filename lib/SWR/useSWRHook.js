import useSWR from "swr";

function fetcher(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      nsm_auth_token: "authorized",
    },
  }).then((res) => res.json());
}

const baseUrl = "http://localhost:3000";

export const useSWRHook = (path) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = baseUrl + path;

  const { data, mutate, error } = useSWR(url, fetcher);
  return { data, mutate, error };
};
