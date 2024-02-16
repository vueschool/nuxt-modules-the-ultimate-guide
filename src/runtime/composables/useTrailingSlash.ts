export function useTrailingSlash(url: string) {
  let link;
  if (!url.endsWith("/")) {
    link = url;
  } else {
    link = url + "/";
  }

  return { link };
}
