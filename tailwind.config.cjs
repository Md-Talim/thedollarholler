/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    boxShadow: {
      tableRow: '0px 0px 6px rgba(0, 0, 0, 0.16)'
    },
    fontFamily: {
      sansSerif: ['Source Sans Pro'],
      mono: ['Source Code Pro'],
      handwriting: ['Kalam', 'cursive']
    },
    extend: {
      boxShadow: {
        colored: '0px 7px 16px rgba(127, 91, 220, 0.002)',
        coloredHover: '0px 16px 25px rgba(127, 91, 220, 0.3)'
      },
      backgroundImage: {
        circle: "url('/images/circle.svg')"
      },
      colors: {
        lavenderIndigo: '#8657e1',
        daisyBush: '#4714a5',
        goldenFizz: '#feff40',
        whisper: '#f9f4f9',
        pastelPurple: '#b2a1bb',
        purple: '#7209b7',
        robinEggBlue: '#00e9c0',
        blueGem: '#3813a0',
        caribbeanGreen: '#1CC6A0',
        scarlet: '#f72f45',
        monsoon: '#777878',
        silver: '#c0c0c0',
        gallery: '#efeaf2',
        fog: '#decaec'
      },
      zIndex: {
        navBarToggle: 91,
        navBar: 90
      },
      gridTemplateColumns: {
        invoiceTable: '100px 100px 100px 1fr 100px 32px 32px'
      }
    }
  },
  plugins: []
};
