// async function create(product){
//     const result = await DBConnection.query(
//       `INSERT INTO products 
//       (title, description, price, quantity, image) 
//       VALUES 
//       (?, ?, ?, ?, ?)`, 
//       [
//         product.title, product.description,
//         product.price, product.quantity,
//         product.image
//       ]
//     );
  
//     let message = 'Error in creating programming language';
  
//     if (result.affectedRows) {
//       message = 'Programming language created successfully';
//     }
  
//     return {message};
//   }
  
//   module.exports = {
//     create
//   }