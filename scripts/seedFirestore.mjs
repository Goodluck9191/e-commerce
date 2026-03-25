import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import admin from 'firebase-admin'

/**
 * Usage:
 * 1) Create Firebase service account JSON (Project settings → Service accounts).
 * 2) Download it and set:
 *    export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/serviceAccount.json"
 * 3) Run:
 *    npm run seed
 */

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function listSeedFiles(seedDir) {
  return fs
    .readdirSync(seedDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(seedDir, f))
    .sort()
}

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    })

const db = admin.firestore(app)

const seedDir = path.join(process.cwd(), 'seed')
const files = listSeedFiles(seedDir)

if (files.length === 0) {
  console.error(`No seed JSON files found in ${seedDir}`)
  process.exit(1)
}

let total = 0
for (const file of files) {
  const posts = readJson(file)
  if (!Array.isArray(posts)) throw new Error(`Seed file must be an array: ${file}`)
  console.log(`Seeding ${posts.length} posts from ${path.basename(file)}…`)

  const batch = db.batch()
  for (const p of posts) {
    if (!p?.slug) throw new Error(`Missing slug in ${file}`)
    const ref = db.collection('posts').doc(p.slug)
    const created = p.created_at ? new Date(p.created_at) : new Date()
    batch.set(
      ref,
      {
        title: p.title,
        slug: p.slug,
        meta_description: p.meta_description ?? '',
        content: p.content,
        cover_image: p.cover_image,
        category: p.category,
        tags: Array.isArray(p.tags) ? p.tags : [],
        created_at: admin.firestore.Timestamp.fromDate(created),
      },
      { merge: true },
    )
    total++
  }
  await batch.commit()
}

console.log(`Done. Seeded ${total} posts into collection "posts".`)

