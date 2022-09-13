/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '450px'
		},
		colors: {
			base1: '#284928',
			'-base1': '#ffffff',
			base1light: '#ECF3EC',
			'-base1light': '#000000',
			base1lighter: '#E5EEE6',
			'-base1lighter': '#2D762B',
			base2: '#ffffff',
			'-base2': '#000000',
			accent1: '#2D762B',
			danger: '#D20000',
			'-danger': '#ffffff'
		},
		extend: {
			backgroundImage: {
				'bg-logo': 'url(/bg-s-logo.svg)',
				'bg-card': 'url(/attachments.svg)'
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				cairo: ['Cairo', 'sans-serif']
			}
		}
	},
	plugins: []
};
