$(function() {
    $('.select_date').datepicker({
        format: 'mm-dd-yyyy'
    })
    .on('changeDate', function(e){
        
        var date = e.date.toJSON().split('T')[0]; // 2013-09-02 , ie will fail
        var fdate = date.replace(/\-/g, ''); // 20130902

        $('.date').text(date);
        $('.select_date').datepicker('hide');

        // get image
        update_image(fdate);
        
    });

    // day change
    $('.day_change').on('click', function(e) {
        var current_day = new Date(Date.parse($('.date').text()));
        var type = $(e.target).data('dir');
        var day_after;
        if (type === 'before') {
            day_after = +current_day - 24 * 60 * 60 * 1000;
        } else if (type === 'next') {
            day_after = +current_day + 24 * 60 * 60 * 1000;
        }
        var current_day;
        current_day = new Date(day_after).toJSON().split('T')[0];
        $('.date').text(current_day);

        var fdate = current_day.replace(/\-/g, '');
        // image
        update_image(fdate);
    });

    function update_image(fdate) {
        var all = $('#all').text().replace(/ /g,'').split('\n'); // all the image
        var baseurl = 'http://lyuehh-cat.qiniudn.com/'; //  http://lyuehh-cat.qiniudn.com/2008%2Ff08111701.jpg
        var year = fdate.substr(2, 2);
        var year4 = fdate.substr(0, 4);
        var day = fdate.substr(4, 4);
        var names = _.chain(_.range(1,10 )).map(function(i) {
            return '0' + i;
        }).value();
        var filename = year4 + "%2Ff" + year + day;
        var imgs = _.filter(all, function(i) {
            return i.indexOf(filename) !== -1;
        });

        var tpl_yes = '<% _.each(imgs, function(i, a) { %>'+
            '<div class="item <%= (a===0 ? "active": "") %>">'+
            '<img src="<%=  baseurl + i %>" />'+
            '</div>'+
            '<%  }); %>';
        var tpl_no = '<p>no image this day...</p>';
        var tpl;

        var tpl_slide = '<% _.each(imgs, function(i, a) { %>'+
            '<li data-target="#carousel-example-generic" data-slide-to="<%= a %>" class="<%= (a===0 ? "active" : "") %>">'+
            '</li>'+
            '<%  }); %>';

        if (imgs.length === 0) {
            tpl = tpl_no;
        } else {
            tpl = tpl_yes;
        }
        var html = _.template(tpl, {
            imgs: imgs,
            baseurl: baseurl
        });
        $('.carousel-inner').html(html);

        var slide_html = _.template(tpl_slide, {
            imgs: imgs
        });
        $('.carousel-indicators').html(slide_html);
    }
});