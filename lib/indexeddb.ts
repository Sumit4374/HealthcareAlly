import { openDB } from 'idb'

const DB_NAME = 'HealthDB'
const DB_VERSION = 1
const STORE_NAME = 'documents'

export async function getDB() {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

export async function saveDocument(doc: { id?: string; content: any }) {
  const db = await getDB()
  await db.put(STORE_NAME, doc)
}

export async function getAllDocuments() {
  const db = await getDB()
  return await db.getAll(STORE_NAME)
}

export async function deleteDocument(id: string | number) {
  const db = await getDB()
  await db.delete(STORE_NAME, id)
}

export async function clearAllDocuments() {
  const db = await getDB()
  await db.clear(STORE_NAME)
}
