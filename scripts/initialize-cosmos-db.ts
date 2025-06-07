import { CosmosClient } from "@azure/cosmos"
import dotenv from "dotenv"

// Load environment variables
dotenv.config({ path: ".env.local" })

async function initializeCosmosDB() {
  console.log("Initializing Cosmos DB...")

  // Validate environment variables
  if (!process.env.AZURE_COSMOS_ENDPOINT || !process.env.AZURE_COSMOS_KEY) {
    console.error("Missing Cosmos DB credentials in environment variables")
    process.exit(1)
  }

  const client = new CosmosClient({
    endpoint: process.env.AZURE_COSMOS_ENDPOINT,
    key: process.env.AZURE_COSMOS_KEY,
  })

  // Database name
  const databaseId = "sea-bridge"

  // Container configurations
  const containers = [
    { id: "users", partitionKey: "/id" },
    { id: "learningProfiles", partitionKey: "/userId" },
    { id: "analytics", partitionKey: "/userId" },
    { id: "content", partitionKey: "/contentId" },
    { id: "feedback", partitionKey: "/userId" },
  ]

  try {
    // Create database if it doesn't exist
    console.log(`Creating database: ${databaseId}`)
    const { database } = await client.databases.createIfNotExists({ id: databaseId })
    console.log(`Database created: ${database.id}`)

    // Create containers if they don't exist
    for (const containerDef of containers) {
      console.log(`Creating container: ${containerDef.id}`)
      const { container } = await database.containers.createIfNotExists({
        id: containerDef.id,
        partitionKey: { paths: [containerDef.partitionKey] },
      })
      console.log(`Container created: ${container.id}`)
    }

    console.log("Cosmos DB initialization completed successfully")
  } catch (error) {
    console.error("Error initializing Cosmos DB:", error)
    process.exit(1)
  }
}

initializeCosmosDB()
