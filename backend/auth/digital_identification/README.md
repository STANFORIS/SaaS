## Start API in Dev Mode 
npm run start:dev

##  Start NATS
nats-server.exe

## ⚙️ Step 2. Start the database (in-memory mode)
surreal start --log debug --user root --pass root memory
surreal start --user root --pass root memory

http://127.0.0.1:8000

## 💾 Step 3. (Optional) Persistent local database
surreal start --log info --user root --pass root file://C:/SurrealDB/data





<!-- DIGITAL IDENTITY API DEPENDANCIES -->

1. Surreal DB
## Powershell: iwr https://windows.surrealdb.com -useb | iex
## installed surreal version
2.3.10 for windows on x86_64

## Install SurrealDB Client SDK
npm install surrealdb.js
npm install @surrealdb/node

2. NATS Server 
## Installed Version
Latest Release: v2.12.0 on September 22, 2025

























<!-- 


[3:25:02 PM] File change detected. Starting incremental compilation...

[3:25:05 PM] Found 0 errors. Watching for file changes.

[Nest] 10016  - 10/10/2025, 3:25:13 PM     LOG [NestFactory] Starting Nest application...
[Nest] 10016  - 10/10/2025, 3:25:13 PM     LOG [InstanceLoader] AppModule dependencies initialized +50ms
[Nest] 10016  - 10/10/2025, 3:25:13 PM     LOG [InstanceLoader] ClientsModule dependencies initialized +1ms
[Nest] 10016  - 10/10/2025, 3:25:13 PM     LOG [InstanceLoader] DigitalIdentityModule dependencies initialized +3ms
🔗 NATS microservice configured with servers: [ 'nats://localhost:4222' ]
🧠 gRPC microservice configured at: 0.0.0.0:50051
✅ SurrealDB initialized
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [NestMicroservice] Nest microservice successfully started +1054ms
(node:10016) DeprecationWarning: Calling start() is no longer necessary. It can be safely omitted.
(Use `node --trace-deprecation ...` to show where the warning was created)
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [NestMicroservice] Nest microservice successfully started +29ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RoutesResolver] DigitalIdentityController {/digital-identity}: +10ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/register, POST} route +16ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/login, POST} route +5ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/verify, POST} route +4ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/identity/:id, GET} route +8ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/identity/national/:nid, GET} route +6ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/identity/:id, PATCH} route +4ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/identity/:id/revoke, POST} route +5ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RouterExplorer] Mapped {/digital-identity/identities, GET} route +4ms
[Nest] 10016  - 10/10/2025, 3:25:14 PM     LOG [RoutesResolver] DigitalIdentityGrpcController {/}: +1ms
✅ SurrealDB initialized
[Nest] 10016  - 10/10/2025, 3:25:15 PM     LOG [NestApplication] Nest application successfully started +156ms
🛰️ SDIP NestJS microservice running on http://localhost:3000


 -->





# Digital Identification Service  (TypeScript (NestJS) backend)


TESTS
## 1️⃣ Register Identity (Method: POST)
URL: http://localhost:3000/digital-identity/register <!--   SUCCESS -->


## 2️⃣ Login (Method: POST)
URL: http://localhost:3000/digital-identity/login <!--   SUCCESS -->


## 3️⃣ Verify Token (Method: POST)
URL: http://localhost:3000/digital-identity/verify <!--   SUCCESS -->

## 4️⃣ List Identities (Method: GET)
URL: http://localhost:3000/digital-identity/identities?page=1&perPage=20 <!--  SUCCESS -->


## 4️⃣ Get Identity by ID (Method: GET)
URL: http://localhost:3000/digital-identity/identity/SID-1696951234567-1234  <!--  NOT SUCCESS -->


## 5️⃣ Update Identity  (Method: PATCH)
URL: http://localhost:3000/digital-identity/identity/SID-1696951234567-1234  <!--  NOT SUCCESS -->


## 6️⃣ Revoke Identity (Method: POST)
URL: http://localhost:3000/digital-identity/identity/SID-1696951234567-1234/revoke <!--  NOT SUCCESS -->







