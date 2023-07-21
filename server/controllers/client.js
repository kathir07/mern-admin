import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js"; 
import Transaction from "../models/Transaction.js";
import getCountryISO3 from "country-iso-2-to-3";

export const getProducts = async(req, res) => {
    try {
       const products = await Product.find()

       const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
       )

       res.status(200).json(productWithStats);

    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getCustomers = async(req, res) => {
    try {
        const customers = await User.find({ role: "user"}).select("-password");
 
        res.status(200).json(customers);
 
     } catch(error) {
         res.status(404).json({message: error.message})
     }
}

export const getTransactions = async(req, res) => {
    try {

        // sort should look like this: { "field" : "userId", "sort": "asc"} 
        const { page = 1, pageSize = 20, sort = null, search = ""} = req.query

        // formatted sort look like { "userId" : 1}
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field] : (sortParsed.sort = "asc" ? 1 : -1)
            };

            return sortFormatted
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: {$regex: new RegExp(search, "i")} }
            ],
        })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);

        const total = await Transaction.countDocuments({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }
            ],
        });

        res.status(200).json({transactions, total});

    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const getGeography = async(req, res) => {
    try {

        const users = await User.find();
        const mappedLocations = users.reduce((acc, {country}) => {
            const countryISO3 = getCountryISO3(country);
            
            if(!acc[countryISO3]) {
                acc[countryISO3] = 0
            }
            acc[countryISO3]++;

            return acc;
        }, {})

        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            return {id:country, value: count}
        })

        res.status(200).json({formattedLocations});
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}