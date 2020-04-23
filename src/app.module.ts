import {Module} from '@nestjs/common';
import {UserModule} from './user/userModule';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dbConnect} from "./config/tyorm.config";

@Module({
    imports: [
      TypeOrmModule.forRoot({
        ...dbConnect
      }),
        UserModule],

})
export class AppModule {
}
