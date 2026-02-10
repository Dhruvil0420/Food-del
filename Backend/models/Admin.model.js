import mongoos from "mongoose"

const AdimModelSchem = new mongoos.Schema({
    name:{
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Admin = mongoos.