import axios from "axios";

const BASE_URL = "https://ymtaz.sa/api/client/";
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3ltdGF6LnNhL2FwaS9jbGllbnQvbG9naW4iLCJpYXQiOjE3MTMxODgxOTAsImV4cCI6MjE2MDE3MTMxODgxOTAsIm5iZiI6MTcxMzE4ODE5MCwianRpIjoiOXVZU0lsOHY2UkkzNGxHciIsInN1YiI6IjE2NTEiLCJwcnYiOiIyYTg0NjYyYzMzMTU3NTQ2YzQzZjQwMzc1NDY0MTViYzcwZDc4YmJjIn0.jn7AwKiHQhN-z4qraZ0udGn_321-6V7JQJX3GyabQU4'

export async function getLawyersByCategory(id: number) {
  const lawyers = await axios.post(`${BASE_URL}digital-guide/search`, { category_id: id }, {
    headers: { 'Authorization': `bearer ${TOKEN}` }
  })

  return lawyers.data;
}

export async function getLawyerById(id: number) {
  const lawyer = await axios.get(`${BASE_URL}lawyer/${id}`, {
    headers: {
      'Authorization': `bearer ${TOKEN}`
    }
  })

  return lawyer.data;
}