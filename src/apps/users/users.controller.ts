import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { AuthRoles } from 'src/utils/decorators/auth-roles.decorator';
import { UserRoles } from 'src/utils/common/user-roles.enum';
import { RolesAuthGard } from '../auth/guards/roles-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller({ path:'users', version: '1'})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @AuthRoles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN) // allow role/permission
  @UseGuards(RolesAuthGard) // check roles
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto)
    if (result.affected === 0) {
      throw new HttpException('Somthing went wrong!. ', HttpStatus.BAD_REQUEST);
    }
    return { message: 'Update Record Successfully.' };
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if (result.affected === 0) {
      throw new HttpException('Somthing went wrong!. ', HttpStatus.BAD_REQUEST);
    }
    return { message: 'Delete Record Successfully.' };
  }

  @Get('profile/me')
  profile(@Req() req: any) {
    return this.usersService.findOne(+req.user.id);
  }
}
