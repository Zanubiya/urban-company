const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 TESTING MONGODB CONNECTION');
console.log('===============================');
console.log(`Your IP to whitelist: 31.166.233.255`);

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 10000,
        });
        console.log('✅ MONGODB CONNECTED SUCCESSFULLY!');
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ MONGODB CONNECTION FAILED');
        console.error(`Error: ${error.message}`);
        console.log('\n🔧 FIX:');
        console.log('1. Go to https://cloud.mongodb.com/');
        console.log('2. Security → Network Access');
        console.log('3. Click "Add IP Address"');
        console.log('4. Enter: 31.166.233.255');
        console.log('5. Click Confirm');
        console.log('6. Wait 2 minutes');
        console.log('7. Run this test again');
        process.exit(1);
    }
}

testConnection();