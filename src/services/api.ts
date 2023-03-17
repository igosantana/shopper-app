import axios from 'axios'
import { IUser, UserDTO } from '../App';

const URL = 'http://localhost:3000'

async function getUsers(): Promise<IUser[]> {
  const response = await axios.get<IUser[]>(`${URL}/user`);

  return response.data;
}


async function createUser(body: UserDTO): Promise<any> {
  const response = await axios.post(`${URL}/user`, body);

  return response.data;
}

export const api = {
  getUsers,
  createUser
}
