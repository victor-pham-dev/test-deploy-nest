import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtMiddleware } from "middleware/jwt.middleware";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AIController } from "./ai/ai.controller";
import { AIService } from "./ai/ai.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.register({
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: "72h" },
    }),
  ],
  controllers: [AppController, AIController],
  providers: [AppService, AIService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes("/api/v1/user/me", "/api/v1/job/*");
  }
}
