import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResourcesModule } from './resources/resources.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ankushrathi726_db_user:lZWS60NpbXkh3n7C@cluster0.uwhwxeo.mongodb.net/nest_demo?retryWrites=true&w=majority',
      {
        dbName: 'nest_demo',
      },
    ),
    ResourcesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
