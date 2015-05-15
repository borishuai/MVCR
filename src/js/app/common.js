requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'lib/jquery-1.10.2.min',
    plugin: 'lib/jquery_plugin',
    underscore: 'lib/underscore-min',
    mustache: 'lib/mustache',
    model: 'app/model',
    view: 'view',
    util: 'util',
    render: 'app/render',
    global: 'global',
    controller: 'controller',
    bootstrap: 'lib/bootstrap'
  },
  shim: {
    pagination: {
      deps: ['jquery'],
      exports: 'Pagination'
    },
    underscore: {
      exports: '_'
    }
  }
});