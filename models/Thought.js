// thoughtText, createdAt, username (the user that created the thought),
// and reactions (like replies)
// Create a virtual called reactionCount that retrieves the length of
// the thought's reactions array field on query.

// Reaction Schema:
// reactionId, reactionBody, username, createdAt

const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ReactionSchema = newSchema({
    reactionId:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction'
            }
        ],
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

