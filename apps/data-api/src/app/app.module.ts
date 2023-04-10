import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { DataModule } from './data.module';
import { Neo4jModule } from './neo4j/neo4j.module';
import { RcmdModule } from './rcmd.module';
import { RolesGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';



@Module({
  imports: [MongooseModule.forRoot(
    `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`  ),    
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.NEO4J_HOST,
      username: process.env.NEO4J_USR,
      password: process.env.NEO4J_PWD,
      database: process.env.NEO4J_DATABASE,
    }),
    AuthModule,
    DataModule,
    RouterModule.register([
      {
        path: 'auth-api',
        module: AuthModule,
      },
      {
        path: 'data-api',
        module: DataModule,
      },
      {
        path: 'rcmd-api',
        module: RcmdModule,
      },
    ]),
    Neo4jModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware)  .exclude(
      { path: 'data-api/product', method: RequestMethod.GET },
      { path: 'data-api/review', method: RequestMethod.GET },
      { path: 'data-api/review/product/:id', method: RequestMethod.GET },
      { path: 'data-api/product/:id', method: RequestMethod.GET},
      { path: 'data-api/product/:id/relate', method: RequestMethod.GET},
      'cats/(.*)',
    ).forRoutes('data-api');
  }
}