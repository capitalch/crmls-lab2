<<<<<<< HEAD
module.exports = {
  style: {
      postcss: {
          plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
          ],
      },
  },
}
=======
const DotEnv = require("dotenv");
DotEnv.config();

module.exports = {
	style: {
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
};
>>>>>>> dev-1
