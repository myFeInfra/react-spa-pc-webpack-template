import postcssLess from 'postcss-less';
import postcssScss from 'postcss-scss';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  syntax: {
    '.less': postcssLess,
    '.scss': postcssScss,
    '.sass': postcssScss
  },
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true
      }
    })
  ]
};