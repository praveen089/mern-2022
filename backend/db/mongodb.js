import mongoose from 'mongoose';

const connect = async()=>{
    //await mongoose.connect('mongodb+srv://mongo089:mongo089@cluster0.lxk3ppj.mongodb.net/?retryWrites=true&w=majority');
    //console.log('Mongo Db connected successfully...');
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        console.log('MongoDB connected successfully...');
      });
}

export default connect;