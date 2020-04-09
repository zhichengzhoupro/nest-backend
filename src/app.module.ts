import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dbConnect} from "./config/tyorm.config";

@Module({
    imports: [
      TypeOrmModule.forRoot({
        ...dbConnect
      }),
        AuthModule],

})
export class AppModule {
}
