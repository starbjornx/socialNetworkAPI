const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/]

        },
        friends:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],

        thoughts:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',
                },
            ],
    },
    {

        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `fullName` that gets and sets the user's full name

//TODO: instead of a userSchema for 'fullName' change it to 'friendCount' that retrieves the length of the user's friends array field on query.
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.first} ${this.last}`;
    })
    // Setter to set the first and last name
    .set(function (v) {
        const first = v.split(' ')[0];
        const last = v.split(' ')[1];
        this.set({ first, last });
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
