import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ProductModule } from './modules/product/product.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { AuthModule } from './modules/auth/auth.module';
import {CriteriaWeightModule} from "./modules/criteriaWeight/criteriaWeight.module";
import {SupplierProductModule} from "./modules/supplierProduct/supplierProduct.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'secret'),
        database: configService.get<string>('DB_NAME', 'supplyin_db'),
        entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
        //ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        synchronize: true,
        //logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    SupplierModule,
    ProductModule,
    PurchaseModule,
    AuthModule,
    CriteriaWeightModule,
    SupplierProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
