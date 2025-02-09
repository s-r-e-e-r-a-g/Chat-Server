import User from "../models/userModel.js";

export const getAllUser = async (req, res) => {
    const { _id } = req.user;

    try {
        const users = await User.find({ _id: { $ne: _id } }) 
            .select("-password")

        res.json({ success: true, users });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
};
