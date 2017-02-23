

var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('rented_tools', {
    tool_id : {type : String},
    rented_date: {type: String}
});

