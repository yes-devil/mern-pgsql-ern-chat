const pool = require("../db/setup")

const createUser = async (email, pass) => {
    try {
        let command = "INSERT INTO users(user_email, user_password) VALUES ($1, $2)"
        let parameters = [email, pass]
        let res = await pool.query(command, parameters)
        // console.log("New user added to db: ", res)
        return true
    } catch (error) {
        console.log("New user creation error in db : ", error)
        return false
    }
}

const createMessage = async (sender_Email, receiver_Email, given_message) => {
    try {
        let command = "INSERT INTO messages(sender, receiver, text_message) VALUES($1, $2, $3)"
        let parameters = [sender_Email, receiver_Email, given_message]
        let res = await pool.query(command, parameters)
        console.log("New message added to db : ", res)
        return true
    } catch (err) {
        console.log("New message creation error in db : ", error)
        return false
    }
}

const checkUserCredentials = async (email, pass) => {
    try {
        let command = "SELECT * FROM users WHERE user_email = $1 AND user_password = $2"
        let parameters = [email, pass]
        let res = await pool.query(command, parameters)
        // console.log(res)
        if (res.rowCount == 1) {
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        console.log("User credentials fetching error : ", err)
        return false
    }
}

// the function to fetch all chats history from the sender to the specific receiver.
const getAllChatsOfProfile = async (sender, receiver) => {
    try {
        let command = "SELECT message_id, sender, reveiver, text_message, sent_at FROM messages WHERE sender = $1 AND reveiver = $2"
        let res = await pool.query(command, [sender, receiver])
        console.log("Fetched all messages : ", res.rows)
        return { rows: res.rows, count: res.rowCount }
    } catch (error) {
        console.log("chat history fetching failed : ", error)
        return false
    }
}

// the function to fetch all chats history from the sender to the specific receiver.
const getAllChats = async (sender) => {
    try {
        let command = "SELECT message_id, sender, reveiver, text_message, sent_at FROM messages ORDER BY sent_at WHERE sender = $1"
        let res = await pool.query(command, [sender])
        // console.log("Fetched all messages : ", res.rows)
        return { rows: res.rows, count: res.rowCount }
    } catch (error) {
        console.log("chat history fetching failed : ", error)
        return false
    }
}

const getAllUsersList = async () => {
    try {
        let command = "SELECT user_email from users"
        let res = await pool.query(command)
        let users = []
        if(res.rowCount >= 1){
            users = res.rows.map(user=> user.user_email)
        }
        // console.log("users list fetched : ", users, res.rowCount)
        return { users: users, count: res.rowCount }
    } catch (error) {
        console.log("users list fetch failed : ", error)
        return false
    }
}

// getAllUsersList()
// createMessage("a@b.c", "c@b.a", "message 1")
// createMessage("a@b.c", "c@b.a", "message 2")
// createMessage("c@b.a", "a@b.c", "message 3")
// createMessage("a@b.c", "c@b.a", "message 4")
// createMessage("c@b.a", "a@b.c", "message 6")
// createMessage("c@b.a", "a@b.c", "message 5")
// createMessage("a@b.c", "c@b.a", "message 7")
// createMessage("a@b.c", "c@b.a", "message 8")
// createMessage("c@b.a", "a@b.c", "message 9")
// createMessage("a@b.c", "c@b.a", "message 10")



module.exports = {
    createUser,
    createMessage,
    checkUserCredentials,
    getAllChats,
    getAllChatsOfProfile,
    getAllUsersList
}

