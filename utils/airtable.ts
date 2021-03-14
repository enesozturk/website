import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
)

const minifyRecords = (records: any) => {
  return records.map((record: any) => getMinifiedRecord(record))
}

const getMinifiedRecord = (record: any) => {
  if (!record.fields.completed) {
    record.fields.completed = false
  }
  return {
    id: record.id,
    ...record.fields
  }
}

const getTable = async (table: string) => {
  const records = await base(table)
    .select({
      sort: [{ field: 'create_date', direction: 'asc' }]
    })
    .all()
  const data = await minifyRecords(records)

  return data
}

export { getTable }
