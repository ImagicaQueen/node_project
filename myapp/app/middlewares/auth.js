// const jwt = require('jsonwebtoken');

// module.exports = () => (req, res, next) => {
//   let token = req.headers['x-access-token'] || req.headers.authorization;

//   if (token) {
//     jwt.verify(token, process.env.jwt_SECRET, (err) => {
//       if (err) {
//         res.status(500).json({
//           success: 0,
//           message: 'Token expired',
//         });
//         next(err);
//       }
//       next();
//     });
//   } else {
//     res.status(500).json({
//       success: 0,
//       message: 'Token not found',
//     });
//     next();
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  token = token.split(' ')[1];
  console.log(token);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({
          success: 0,
          message: 'invalid signature',
        });
        next(err);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(500).json({
      success: 0,
      message: 'Token not found',
    });
    next();
  }
};

// module.exports = (req, res, next) => {
//   let results;
//   try {
//     let token = req.headers.authorization;

// if (token) {
//   // eslint-disable-next-line prefer-destructuring
//   token = token.split(' ')[1];

//   jwt.verify(token, process.env.DB_SECRET, (err, decode) => {
//     if (err) {
//       results = result('', 0, 'invalid token', 406);
//       res.json(results);
//     } else {
//       req.userData = decode;
//       next();
//     }
//   });
// } else {
//   results = result('', 0, 'token not found', 406);
//   res.json(results);
// }
//   } catch (err) {
//     results = result('', 0, err.message);
//     res.json(results);
//   }
// };

// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   let results;
//   try {
//     let token = req.headers.authorization;

//     if (token) {
//       // eslint-disable-next-line prefer-destructuring
//       token = token.split(' ')[1];

//       jwt.verify(token, process.env.DB_SECRET, (err, decode) => {
//         if (err) {
//           // results = result('', 0, 'invalid token', 406);
//           res.json(results);
//         } else {
//           req.userData = decode;

//           next();
//         }
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: 0,
//       message: 'Token not found',
//     });
//   }
// };
