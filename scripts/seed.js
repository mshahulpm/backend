require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')
const products = require('./products.json').map(doc => ({
    ...doc,
    _id: ObjectId(doc._id),
    ...(doc.category ? { category: ObjectId(doc.category) } : {})
}))
const categories = require('./categories.json').map(doc => ({
    ...doc,
    _id: ObjectId(doc._id),
    ...(doc.parent ? { parent: ObjectId(doc.parent) } : {})
}))
const fs = require('fs')

async function main() {

    MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, (err, data) => {
        if (err) {

            console.log(err)
        }
        db = data.db('deepnet')

        db.collection('products').insertMany(products).catch(console.log)
        db.collection('categories').insertMany(categories).then(() => data.close()).catch(console.log)
        // getDocuments(db, function (docs) {

        //     console.log('Closing connection.');
        //     data.close();

        //     // Write to file
        //     try {
        //         fs.writeFileSync('categories.json', JSON.stringify(docs));
        //         console.log('Done writing to file.');
        //     }
        //     catch (err) {
        //         console.log('Error writing to file', err)
        //     }
        // });
    })

}

main()

const getDocuments = function (db, callback) {
    const query = {};  // this is your query criteria
    db.collection("categories")
        .find(query)
        .toArray(function (err, result) {
            if (err) throw err;
            callback(result);
        });
};