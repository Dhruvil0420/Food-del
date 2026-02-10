import mongoose from "mongoose"

const AdminModelSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase : true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin",AdminModelSchema);

export default Admin;