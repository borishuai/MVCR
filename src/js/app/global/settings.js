/**
  * @version 0.2
  * @Author Boris.Huai
  * Global config for the current app.
  */
define(['require', 'app/global/constants'], function (require, constants) {
  //determine which mode does the program run, prod or dev.
  var mode = constants.MODE_DEV;
  var basePath = basePath || '/';
  var homeURL = homeURL || location.host;
  var settings = {
    //this depends on the basePath value in the require config
    baseJSURL: require.toUrl(''),
    //TODO, need the backend support, for example, output the values in the YII
    basePath: basePath,
    homeURL: homeURL
  };

  settings.getMode = function() {
    return mode;
  };

  return settings;
});