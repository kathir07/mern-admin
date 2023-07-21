import mongoose from "mongoose"


const productStatSchema = new mongoose.Schema(
    {
        productId: String,
        yearlySalesTotal: Number,
        yearlySalesTotalSoldUnit: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnit: Number,
            }
        ],
        dailyData: [{
            date: String,
            totalSales: Number,
            totalUnit: Number,
        }],
    },
    {
        timestamps: true
    } 
);

const ProductStat = mongoose.model("ProductStat", productStatSchema);

export default ProductStat;