(function ($) {
  'use strict';
  $(function () {
    var CARD_ID = 0;
    var loacal_storage = localStorage;
    for (var i = 0, len = loacal_storage.length; i < len; i++) {
      var key = loacal_storage.key(i);
      var data = JSON.parse(loacal_storage.getItem(key));
      disp_data(data);
    }

    $('#regist_button').on('click', function () {
      var regist_url = $('#regist_url').val();

      if (loacal_storage.getItem(regist_url)) {
        console.log('すでに登録済み');
        return false;
      }

      $.ajax({ 
        url: 'http://api.hitonobetsu.com/ogp/analysis', 
        data: 'url=' + regist_url,
        dataType: 'jsonp',
        jsonp:'callback',
      }).done(function(data) {
        loacal_storage.setItem(regist_url, JSON.stringify(data));
        disp_data(data);
      });
    });

    function disp_data (data) {
      var open_tag = '<div id="card' + CARD_ID + '" class="card"><a target="brank" href="' + data.url + '">',
        close_tag = '</a></div>',
        img_url = data.image || data['image:url'];
      if (img_url) {
        $(open_tag + close_tag).appendTo('#left_col');
        $('#card' + CARD_ID).css('background', 'url(' + img_url + ')').css('background-size', 'cover');
        $('#card' + CARD_ID).funcResizeBox({});
        CARD_ID++;
        return;
      } 
      $(open_tag + '<p class="card_p">' + data.title + '</p>' + close_tag).appendTo('#left_col');
      $('#card' + CARD_ID).funcResizeBox({});
      CARD_ID++;
      return;
    }
    $('.card').draggable({containment: '.maincol'});
  });
}(jQuery));


