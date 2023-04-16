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
			default: [0, 0, 0, 0,0]
		}
		,
		frequency: {
			type: [Number],
			default: [0, 0, 0, 0,0]
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
	let frq =0, check = 1;
	for(let index=0; index<5 ; index = index+1){
		// console.log(this.similarity[index])
		if (this.frequency[index] > 2 && this.frequency[index]>=frq) {
			frq = this.frequency[index];
			this.score = index + 1;
			check = 0;
			// console.log(this)
		}
	}
	if( check) {
		this.score = 0;
	}
	return next();
});

const road = mongoose.model('road', roadSchema);

module.exports = road;