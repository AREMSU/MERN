// npm run seed
// creates an admin account and some sample products (only if there are none yet)

import "dotenv/config"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import connectToDb from "./src/connectToDb.js"
import User from "./src/schema/userSchema.js"
import Product from "./src/schema/productSchema.js"

const products = [
    { name: "A5 ruled notebook", price: 180, quantity: 60, category: "Stationery", description: "160 pages, ruled, stitched binding. Lies flat when open." },
    { name: "Gel pens, pack of 10", price: 250, quantity: 80, category: "Stationery", description: "0.5 mm tip, black ink, quick drying." },
    { name: "Desk organiser", price: 650, quantity: 25, category: "Stationery", description: "Wooden organiser with three compartments for pens, notes and phone." },
    { name: "Highlighters, set of 5", price: 220, quantity: 45, category: "Stationery", description: "Five pastel colours with a chisel tip." },
    { name: "Daypack 20L", price: 2400, quantity: 18, category: "Bags", description: "Water resistant daypack with a padded laptop sleeve up to 14 inches." },
    { name: "Canvas tote bag", price: 450, quantity: 40, category: "Bags", description: "Heavy cotton canvas with an inside pocket." },
    { name: "Pencil case", price: 300, quantity: 50, category: "Bags", description: "Zipped case that holds about 20 pens." },
    { name: "Steel water bottle 750ml", price: 900, quantity: 30, category: "Home", description: "Single wall stainless steel, leak proof lid." },
    { name: "Ceramic mug", price: 350, quantity: 55, category: "Home", description: "300 ml, dishwasher safe." },
    { name: "Desk lamp", price: 1800, quantity: 12, category: "Home", description: "Adjustable arm, warm white LED, USB powered." },
    { name: "USB-C cable, 1m", price: 400, quantity: 70, category: "Electronics", description: "Charging and data, braided cable." },
    { name: "Wired earphones", price: 750, quantity: 35, category: "Electronics", description: "3.5 mm jack with in-line microphone." },
    { name: "Power bank 10000 mAh", price: 2200, quantity: 0, category: "Electronics", description: "Two USB outputs, one USB-C input." },
]

await connectToDb()

const email = (process.env.ADMIN_EMAIL || "admin@store.com").toLowerCase()
const password = process.env.ADMIN_PASSWORD || "admin123"
if (!(await User.findOne({ email }))) {
    await User.create({ name: "Admin", email, password: await bcrypt.hash(password, 10), role: "admin" })
    console.log(`admin created: ${email} / ${password}`)
} else {
    console.log("admin already exists")
}

if ((await Product.countDocuments()) === 0) {
    await Product.insertMany(products)
    console.log(`added ${products.length} products`)
} else {
    console.log("products already exist, skipped")
}

await mongoose.disconnect()
