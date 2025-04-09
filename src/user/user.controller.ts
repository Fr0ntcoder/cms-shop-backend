import { Controller, Get, Param, Patch } from '@nestjs/common'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: string) {
    return await this.userService.getById(id)
  }

  @Auth()
  @Patch('profile/favorites/:productId')
  async tooggleFavorites(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.userService.toogleFavorite(userId, productId)
  }
}
