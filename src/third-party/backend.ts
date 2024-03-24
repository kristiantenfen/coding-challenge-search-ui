const baseUrl = "http://localhost:3001/api/data?";

export async function findAll(params: any) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${baseUrl}${query}`);
  return await response.json();
}
