/**
  * @version 0.2
  * @Author Boris.Huai
  * All the AJAX URL defined here.
  */
define(['global/constants', 'global/settings'], function (constants, settings) {
  var mode = settings.getMode();
    modes = {};
  
  modes[constants.MODE_PRODUCTION] = {
    
  };
  
  modes[constants.MODE_dev] = {
    
  };
  

  var _get = function(key) {
    return settings.basePath + modes[mode][key];
  };

  return {
  };
});

