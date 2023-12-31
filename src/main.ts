import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { createSwaggerDocument } from "swagger";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug"],
  });

  const allowedOrigins = [
    "http://127.0.0.1:4000",
    "http://localhost:4000",
    "https://studio-dev.eduquiz.vn",
  ];

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(corsOptions);

  createSwaggerDocument(app);

  await app.listen(8888);
}
bootstrap();
