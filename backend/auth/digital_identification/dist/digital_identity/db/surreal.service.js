"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurrealService = void 0;
const common_1 = require("@nestjs/common");
const surrealdb_1 = require("surrealdb");
let SurrealService = class SurrealService {
    async init() {
        this.db = new surrealdb_1.default();
        await this.db.connect(process.env.SURREAL_URL || 'http://127.0.0.1:8000/rpc');
        await this.db.use({
            namespace: process.env.SURREAL_NS || 'stanforis',
            database: process.env.SURREAL_DB || 'digital_identity',
        });
        await this.db.signin({
            username: process.env.SURREAL_USER || 'root',
            password: process.env.SURREAL_PASS || 'root',
        });
        console.log('✅ SurrealDB initialized');
    }
};
exports.SurrealService = SurrealService;
exports.SurrealService = SurrealService = __decorate([
    (0, common_1.Injectable)()
], SurrealService);
//# sourceMappingURL=surreal.service.js.map