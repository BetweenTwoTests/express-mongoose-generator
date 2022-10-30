# express-mongoose-generator

It’s a mongoose model, REST controller and Express router code generator for Express.js 4 application.

## Installation
```bash
$ npm install -g express-mongoose-generator
```

## Usage
### Non-Interactive mode
Generates a Mongoose model, a REST controller and Express router :
```bash
$ mongoose-gen -m car -f carDoor:number,color -r
        create: ./models/cardModel.js
        create: ./routes/cardRoutes.js
        create: ./controllers/cardController.js
```

##### Options

  - `-m, --model <modelName>` - the model name.
  - `-f, --fields  <fields>` - the fields (name1:type,name2:type).
  - `-r, --rest` - enable generation REST.
  - `-t, --tree <tree>`        files tree generation grouped by (t)ype or by (m)odule
  - `--ts` generate TypeScrypt files

##### Available types
  - string
  - number
  - date
  - boolean
  - array
  - objectId
