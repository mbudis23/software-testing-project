const admin = require("../../configs/firebaseConfig");
const User = require("../models/User");

const isValidNpwp = (npwp) => /^[0-9]{16}$/.test(npwp);

const getUserByNpwp = async (req, res) => {
    const { npwp } = req.params;

    if (!isValidNpwp(npwp)) {
        return res.status(400).json({ error: "Invalid NPWP format" });
    }

    try {
        const userRef = admin.database().ref(`users/${npwp}`);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists()) {
        return res.status(404).json({ error: "NPWP not found" });
        }

        const userData = userSnapshot.val();
        const user = new User(userData.name, npwp);

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving user data" });
    }
};

module.exports = { getUserByNpwp };