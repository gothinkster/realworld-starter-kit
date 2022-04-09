import { Test, TestingModule } from '@nestjs/testing'
import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'

describe('ArticlesController', () => {
  let controller: ArticlesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile()

    controller = module.get<ArticlesController>(ArticlesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
