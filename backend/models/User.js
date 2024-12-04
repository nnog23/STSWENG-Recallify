const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	encryptedPassword: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	reviewHistory: {
		type: Map,
		of: Number,
	},
	bio: {
		type: String,
		default: "",
	},
	profileUrl: {
		type: String,
		default:
			"https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3eb826bc6e984281381bc_20.png",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
