const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./reactionSchema')
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            //TODO: (The user that created this thought)
            _id: Schema.Types.ObjectId,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);


//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
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
const Thought = model('Thought', thoughtSchema);


module.exports = Thought;


//Reaction (SCHEMA ONLY)

// reactionId

// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
// reactionBody

// String
// Required
// 280 character maximum
// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// Schema Settings:

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.