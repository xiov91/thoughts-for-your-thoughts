const { Reaction, Thought } = require('../models');

const reactionController = {
    // add reaction to thought
    addReaction({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thoughts, Head Empty (No ID match!)' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove reaction
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactionId })
            .then(deletedReaction => {
                if (!deletedReaction) {
                    return res.status(404).json({ message: 'No reaction with this id!' });
                }
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { reactions: params.reactionId } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thoughts, Head Empty (No ID match!)' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = reactionController;