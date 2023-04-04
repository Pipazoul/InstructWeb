migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("52a8enac4nidk8u")

  collection.listRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("52a8enac4nidk8u")

  collection.listRule = null

  return dao.saveCollection(collection)
})
