const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// ✅ Define the Schema (MUST BE SAME as in `server.js`)
const SchemeSchema = new mongoose.Schema({
    scheme_name: String,
    description: String,
    read_more_link: String
});

const Scheme = mongoose.model("Scheme", SchemeSchema);

// ✅ Function to Delete Empty Entries
async function deleteEmptyEntries() {
    try {
        const result = await Scheme.deleteMany({ scheme_name: { $exists: false } });
        console.log(`✅ Deleted ${result.deletedCount} empty entries.`);
    } catch (error) {
        console.error("❌ Error deleting empty entries:", error.message);
    } finally {
        mongoose.connection.close();
    }
}

// ✅ Run Cleanup Function
deleteEmptyEntries();
