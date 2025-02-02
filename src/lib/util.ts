export const getDate0hour = function (date?: Date): Date {
  const _date = date || new Date();
  return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), 0, 0, 0)
}

export const fetchApi = (async function(url: string) {
  const data = await fetch(url, {
    cache: "no-store",
  }).then((response) => { return response.json() });
  return data;
})