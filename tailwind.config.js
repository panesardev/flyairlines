/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
      },
    },
  },
  daisyui: {
    themes: [
      {
        'flyairlines': {
           'primary' : '#43669d',
           'primary-focus' : '#567cb8',
           'primary-content' : '#ffffff',

           'secondary' : '#f97316',
           'secondary-focus' : '#fb923c',
           'secondary-content' : '#ffffff',

           'accent' : '#eeaf3a',
           'accent-focus' : '#e09915',
           'accent-content' : '#ffffff',

           'neutral' : '#261230',
           'neutral-focus' : '#200f29',
           'neutral-content' : '#ffffff',

           'base-100' : '#f0f6ff',
           'base-200' : '#ffffff',
           'base-300' : '#ffffff',
           'base-content' : '#261230',

           'info' : '#1c92f2',
           'success' : '#09c38b',
           'warning' : '#ff9900',
           'error' : '#ef4444',

          '--rounded-box': '1rem',          
          '--rounded-btn': '0.5rem',        
          '--rounded-badge': '1.9rem',      

          '--animation-btn': '.25s',       
          '--animation-input': '.2s',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '.5rem',      
          '--border-btn': '1px',            
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}