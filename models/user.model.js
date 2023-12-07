const bcrypt = require('bcryptjs');
const db = require('../data/database');


class User {
    constructor(email, password, fullname, street, postal, city){
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    getUserwithSameEmail(){
        return db.getDb().collection('users').findOne({email: this.email});
    }

    async existsAlready(){
       const existingUser = await this.getUserwithSameEmail();
       if (existingUser){
        return true;
       }
       return false;
    }
    // here we are passing constructor values through insertOne
    async signup(){
        const hashedPassword = await bcrypt.hash(this.password, 12);
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        });
    }
    hasMatchingPassword(hashedPassword){
       return bcrypt.compare(this.password, hashedPassword);
    }

}

module.exports = User;