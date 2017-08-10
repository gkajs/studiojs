import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
const license = require('rollup-plugin-license');
let pkg = require('./package.json');

const ENV = process.env.npm_lifecycle_event;

let licensePlugin = license({
  banner: " "+ pkg.name +" v"+ pkg.version +" By "+ pkg.author +" \r\n HomePage: "+ pkg.homepage +"\r\n "+ pkg.license +" Licensed."
});

let config = {
  entry: 'src/studiojs.js',
  format:'umd',
  moduleName:'studiojs',
  plugins: [
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano(),
      ],
      extensions: [ '.css' ],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel(babelrc()),
    commonjs(),
  ],
};

config.plugins.push(licensePlugin);
if(ENV === 'dist') {
  config.plugins.push(uglify());
  config.dest = 'dist/studiojs.min.js';
} else if(ENV==='dev') {
  config.dest = 'dist/studiojs.min.js'; // studiojs
} else {
  // config.entry = 'example/'+ENV+'/index.js';
  // config.dest = 'example/'+ENV+'/main.js';
}

export default config