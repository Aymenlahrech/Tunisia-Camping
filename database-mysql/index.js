const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");

// create a database connection in your application using a Sequelize instance and the config file
const connection = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

//verify your connection here !
connection.authenticate()
.then(()=>console.log("db connected"))
.catch((error)=>console.log("error on db connection",error))



//  create your table using sequilize loke: like this example manuelement mele5er

const User= connection.define("users",{
  name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role : {
    type: DataTypes.ENUM("admin","seller","client"),
    allowNull: false,
  }

})

const Product=connection.define("products",{
  name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description : {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Camping gear"
  },
  unit : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category : {
    type: DataTypes.ENUM("Tent","Sleeping bags","Camping pillow","flashlights","Camp chairs","Camp table","Lantern"),
    allowNull: false,
  },
  images : {
    type: DataTypes.JSON,
    allowNull: false,
  }
 
})

const Cart = connection.define("carts",{})

const WishList = connection.define("wishlists",{})

User.hasMany(Product)
Product.belongsTo(User)
Product.hasMany(Cart)
Product.hasMany(WishList)
User.hasOne(WishList)
User.hasOne(Cart) 

// this call, Sequelize will automatically perform an SQL query to the database and create a table, printing the message phrase table created successfully!.
// please run this below *****one time***** after creating your connection

// connection
//   .sync({ force: true })
//   .then(() => {
//     console.log("db created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create db : ", error);
//   });




module.exports={User,Product,Cart,WishList}
