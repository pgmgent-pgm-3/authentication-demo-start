export const authorizeAdmin = async (req, res, next) => {
    try{
        const userRole = req;
        console.log(userRole)
        if(userRole==="admin"){
            return next();
        }
        throw new Error("You are not authorized to view this page");
    }
    catch (e) {
        console.log(e)
        return res.redirect("/");
    }
}