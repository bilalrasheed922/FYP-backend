const userModel = require("./User");
const key = "FYP-Project-2021F";
const encryptor = require("simple-encryptor")(key);

const generateUniqueTag = async () => {
   let isUnique = false;
   let newTag;

   while (!isUnique) {
       newTag = `#${Math.floor(100000 + Math.random() * 900000)}`; // Generate a 6-digit number with "#"
       const existingUser = await userModel.findOne({ tag: newTag });

       if (!existingUser) {
           isUnique = true;
       }
   }

   return newTag;
};

module.exports.createUserDBService = async (userDetails) => {
    try {
      const uniqueTag = await generateUniqueTag();
        const userModelData = new userModel({
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            email: userDetails.email,
            password: encryptor.encrypt(userDetails.password),
            tag: uniqueTag,
        });

        await userModelData.save(); 
        return { success: true, msg: "User Created Successfully", tag: uniqueTag };
    } catch (error) {
        console.error("Error saving user:", error);
        return false;
    }
};

module.exports.loginuserDBService = async (employeeDetails) => {
    try {
        const result = await userModel.findOne({ email: employeeDetails.email });

        if (!result) {
            return { status: false, msg: "Invalid Employee Details" };
        }

        const decrypted = encryptor.decrypt(result.password);
        if (decrypted === employeeDetails.password) {
            return { status: true, msg: "Employee Validated Successfully" };
        } else {
            return { status: false, msg: "Employee Validation Failed" };
        }
    } catch (error) {
        console.error("Error during login:", error);
        return { status: false, msg: "Invalid Data" };
    }
};
