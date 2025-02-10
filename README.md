# INDEXER

### Launch the project
 
1. Set up .env
2. Launch docker compose
```sh
docker compose up -d
```
2.a Launch docker compose
```sh
docker compose up -d
```
3. Generate the migration file
```sh
npx squid-typeorm-migration generate
```
4. Apply the mi[env](..%2F..%2FDownloads%2Fenv)gration with
```sh
npx squid-typeorm-migration apply
```
5. Build
```sh
npm run build
```
6. Launch
```sh
npm run dev
```
