(function($) {
  var $this, formObj = {}, formFlag = false;
  $.fn.validateElement = function() {
    var $ele = this;
  };
  
  $.fn.getFormFlag = function() {
    return formFlag;
  };
  
  $.fn.formValidate = function(obj, submitTag) {
    var $form = this;
    var tag = submitTag || false;
    formObj = obj;
    $validateElements = $form.find(':input');
    $.each($validateElements, function(key, value) {
      var $val = $(value);
      if ($val.attr('required')) {
        _bindElementActions($val);
      }
    });
    
    $form.find('.js-form-submit').click(function() {
      _avoidSubmit($(this))
      result = true;
      $.each($validateElements, function(key, value) {
        var $val = $(value);
        if ($val.attr('required')) {
          result = _validateElement($val) && _validationExtended($val) && result;
        }
      });
      
      if (formObj) {
        for (var i in formObj.submit) {
          result = formObj.submit[i]() && result;
        }
      }
      
      if (result) {
        $form.submit();
      }
    });
  }
  
  function _validateForm($elements) {
    result = true;
    $.each($elements, function(key, value) {
      var $val = $(value);
      if ($val.attr('required')) {
        result = _validateElement($val) && _validationExtended($val) && result;
      }
    });
    
    if (formObj) {
      for (var i in formObj.submit) {
        result = formObj.submit[i]() && result;
      }
    }
    _submitForm();
  }
  
  function _submitForm() {
    if (result) {
      $form.submit();
    }
  }
  
  function _validationExtended ($val) {
    if (formObj && formObj.blur && formObj.blur[$val.attr('name')]) {
       return formObj.blur[$val.attr('name')]($val.val()) &&
              _manageTip($val.closest('.js-validate-element'), '.js-item-success');
    } else {
      return true;
    }
  }
  
  function _avoidSubmit($ele) {
    //prop failed
    $ele.attr('disabled', true);
    setTimeout(function() {
      $ele.removeAttr('disabled');
    }, 3000);
  }
  
  function _bindElementActions($val) {
    $val.focus(_showTip).focusout(_prevalidateElement);
  }
  
  function _prevalidateElement () {
    return _validateElement($(this)) && _validationExtended($(this));
  }
  
  function _showTip() {
    $(this).closest('.js-validate-element')
    .find('.js-item-tip')
    .show()
    .siblings('span')
    .hide();
  }
  
  function _applyArrayList(arr, $ele) {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (!arr[i]($ele)) {
        return false;
      }
    }
    
    return true;
  }
  
  function _validateElement($ele) {
    var eleArray = [];
    $ele.data('length') ? eleArray.push(_validateLength) : null;
    $ele.data('regx') ? eleArray.push(_validateRegx) : null;
    $ele.data('ajax') ? eleArray.push(_validateAjax) : null;
    
    var $elePar = $ele.closest('.js-validate-element');
    if ($ele.val()) {
      if (!eleArray.length) {
        _manageTip($elePar, '.js-item-success');

        return true;
      } else {
        return _applyArrayList(eleArray, $ele);
      }
    } else {
      return _showErrorMessage($ele, 'nullerror');
    }
  }
  
  function _validateLength($ele) {
    var lengArr = $ele.data('length').split(',');
    var min = lengArr[0] || 0, max = lengArr[1] || 255;
    if (min < max) {
      var middleNum = max;
      max = min;
      min = middleNum;
    }
    if ($ele.val().length >= min && $ele.val().length <= max) {
      return true;
    } else {
      return _showErrorMessage($ele, 'lengtherror');
    }
  }
  
  function _showErrorMessage($ele, errorTag) {
    var $elePar = $ele.closest('.js-validate-element');
    var $errEle = $elePar.find('.js-item-error');
    $errEle.html($errEle.data(errorTag))
    .show()
    .siblings('span')
    .hide();
    
    return false;
  }
  
  function _validateRegx($ele) {
    var $elePar = $ele.closest('.js-validate-element');
    var regx = new RegExp($ele.data('regx'));
    var $errEle = $elePar.find('.js-item-error');
    
    if (regx.test($ele.val())) {
      return true;
    } else {
      return _showErrorMessage($ele, 'error');
    }
  }
  
  function _validateAjax($ele) {
    var params = {}
    params[$ele.attr('name')] = $ele.val();
    var flag = true;
    var $elePar = $ele.closest('.js-validate-element');
    $.ajax({
      url: basePath + $ele.data('ajax'),
      type: 'post',
      data: params,
      dataType: 'json',
      async: false,
      success: function(response) {
      if ('success' === response.status) {
        flag = _manageTip($elePar, '.js-item-success');
      } else {
        flag = _showErrorMessage($ele, 'ajaxerror');
      }
      }}
    );
    
    return flag;
  }
  
  function _manageTip($ele, selector) {
    $ele.find(selector)
    .show()
    .siblings('span')
    .hide();
    
    return true;
  }
}
)(jQuery);