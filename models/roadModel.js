const mongoose = require('mongoose');

const roadSchema = new mongoose.Schema(
	{
		location: {
			type: {
				type: String,
				default: 'Point',
				enum: ['Point'],
				required: [true, 'Please provide a location']
			},
			coordinates: [Number],

		},
		similarity: {
			type: [Number],
			default: [0, 0, 0, 0]
		}
		,
		frequency: {
			type: [Number],
			default: [0, 0, 0, 0]
		}
		,
		score: {
			type: Number,
			default: 0
		}
	}
)

roadSchema.index({ location: '2dsphere' });

roadSchema.pre('save', function (next) {
	for(const index in this.similarity ){
		// console.log(this.similarity[index])
		if (this.similarity[index] >= 0.3 && this.frequency[index] > 2) {
			this.score = index + 1;
			// console.log(this)
			return next();
		}
	}
	this.score = 0;
	next();
});

const road = mongoose.model('road', roadSchema);

module.exports = road;