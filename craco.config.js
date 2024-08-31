const DotEnv = require("dotenv");
DotEnv.config();

module.exports = {
	style: {
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
};
