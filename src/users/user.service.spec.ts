import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

// Mock do PrismaService
// Aqui estamos criando um mock do PrismaService para simular as operações de banco de dados
const mockPrisma = {
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

// Testes para o UsersService
// Aqui estamos criando uma suite de testes para o UsersService, que é responsável por gerenciar usuários
// Usamos o Jest para criar mocks e verificar se as funções estão sendo chamadas corretamente
describe("UsersService", () => {
    let service: UserService;

    // Antes de cada teste, criamos uma instância do UsersService com o PrismaService mockado
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    // Testes individuais
    // Aqui definimos os testes individuais para cada funcionalidade do UsersService
    it("deve criar um usuário", async () => {
        const dto = { name: "Jonas", email: "jonas@example.com", password: "123" };
        mockPrisma.user.create.mockResolvedValue(dto);

        const result = await service.create(dto as any);
        expect(result).toEqual(dto);
        expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
    });

    it("deve listar todos os usuários", async () => {
        const users = [{ name: "Jonas" }];
        mockPrisma.user.findMany.mockResolvedValue(users);

        expect(await service.findAll()).toEqual(users);
    });

    it("deve retornar um usuário por ID", async () => {
        const user = { id: "1", name: "Jonas" };
        mockPrisma.user.findUnique.mockResolvedValue(user);

        expect(await service.findOne("1")).toEqual(user);
    });

    it("deve lançar erro se usuário não encontrado", async () => {
        mockPrisma.user.findUnique.mockResolvedValue(null);
        await expect(service.findOne("999")).rejects.toThrow(NotFoundException);
    });

    it("deve atualizar um usuário", async () => {
        const existingUser = { id: "1", name: "Jonas" };
        const updated = { id: "1", name: "Novo Nome" };

        mockPrisma.user.findUnique.mockResolvedValue(existingUser);
        mockPrisma.user.update.mockResolvedValue(updated);

        expect(await service.update("1", { name: "Novo Nome" })).toEqual(updated);
        expect(mockPrisma.user.update).toHaveBeenCalledWith({
            where: { id: "1" },
            data: { name: "Novo Nome" },
        });
    });

    it("deve remover um usuário", async () => {
        const removed = { id: "1" };
        mockPrisma.user.delete.mockResolvedValue(removed);

        expect(await service.remove("1")).toEqual(removed);
    });
});