// username, email, thoughts, friends
// Create a virtual called friendCount
// that retrieves the length of the user's
// friends array field on query.

const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // needs email validation still
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
        },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

/* UserSchema.virtual('friendCount').get(function() {
    return this.friend.length
}); */

const User = model('User', UserSchema);

module.exports = User;