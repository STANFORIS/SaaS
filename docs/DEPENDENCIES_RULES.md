##  PUSHING OUR LOCAL UPDATES
---
cd C:\Users\Stanforis\Desktop\stanforis_rwanda
git status
git add .
git commit -m "Rebuilt microservices directories and updated README files"
git push origin main
---




# STANFORIS SaaS — DEPENDENCIES_RULES.md

## 1. Protocols Setup

### a) QUIC

* **Role:** Core low-latency transport (HTTP/3) for frontends and inter-service RPC.
* **Use:** Between client apps ↔ gateway and critical microservices.
* **Integration:** QUIC-enabled endpoints in KrakenD and Rust microservices.
* **Security:** TLS 1.3 native; automatic cert rotation.

### b) gRPC

* **Role:** Canonical RPC protocol for typed inter-microservice APIs.
* **Use:** Internal communication, SDK generation, proto-first development.
* **Integration:** Over QUIC/HTTP2; CI validation for backward compatibility.
* **Security:** mTLS + JWT propagation with DI claims.

### c) MQTT

* **Role:** IoT / device telemetry bus.
* **Use:** Edge → HiveMQ broker → Kafka ingestion.
* **Integration:** Topic-based taxonomy; MQTT → Kafka bridge.
* **Security:** TLS, ACLs, client certs.

### d) WebSocket

* **Role:** Real-time UI channel for dashboards.
* **Use:** Flutter UIs for push updates and live-sync.
* **Integration:** Gateway-proxied secure connections.
* **Security:** JWT handshake, rate-limiting.

---

## 2. Database Setup

### a) PostgreSQL

* **Role:** Canonical relational store.
* **Use:** Digital Identity registry, configuration, RBAC, audit.
* **Integration:** Logical replication, RLS, partitioning.
* **Security:** Encryption at rest; tenant-level access.

### b) SurrealDB

* **Role:** Graph/document hybrid for relationships.
* **Use:** Identity ↔ institution ↔ device mappings.
* **Integration:** ETL from Postgres for graph traversals.

### c) MongoDB

* **Role:** Document store for sector-specific data.
* **Use:** Unstructured records, logs, attachments.
* **Integration:** Change streams to Kafka.

---

## 3. Analytics / AI

### a) ClickHouse

* **Role:** High-performance OLAP engine.
* **Use:** Analytics dashboards, metrics aggregation.
* **Integration:** Kafka ingestion pipeline.

### b) TimescaleDB

* **Role:** Time-series DB.
* **Use:** IoT telemetry, continuous aggregates.
* **Integration:** Kafka → Timescale, Postgres joins.

### c) Python / Rust ML Modules

* **Role:** ML inference and analytics models.
* **Use:** Predictions, anomaly detection.
* **Integration:** Serve via gRPC endpoints, consume from Kafka.

---

## 4. Local Database Setup

### a) Isar

* **Role:** Local persistent DB for Flutter apps.
* **Use:** Offline-first data storage.
* **Integration:** Sync engine for push/pull updates.

### b) Hive

* **Role:** Lightweight KV store.
* **Use:** Tokens, preferences.
* **Integration:** Complementary to Isar.

---

## 5. Online Databases

### a) Firebase

* **Role:** Optional real-time sync prototype layer.
* **Use:** Early MVP features.
* **Integration:** Secondary to Postgres.

### b) AWS S3

* **Role:** Object storage & archival.
* **Use:** Files, logs, images, backups.
* **Integration:** Signed URL access; lifecycle rules.

---

## 6. API Gateway

### a) KrakenD

* **Role:** Central ingress and routing layer.
* **Use:** Auth, rate-limiting, response shaping.
* **Integration:** JWT validation, DI claim enforcement.

---

## 7. Microservices Communication

### a) gRPC

* **Role:** Core service mesh communication.
* **Use:** Strict API contracts.
* **Integration:** Versioned protos and generated SDKs.

---

## 8. Device / IoT Communication

### a) MQTT (HiveMQ)

* **Role:** Main IoT broker.
* **Use:** Device telemetry ingestion.

### b) CoAP

* **Role:** Lightweight protocol for constrained devices.

### c) NATS

* **Role:** Fast ephemeral messaging bus.

### d) ZeroMQ

* **Role:** Brokerless local messaging for edge nodes.

---

## 9. Edge Compute & Event Bus

* **Role:** Edge preprocessing and central event streaming.
* **Use:** Validate, enrich telemetry → Kafka.
* **Integration:** Rust edge services, Avro schema registry.

---

## 10. Frontend / Dashboards

### a) Flutter

* **Role:** Unified UI layer.
* **Use:** Entry dashboard, sector dashboards, microservice apps.
* **Integration:** Live-sync via WebSocket, offline Isar cache.

---

## Implementation Roadmap

1. Digital Identity Registry (Postgres + PKI)
2. KrakenD Gateway + OAuth2/JWT setup
3. gRPC Proto Repo and CI pipeline
4. MQTT → Kafka ingestion + schema registry
5. Core DB schemas (Identity, Tenancy, Subscriptions)
6. Timescale & ClickHouse analytics setup
7. SurrealDB/MongoDB domain integrations
8. Flutter Entry Dashboard (offline sync)
9. First sector microservice (e.g., Health: FHIR adapter)
10. ML module integration and expansion
