migrate((db) => {
  const collection = new Collection({
    "id": "52a8enac4nidk8u",
    "created": "2023-04-04 13:58:52.823Z",
    "updated": "2023-04-04 13:58:52.823Z",
    "name": "conversationsTree",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4bkbcshn",
        "name": "initPrompt",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ho0soh6xbvhtqfj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "5oyckpsi",
        "name": "tree_1",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ho0soh6xbvhtqfj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "29rmmhpd",
        "name": "tree_2",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ho0soh6xbvhtqfj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "kwhwv5oi",
        "name": "tree_3",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ho0soh6xbvhtqfj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "zgpkivda",
        "name": "tree_4",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ho0soh6xbvhtqfj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("52a8enac4nidk8u");

  return dao.deleteCollection(collection);
})
