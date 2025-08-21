import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { CloudinaryService } from './cloudinary.service';
import { BadRequestException } from '@nestjs/common';
import { Place, placeType } from '@prisma/client';

describe('PlaceController', () => {
    let controller: PlaceController;
    let placeService: jest.Mocked<PlaceService>;
    let cloudinaryService: jest.Mocked<CloudinaryService>;

    beforeEach(async () => {
        const mockPlaceService = {
            findAll: jest.fn(),
            findPaginated: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any;

        const mockCloudinaryService = {
            uploadImage: jest.fn(),
            deleteImage: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaceController],
            providers: [
                { provide: PlaceService, useValue: mockPlaceService },
                { provide: CloudinaryService, useValue: mockCloudinaryService },
            ],
        }).compile();

        controller = module.get<PlaceController>(PlaceController);
        placeService = module.get(PlaceService);
        cloudinaryService = module.get(CloudinaryService);
    });

    it('deve listar todos os locais', async () => {
        const places: Place[] = [
            {
                id: '1',
                name: 'Praia Bonita',
                type: placeType.BAR, // valor válido para placeType
                phone: '12345678',
                latitude: -23.5,
                longitude: -46.6,
                images: [],
                created_at: new Date(),
            },
        ];
        placeService.findAll.mockResolvedValue(places);

        expect(await controller.findAll()).toEqual(places);
        expect(placeService.findAll).toHaveBeenCalled();
    });

    it('deve listar locais paginados', async () => {

        const paginatedPlaces = [
            {
                id: '1',
                name: 'Bar Tunico',
                type: placeType.BAR,
                phone: '899223',
                latitude: 23.6,
                longitude: 23.5,
                images: [],
                created_at: new Date(),
            },
        ];

        const dto = { limit: 10, page: 12 };

        const paginated = {
            data: paginatedPlaces,
            meta: {
                total: 120,
                page: 12,
                lastPage: 12
            }
        };

        placeService.findPaginated.mockResolvedValue(paginated)

        const result = await controller.findPaginated(dto.page, dto.limit)

        expect(result).toEqual(paginated)
    });

    it('deve criar um local com imagens', async () => {
        const dto = {
            name: 'Praça',
            type: placeType.HOTEL,
            phone: '9023452',
            latitude: 28,
            longitude: 27,
        };

        const files = { images: [{ buffer: Buffer.from('img') }] } as any;

        cloudinaryService.uploadImage.mockResolvedValue({
            url: 'hhtps://',
            public_id: 'id_from_cloudinary',
        });

        placeService.create.mockResolvedValue({
            id: '1',
            images: [{ url: 'hhtps://', public_id: 'id_from_cloudinary' }],
            created_at: new Date(),
            ...dto,
        });

        const result = await controller.createPlace(dto as any, files);

        expect(cloudinaryService.uploadImage).toHaveBeenCalled();
        expect(placeService.create).toHaveBeenCalled();
        expect(result.id).toBe('1');
    });

    it('deve lançar erro ao criar sem imagens', async () => {
        await expect(
            controller.createPlace({} as any, { images: [] } as any),
        ).rejects.toThrow(BadRequestException);
    });

    it('deve atualizar local', async () => {
        const updated = { id: '1', name: 'Novo', type: placeType.BAR, phone: '889000000', latitude: -3.7327, longitude: -38.5267, images: [], created_at: new Date() };
        placeService.update.mockResolvedValue(updated);

        const result = await controller.updatePlace('1', { name: 'Novo' }, { images: [] } as any);
        expect(result).toEqual(updated);
    });

    it('deve deletar local', async () => {
        placeService.delete.mockResolvedValue(undefined);

        expect(await controller.deletePlace('1')).toBeUndefined();
        expect(placeService.delete).toHaveBeenCalledWith('1');
    });
});