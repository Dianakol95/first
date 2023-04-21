const {db} = require('../connection');

async function create(collectionName, data) {
  try {
    const newProductRef = await db.collection(collectionName).doc();
    await newProductRef.set(data);
    return newProductRef.id;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function dualmatchfind(collectionName, field1, value1, field2, value2) {
  try {
    const usersRef = db.collection(collectionName);
    const querySnapshot = await usersRef
      .where(field1, '==', value1)
      .where(field2, '==', value2)
      .get();
    if (querySnapshot.empty) {
      return false;
    } else {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push({id: doc.id, ...doc.data()});
      });
      return data;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function singlematchfind(collectionName, field1, value1) {
  try {
    const usersRef = db.collection(collectionName);
    const querySnapshot = await usersRef.where(field1, '==', value1).get();
    if (querySnapshot.empty) {
      return false;
    } else {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push({id: doc.id, ...doc.data()});
      });
      return data;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function idfind(collectionName, id) {
  try {
    const userSnapshot = await db.collection(collectionName).doc(id).get();

    if (!userSnapshot.exists) {
      return false;
    }

    return {id: userSnapshot.id, ...userSnapshot.data()};
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updatex(collectionName, id, updateData) {
  try {
    await db
      .collection(collectionName)
      .doc(id)
      .update({...updateData});
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deletedata(collectionName, id) {
  try {
    await db.collection(collectionName).doc(id).delete();
    return true;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
  create,
  idfind,
  dualmatchfind,
  singlematchfind,
  updatex,
  deletedata,
};
