const blockDemoMiddelware = async(req,res,next) => {
    const role = req.role;
    if(role === "demo"){
        return res.json({
            success: false,
            message: "Demo users cannot modify data"
        });
    }
    next();
};

export default blockDemoMiddelware;