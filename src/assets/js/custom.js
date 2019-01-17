$(document).ready(function () {
    $('#search-item').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var url = $('#contextPath').val() + "/product/autocomplete?query=" + $('#search-item').val();
            $.ajax({
                url: url,
                success: function (value) {
                    var $product = $('#product-content');
                    $product.html('');
                    if (value.status === 200) {
                        $.each(value.data, function (i, item) {
                            $product.append('<div class="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0 items-display" data-aos="fade" data-aos-delay="">' +
                                '<a class="block-2-item" href="${pageContext.request.contextPath}/product/detail/' + item.id + '">' +
                                '<figure class="image">' +
                                '<img src="' + $('#contextPath').val() + '/resources/images/children.jpg" alt="" class="img-fluid">' +
                                '</figure>' +
                                '<div class="text">' +
                                '<span class="text-uppercase">' + item.productName + '</span>' +
                                '<h3>' + item.categoryName + '</h3>' +
                                '</div>' +
                                '</a>' +
                                '</div>');
                        });
                    } else {
                        toastr.error(value.message);
                    }
                }
            });
        }
    });


});

function login() {
    $form = $('#loginForm');
    if (!$form.valid()) return false;
    $loginMsg = $('#loginMsg')
    $.ajax({
        url: $('#contextPath').val() + "/j_spring_security_check",
        data: {j_username: $('#username').val(), j_password: $('#pswd').val()},
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Ajax-call",
                "true");
        },
        success: function (result) {
            var json = JSON.parse(result);
            if (json.status === 200) {
                status = true;
                $loginMsg.css("display", "none");
                $('#loginModal').remove();
                $('.modal-backdrop').remove();
                toastr.success("Login Successful.");
            } else {
                // $('#myModal').effect("shake");
                $loginMsg.css({
                    "display": "block",
                    "color": "rgb(255, 64, 55)",
                    "background - color": "#FFBABA"
                });
                $loginMsg.html(
                    "Username and Password do not match.");
                status = false;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            // $('#myModal').effect("shake");
            $loginMsg.css({
                "display": "block",
                "color": "#D8000C",
                "background - color": "#FFBABA",
                "font-weight": "bold"
            });

            $loginMsg.html("Something went wrong while signing in.");
            status = false;
        }

    });
}

function registerUser() {
    var $form = $('#registerForm');
    if (!$form.validate({
        rules: {
            registerUserName: {
                required: true,
                email: true
            },
            registerPassword: {
                required: true,
                minlength: 6
            },
            registerConfirmPassword: {
                required: true,
                minlength: 6,
                equalTo: "#registerPassword"
            },
            registerFirstName: {
                required: true
            },
            registerLastName: {
                required: true
            },
            registerPhoneNo: {
                required: true,
                maxlength: 15
            },
            registerAddress: {
                required: true
            },
            registerAlias: {
                required: true
            },
            registerCountry: {
                required: true
            },
            registerState: {
                required: true
            },
            registerCity: {
                required: true
            },
            registerPostCode: {
                required: true
            }
        }
    })) {
        return false;
    } else {
        var $data = $form.serializeJSON();
        $.ajax({
            beforeSend: function () {
                $.LoadingOverlay("show")
            }, complete: function () {
                $.LoadingOverlay("hide");
            },
            url: $('#contextPath').val() + "/user/register",
            data: $data,
            type: "POST",
            dataType: 'json',
            success: function (result) {
                console.log("THe result is " + result);
                //var json = JSON.parse(result);
                if (result.status === 200) {
                    $('#registerModal').remove();
                    $('.modal-backdrop').remove();
                    toastr.success("Registration Successful.");
                } else {
                    // $('#myModal').effect("shake");
                    $('#registerModal').remove();
                    $('.modal-backdrop').remove();
                    toast.error("Error registering user. Please try again later");
                }
                return false;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toastr.error("Error registering user.");
                $('#registerModal').remove();
                $('.modal-backdrop').remove();
                return false;
            }
        });
    }


}

function buyProduct() {
    jQuery.ajax({
        url: $('#contextPath').val() + "/cart/buy",
        type: "GET",
        success: function (result) {
            if (result.status == 200) {
                toastr.success(result.message);
                window.location = $('#contextPath').val()
            } else {
                toastr.error(result.message);
            }

        }, error: function () {
            toastr.error("Error removing item from the basket. Please try again.");
        }
    });
}

function removeItemFromCart(itemId) {
    jQuery.ajax({
        url: $('#contextPath').val() + "/cart/removeItem/" + itemId,
        type: "GET",
        success: function (result) {
            location.reload();
        }, error: function () {
            toastr.error("Error removing item from the basket. Please try again.");
        }
    });
}

function addToCart() {
    jQuery.ajax({
        url: $('#contextPath').val() + "/cart/add/" + $('#prod-id').val() + "/" + $('#prod-qty').val(),
        type: "GET",
        success: function (result) {
            location.reload();
        }, error: function () {
            toastr.error("Error adding item to the basket. Please try again.");
        }
    });

}