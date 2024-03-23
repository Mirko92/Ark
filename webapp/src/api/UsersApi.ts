import { User } from "../model/User";


const baseUrl: string = "https://jsonplaceholder.typicode.com";

export async function getAllUsers() {
  const response = await fetch(baseUrl + '/users')
  const users: User[] = await response.json();
  return users;
}

export async function getUserById(id: number) {
  const response = await fetch(baseUrl + `/users/${id}`)
  const user: User = await response.json();
  return user;
}