migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ho0soh6xbvhtqfj")

  collection.listRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ho0soh6xbvhtqfj")

  collection.listRule = null

  return dao.saveCollection(collection)
})
