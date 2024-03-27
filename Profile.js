const { MongoClient, ObjectID } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'your_database_name';

// Connect to the MongoDB server
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);

  // Function to retrieve customer profile including buying history
  const getCustomerProfile = (customerId) => {
    db.collection('customers').findOne({ _id: ObjectID(customerId) }, (err, customer) => {
      if (err) {
        console.error('Error occurred while fetching customer profile:', err);
        return;
      }

      if (!customer) {
        console.log('Customer not found');
        return;
      }

      console.log('Customer Profile:');
      console.log('Name:', customer.name);
      console.log('Email:', customer.email);
      console.log('Address:', customer.address);
      console.log('Phone:', customer.phone);
      console.log('Buying History:');
      customer.orders.forEach((order, index) => {
        console.log(`Order ${index + 1}:`);
        console.log('Date:', order.date);
        console.log('Items:', order.items);
        console.log('Total:', order.total);
        console.log('-------------------');
      });

      client.close();
    });
  };

  // Call the function with the customer ID
  const customerId = 'customer_id_here'; // Replace with the actual customer ID
  getCustomerProfile(customerId);
});
