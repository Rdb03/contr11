import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import crypto from "crypto";
import Commodity from "./models/Commodity";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['users', 'commodities'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2, user3, user4] = await User.create({
        username: 'Rdb03',
        password: '123456',
        displayName: 'Ramil Djafarov',
        phone: '+996557999890',
        token: crypto.randomUUID()
    }, {
        username: 'User',
        password: '123456',
        displayName: 'Jon Doe',
        phone: '+996557555333',
        token: crypto.randomUUID()
    }, {
        username: 'User2',
        password: '123456',
        displayName: 'Mark Black',
        phone: '+996557999999',
        token: crypto.randomUUID()
    }, {
        username: 'User3',
        password: '123456',
        displayName: 'Joseph White',
        phone: '+996557398900',
        token: crypto.randomUUID()
    });

    await Commodity.create({
        title: 'BMW M8 Competition',
        description: 'perfect condition',
        image: 'images/BMW_M8_Competition_IMG_3364.jpg',
        user: user1._id,
        price: 180000,
        category: 'car'
    }, {
        title: 'BMW S1000RR',
        description: 'perfect condition',
        image: 'images/s1000rr.jpg',
        price: 52000,
        user: user2._id,
        category: 'motorcycle'
    }, {
        title: 'American pit bull terrier puppies',
        description: 'Purebred American pit bull puppies',
        image: 'images/pitbull-puppies.jpg',
        price: 700,
        user: user3._id,
        category: 'animals'
    }, {
        title: 'A two-story house in california',
        description: 'A sleepy, expensive and quiet neighborhood',
        image: 'images/home.jpg',
        price: 3500000,
        user: user4._id,
        category: 'animals'
    });

    await db.close();
};

void run();