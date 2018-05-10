/*
 *
 *  * The MIT License
 *  *
 *  * Copyright (c) 2015-2016 by Jim Liu
 *  *
 *  * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  * of this software and associated documentation files (the "Software"), to deal
 *  * in the Software without restriction, including without limitation the rights
 *  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  * copies of the Software, and to permit persons to whom the Software is
 *  * furnished to do so, subject to the following conditions:
 *  *
 *  * The above copyright notice and this permission notice shall be included in
 *  * all copies or substantial portions of the Software.
 *  *
 *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  * THE SOFTWARE.
 *
 */

/**
 * Created by jim on 2016Äê8ÔÂ9ÈÕ,0009.
 */
(function () {
    var ele = $('.pictures .body')[0];
    new Hammer(ele, {
        domEvents: true
    });
    var currentPage = 1;
    var imgPageSize = 4;
    var imgs = $('.pictures .swipe');
    var pages = $('.pictures .page-num');
    var allPages = imgs.length;
    var pageCount = 0;

    var imgIndexes = getImgIndexes(imgs);

    function getPageCount() {
        if (allPages % imgPageSize === 0) {
            pageCount = allPages / imgPageSize;
        } else {
            pageCount = Math.floor(allPages / imgPageSize) + 1;
        }

        return pageCount;
    }

    function renderPagination() {
        var pageCount = getPageCount();
        var html = '';
        for (var i = 0; i < pageCount; i++) {
            html += '<span class="page-num icon icon-radio-checked pagination-inactive"></span>';
        }
        $('.pagination').html(html).children('.page-num').addClass('icon-radio-unchecked').addClass('pagination-inactive');
        var firstPageNumber = $('.pagination').children('.page-num').get(0);
        $(firstPageNumber).removeClass('pagination-inactive').removeClass('icon-radio-unchecked').addClass('icon-radio-checked').addClass('pagination-active');
        pages = $('.pictures .page-num');
    }

    function getImgIndexes(images) {
        var imgIndexes = [];
        $.each(images, function (i, img) {
            imgIndexes.push($(img).attr('imageIndex'));
        });

        return imgIndexes;
    }

    var getCurrentPage = function () {
        var currentImgFirstIndex = $('.pictures .swipe.swipe-active').first(1).attr('imageIndex').toNumber();
        if (currentImgFirstIndex === 0) {
            currentPage = 1;
        } else if (currentImgFirstIndex === 4) {
            currentPage = 2;
        } else if (currentImgFirstIndex === 8) {
            currentPage = 3;
        }
    };

    var getCurrentImgIndexes = function () {
        var currentImgFirstIndex = $('.pictures .swipe.swipe-active').first(1).attr('imageIndex').toNumber();
        return imgIndexes.from(currentImgFirstIndex).first(imgPageSize);
    };
    var getNextImgIndexes = function () {
        var currentImgLastIndex = getCurrentImgIndexes().last(1)[0].toNumber();
        if (currentImgLastIndex + 1 === imgs.length) {
            return imgIndexes.from(0).first(imgPageSize);
        } else {
            return imgIndexes.from(currentImgLastIndex + 1).first(imgPageSize);
        }
    };
    var getPrevImgIndexes = function () {
        var currentImgFirstIndex = getCurrentImgIndexes().first(1)[0].toNumber();
        if (currentImgFirstIndex === 0) {
            return imgIndexes.from(imgPageSize).last(imgPageSize);
        } else {
            return imgIndexes.from(currentImgFirstIndex - imgPageSize).first(imgPageSize);
        }
    };

    $(document).on('swipeleft', '.pictures .body', function (e) {
        var currentIndexes = getNextImgIndexes();
        $.each(imgs, function (i, img) {
            var index = $(img).attr('imageIndex');
            if (currentIndexes.findIndex(index) > -1) {
                $(img).removeClass('swipe-inactive').addClass('swipe-active');
            } else {
                $(img).removeClass('swipe-active').addClass('swipe-inactive');
            }
        });

        getCurrentPage();
        $(pages)
            .removeClass('pagination-active')
            .addClass('pagination-inactive')
            .removeClass('icon-radio-checked')
            .addClass('icon-radio-unchecked');
        $(pages).eq(currentPage - 1)
            .removeClass('icon-radio-unchecked')
            .addClass('icon-radio-checked')
            .removeClass('pagination-inactive')
            .addClass('pagination-active');


    });
    $(document).on('swiperight', '.pictures .body', function (e) {
        var currentIndexes = getPrevImgIndexes();
        $.each(imgs, function (i, img) {
            var index = $(img).attr('imageIndex');
            if (currentIndexes.findIndex(index) > -1) {
                $(img).removeClass('swipe-inactive').addClass('swipe-active');
            } else {
                $(img).removeClass('swipe-active').addClass('swipe-inactive');
            }
        });

        getCurrentPage();
        pages
            .removeClass('pagination-active')
            .addClass('pagination-inactive')
            .removeClass('icon-radio-checked')
            .addClass('icon-radio-unchecked');
        pages.eq(currentPage - 1)
            .removeClass('icon-radio-unchecked')
            .addClass('icon-radio-checked')
            .removeClass('pagination-inactive')
            .addClass('pagination-active');
    });

    renderPagination();
})();