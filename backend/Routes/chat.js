const {Router} = require("express")
const router = Router()
const {verifyAccessToken } = require("../util-functions/jwt-manager")
const dbMethods = require("../util-functions/db-methods")

let allRegisteredUsers = []

// first get the users list form the db
const fetchAllRegistedUsers = async ()=>{
    let allUsersList = await dbMethods.getAllUsersList() // fetch db methods
    if (allUsersList) {
        if (allUsersList.count >= 1) {
            allRegisteredUsers = allUsersList.users
        }
    }
}

fetchAllRegistedUsers()


router.get("/get-all-chats", verifyAccessToken, async (req, res)=>{
    try {
        let sender = req.user
        // let receiver = req.query.receiver
        console.log(sender, " fetching the chat history")
        let data = await dbMethods.getAllChats(sender)
        console.log(data)
        if(data.count == 0){
            res.status(404).json({message: "No chat history found."})
        }
        else{
            res.status(200).json({message: "Successfully got chat history.", chats: data.rows})
        }
    } catch (error) {
        res.status(500).json({message: "failed to fetch chat history."})
    }
})

router.get("/search-profile", verifyAccessToken, async (req,res)=>{
    let target = req.query.profile
    // first get the users list form the db
    console.log("allRegisteredUsers are : ", allRegisteredUsers)
    let resultList = allRegisteredUsers.filter(user=> user.includes(target))
    console.log(target, " fetched all users : ", resultList)
    if(resultList.length >0){
        res.status(200).json({message: "fetched user list", resultList: resultList})
    }
    else{
        res.status(404).json({message: "No user profile"})
    }
})



module.exports = router