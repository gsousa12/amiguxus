import { Module } from '@nestjs/common';
import { PetController } from './http/controller/pet.controller';
import { PetRepository } from './infrastructure/repository/pet.repository';
import { PetService } from './core/application/services/pet.service';
import { PetHelper } from './core/application/helpers/pet.helper';
import { PET_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PrismaService } from 'src/common/modules/prisma/service/prisma.service';

@Module({
  imports: [],
  controllers: [PetController],
  providers: [
    {
      provide: PET_REPOSITORY,
      useClass: PetRepository,
    },
    PetService,
    PetHelper,
    PrismaService,
  ],
  exports: [],
})
export class PetModule {}
