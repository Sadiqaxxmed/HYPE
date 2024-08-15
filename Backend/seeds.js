const mongoose = require('mongoose');
const User = require('./models/user');
const Outfit = require('./models/outfit');
const OutfitPiece = require('./models/outfitpiece');
const Review = require('./models/review');

mongoose.connect('mongodb+srv://offsznahmed:Offszn25!@cluster0.rz5qp.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Outfit.deleteMany({});
    await OutfitPiece.deleteMany({});
    await Review.deleteMany({});
    
    // Creating test users
    const user1 = new User({
        username: 'Champagnepapi',
        profile_pic: 'https://tinyurl.com/8yp4mzej',
        bio: 'Certified Lover Boy ❤️‍🔥',
        email: 'demodrizzy@example.com',
        password: 'hashed_password1',
    });

    const user2 = new User({
        username: 'Lil Yachty',
        profile_pic: 'https://tinyurl.com/y8wezs7f',
        bio: 'CONCRETE BOYZ. ITS US 🤞🏾',
        email: 'concrete@example.com',
        password: 'hashed_password2',
    });

    await user1.save();
    await user2.save();

    // Create some outfits
    const outfit1 = new Outfit({
        user_id: user1._id,
        images: ['https://tinyurl.com/ymswjhfp'],
        description: 'Late game wear 🦉',
    });

    const outfit2 = new Outfit({
        user_id: user2._id,
        images: ['https://tinyurl.com/49469mea'],
        description: 'Coooozzy fit fr! 😴',
    });

    await outfit1.save();
    await outfit2.save();

    // Create some outfit pieces
    const piece1 = new OutfitPiece({
        user_id: user1._id,
        outfit_id: outfit1._id,
        brand_name: 'Shirts In Style',
        piece_name: 'Casual Overcoat',
        image: 'https://tinyurl.com/5n9xy2wf',
        price: '$39.99',
        link: 'https://tinyurl.com/mr5wrwpu',
    });

    const piece2 = new OutfitPiece({
        user_id: user1._id,
        outfit_id: outfit1._id,
        brand_name: 'Mnml',
        piece_name: 'Military Cargo Pants',
        image: 'https://tinyurl.com/5n7sm7xx',
        price: '$88.00',
        link: 'https://tinyurl.com/bdfuyn8x',
    });

    const piece3 = new OutfitPiece({
        user_id: user1._id,
        outfit_id: outfit1._id,
        brand_name: 'Nike',
        piece_name: 'Nike Air Force 1',
        image: 'https://tinyurl.com/3m4vd2uj',
        price: '$115.00',
        link: 'https://tinyurl.com/34v3j6ze',
    });

    const piece4 = new OutfitPiece({
        user_id: user2._id,
        outfit_id: outfit2._id,
        brand_name: 'PRIMO',
        piece_name: 'Regular fit Basic Hoodie',
        image: 'https://tinyurl.com/y8me4czc',
        price: '$100.00',
        link: 'https://tinyurl.com/y3bfvpup',
    });

    const piece5 = new OutfitPiece({
        user_id: user2._id,
        outfit_id: outfit2._id,
        brand_name: 'A&F',
        piece_name: 'Trend Rigid Denim',
        image: 'https://tinyurl.com/3y92h7ny',
        price: '$100.00',
        link: 'https://tinyurl.com/36c62hwd',
    });

    const piece6 = new OutfitPiece({
        user_id: user2._id,
        outfit_id: outfit2._id,
        brand_name: 'Timberland',
        piece_name: 'Classic Boot',
        image: 'https://tinyurl.com/2rejkr46',
        price: '$159.99',
        link: 'https://tinyurl.com/3k3eeznc',
    });

    await piece1.save();
    await piece2.save();
    await piece3.save();
    await piece4.save();
    await piece5.save();
    await piece6.save();

    // Update outfits with the pieces
    outfit1.pieces = [piece1._id, piece2._id, piece3._id];
    outfit2.pieces = [piece4._id, piece5._id, piece6._id];

    await outfit1.save();
    await outfit2.save();

    // Create some reviews
    const review1 = new Review({
        outfit_id: outfit1._id,
        user_id: user2._id,
        review: 'This is the one!',
        rating: 5,
    });

    const review2 = new Review({
        outfit_id: outfit2._id,
        user_id: user1._id,
        review: 'Nahh this supeer chill tho 😭',
        rating: 3,
    });

    await review1.save();
    await review2.save();

    console.log('Database seeded!');
    mongoose.connection.close();
});
