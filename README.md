## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage Command
```
-- nest migrations for team --
(npm or npx) -> ref typeorm cli (package.json)
npm run migration:generate  --name=create_table_<name>  = คำสั่งสราง genarate migration file จาก entity (auto)
npm run migration:create --name=create_table_<name>  = คำสั่งสราง genarate migration file  (manaul)
npm run migration:run  =  คำสั่งสราง table บน database จาก folder migrations
npm run migration:revert  = คำสั่งยกเลิกสราง table บน database ก่อนหน้านี้
npm run migration:show    = แสดงชื่อและจำนวนไฟล์ใน  folder migrations
npm run db:drop =  ลบ Database (edited)
```
