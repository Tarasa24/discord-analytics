function update_pop_over() {
    $('body').append('<div class="product-image-overlay"><span class="product-image-overlay-close">×</span><img src=""/></div>');
    var productImage = $('.pop-over');
    var productOverlay = $('.product-image-overlay');
    var productOverlayImage = $('.product-image-overlay img');

    productImage.click(function () {
        var productImageSource = $(this).attr('src');

        productOverlayImage.attr('src', productImageSource);
        productOverlay.fadeIn(100);
        $('body').css('overflow', 'hidden');

        $('.product-image-overlay-close').click(function () {
            productOverlay.fadeOut(100);
            $('body').css('overflow', 'auto');
        });
    });
}