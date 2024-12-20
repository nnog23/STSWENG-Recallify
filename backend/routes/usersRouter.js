const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const usersRouter = require("express").Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // It is recommended to use an environment variable

// Signup Route
usersRouter.post("/signup", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		// Check if the username or email already exists
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res
				.status(400)
				.json({ error: "Username or email already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
        
		// Create a new user
		const newUser = new User({
			username,
			email,
			encryptedPassword: hashedPassword,
		});
		await newUser.save();

        const token = jwt.sign(
			{ userId: newUser._id, username: newUser.username },
			JWT_SECRET,
			{ expiresIn: "1h" } // Token will expire in 1 hour
		);

        const userId = newUser._id;

		// Send response
		res.status(201).json({ message: "User created successfully", token, userId});
	} catch (err) {
		console.error("Error during signup:", err);
		res.status(500).json({ error: "Server error during signup" });
	}
});

// Login Route
usersRouter.post("/login", async (req, res) => {

    console.log('Headers for /login:', req.headers);
    
	const { email, password } = req.body;

	try {
		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Compare the password with the hashed password
		const isMatch = await bcrypt.compare(password, user.encryptedPassword);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user._id, username: user.username },
			JWT_SECRET,
			{ expiresIn: "1h" } // Token will expire in 1 hour
		);

		const userId = user._id;

		// Send response with the JWT token
		res.status(200).json({ message: "Login successful", token, userId });
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).json({ error: "Server error during login" });
	}
});

// Logout Route (since JWT is stateless, no need for session destroy)
usersRouter.get("/logout", (req, res) => {
	res.status(200).json({ message: "Logged out successfully" });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
	console.log("Request Headers:", req.headers);
	const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token from the Authorization header

	if (!token) {
		return res.status(403).json({ error: "Access denied" });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: "Invalid or expired token" });
		}
		req.user = decoded; // Attach user data to the request
		next();
	});
};

usersRouter.get("/users/:userId/profile", verifyToken, async (req, res) => {
	const { userId } = req.params;

	console.log(userId);
	console.log(req.headers["authorization"]);
	try {
		// Fetch the user by their ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Send the user data (username, email, profilePicture)

		res.status(200).json({
			id: user._id,
			username: user.username,
			email: user.email,
			profilePicture: user.profilePicture || null,
			bio: user.bio,
			profileUrl: user.profileUrl,
		});
	} catch (err) {
		console.error("Error fetching user profile:", err);
		res.status(500).json({ error: "Server error while fetching user profile" });
	}
});

usersRouter.put("/users/:userId/profile/picture", verifyToken, async (req, res) => {
	const { userId } = req.params;
	const { profileUrl } = req.body;  // Assuming the URL is passed in the request body

	console.log(userId);

	// Validate that the profilePicture is provided
	if (!profileUrl) {
		return res.status(400).json({ error: "Profile picture URL is required" });
	}

	try {
		// Fetch the user by their ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update the profilePicture field
		user.profileUrl = profileUrl;

		// Save the updated user to the database
		await user.save();

		// Send the updated user data as a response
		res.status(200).json({ message: "Profile picture updated successfully", user });
	} catch (err) {
		console.error("Error updating user profile:", err);
		res.status(500).json({ error: "Server error while updating user profile" });
	}
});

usersRouter.put("/users/:userId/bio", verifyToken, async (req, res) => {
	const { userId } = req.params;
	const { bio } = req.body;  // Assuming the URL is passed in the request body

	console.log(userId);

	// Validate that the profilePicture is provided
	if (!bio) {
		return res.status(400).json({ error: "Profile picture URL is required" });
	}

	try {
		// Fetch the user by their ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update the profilePicture field
		user.bio = bio;

		// Save the updated user to the database
		await user.save();

		// Send the updated user data as a response
		res.status(200).json({ message: "Profile bio updated successfully", user });
	} catch (err) {
		console.error("Error updating user profile:", err);
		res.status(500).json({ error: "Server error while updating user profile" });
	}
});


module.exports = usersRouter;
