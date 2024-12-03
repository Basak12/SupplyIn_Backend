import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { Supplier } from './modules/supplier/supplier.entity';
import { Product } from './modules/product/product.entity';
import { ProductModule } from './modules/product/product.module';
import { Purchase } from './modules/purchase/purchase.entity';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'supplyin_db',
      entities: [User, Purchase, Product, Supplier],
      synchronize: true,
    }),
    UserModule,
    SupplierModule,
    ProductModule,
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
