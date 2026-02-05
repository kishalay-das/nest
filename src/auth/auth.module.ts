import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport'
import { JwtStrategies } from './strategies/jwt.strategies';
import { RolesGuard } from './guards/roles.guards';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategies, RolesGuard],
  exports: [AuthService, RolesGuard]
})
export class AuthModule {}
