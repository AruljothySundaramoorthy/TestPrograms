const mongoose = require("mongoose");
const { sitebusiness } = require("./mongobusiness");

try {
    module.exports = {
        connect: () => {
            try {
                mongoose.connect("mongodb://localhost:27017/radiatics");

                // const Cat = mongoose.model("Cat", { name: String });

                // const kitty = new Cat({ name: "Zildjian" });
                // kitty.save().then(() => console.log("meow"));
                // sitebusiness.savedata();
            } catch (e) {
                console.log(e);
            }
        },
    };
} catch (e) {
    console.log(e);
}
