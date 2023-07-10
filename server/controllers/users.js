import User from "../models/User.js";
import { usersarr } from "../data/index.js";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = usersarr.filter((t) => {
      return t._id === id && t;
    })[0];
    console.log(
      "sssssssssssssssssssssssssssssssssssssssss" + JSON.stringify(user)
    ); 
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = usersarr.filter((t) => {
        return t.email === email && t;
      });
      if (user === 0)
        return res.status(400).json({ msg: "User does not exist. " });

      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. " });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
