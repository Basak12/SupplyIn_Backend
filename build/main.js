"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
    });
    const frontendBuildPath = (0, path_1.join)(__dirname, '..', 'frontend', 'build');
    try {
        app.use(express.static(frontendBuildPath));
        app.use('*', (req, res) => {
            res.sendFile((0, path_1.join)(frontendBuildPath, 'index.html'));
        });
    }
    catch (error) {
        console.error('React build dosyaları bulunamadı:', error);
    }
    await app.listen(configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map