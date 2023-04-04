migrate((db) => {
  const collection = new Collection({
    "id": "ho0soh6xbvhtqfj",
    "created": "2023-04-04 13:53:57.193Z",
    "updated": "2023-04-04 13:53:57.193Z",
    "name": "prompts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ryruduqv",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "user",
            "assistant"
          ]
        }
      },
      {
        "system": false,
        "id": "4bhjr9kl",
        "name": "prompt",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ho0soh6xbvhtqfj");

  return dao.deleteCollection(collection);
})
