const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || '';

interface MongoDBResponse<T> {
  documents: T[];
}

async function fetchFromMongoDB<T>(
  action: string,
  collection: string,
  data?: any
): Promise<T> {
  const response = await fetch(`https://data.mongodb-api.com/app/${MONGODB_URI}/endpoint/data/v1/action/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collection,
      database: 'swish',
      dataSource: 'Cluster0',
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error('MongoDB API request failed');
  }

  return response.json();
}

export async function findDocuments<T>(
  collection: string,
  filter = {}
): Promise<T[]> {
  const response = await fetchFromMongoDB<MongoDBResponse<T>>('find', collection, {
    filter,
  });
  return response.documents;
}

export async function insertDocument<T>(
  collection: string,
  document: T
): Promise<T> {
  return fetchFromMongoDB<T>('insertOne', collection, {
    document,
  });
}

export async function updateDocument<T>(
  collection: string,
  filter: any,
  update: Partial<T>
): Promise<T> {
  return fetchFromMongoDB<T>('updateOne', collection, {
    filter,
    update: { $set: update },
  });
}

export async function watchOrderUpdates(orderId: string, callback: (update: any) => void) {
  const checkInterval = setInterval(async () => {
    try {
      const [order] = await findDocuments('orders', { _id: orderId });
      if (order) {
        callback(order);
      }
    } catch (error) {
      console.error('Error watching order updates:', error);
    }
  }, 5000); // Check every 5 seconds

  return () => clearInterval(checkInterval);
}