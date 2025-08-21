import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';


const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('UsersController', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UserService, useValue: mockUsersService },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('deve criar um usuário', async () => {
        const dto = { name: 'Jonas' };
        mockUsersService.create.mockResolvedValue(dto);

        expect(await controller.create(dto as any)).toEqual(dto);
        expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });

    it('deve listar todos', async () => {
        const list = [{ name: 'Jonas' }];
        mockUsersService.findAll.mockResolvedValue(list);

        expect(await controller.findAll()).toEqual(list);
    });

    it('deve buscar por ID', async () => {
        const user = { id: 1, name: 'Jonas' };
        mockUsersService.findOne.mockResolvedValue(user);

        expect(await controller.findOne('1')).toEqual(user);
        expect(mockUsersService.findOne).toHaveBeenCalledWith("1");
    });

    it('deve atualizar', async () => {
        const updated = { id: '1', name: 'Novo', email: 'novo@gmail.com', password: '12345' };
        mockUsersService.update.mockResolvedValue(updated);

        expect(await controller.update('1', { name: 'Novo', email: 'novo@gmail.com', password: '12345' })).toEqual(updated);
    });

    it('deve remover', async () => {
        const removed = { id: 1 };
        mockUsersService.remove.mockResolvedValue(removed);

        expect(await controller.remove('1')).toEqual(removed);
    });
});