import { CreateUserSchema, type CreateUserDTO, type UpdateUserDTO } from './users.dto';
import type { IUserRepository } from './users.repository';

export class UserService {
  constructor(private repo: IUserRepository) {}

  async create(data: CreateUserDTO) {
    return this.repo.create(data);
  }

  async read(id: number) {
    return this.repo.read(id);
  }

  async list() {
    return this.repo.list();
  }

  async update(id: number, data: UpdateUserDTO) {
    return this.repo.update(id, data);
  }
}
