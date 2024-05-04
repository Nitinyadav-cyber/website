$("#simpleform").on("submit", function (event) {
    $('#savebtnid').html('<span class="spinner-border"></span> Please Wait...');
    $("#msgprint").html('');
    var $this = $(this);
    var frmValues = $this.serialize();
    $.ajax({
        type: $this.attr('method'),
        url: $this.attr('action'),
        data: frmValues
    })
        .done(function (data) {
            var dataar = data.split(',');
            if (dataar[0] == "1") {
                $('#savebtnid').html('<span class="spinner-border"></span> Login Success! Please Wait For Navigation');
                if (dataar[1] == "1" || dataar[1] == "4") {
                    location.href = "/salesnayak";
                }
                else {
                    location.href = "/salesnayak/OEMIndex";
                }
            }
            else if (dataar[0] == "OTP") {
                $('#savebtnid').html('<button class="btn btn-primary form-control">Verfiy OTP</button>');
                $('.Prelogin').hide();
                $('#OTPDIV').show();
                $("#msgprint").html('<div  class="text-primary" style="margin-top:5px;">' + dataar[1] + '</div>');
            }
            else if (dataar[0] == "OTPF") {
                $('#savebtnid').html('<button class="btn btn-primary form-control">Verfiy OTP</button>');
                $("#msgprint").html('<h6 class="text-danger">Invalid OTP! Please enter valid otp for login.</h6>');
            }
            else if (dataar[0] == "-1") {
                $('#savebtnid').html('<button class="btn btn-primary form-control">Log In</button>');
                $("#msgprint").html('<h6 class="text-danger">Oops! Unable to login due to licence expire.</h6>');
            }
            else if (dataar[0] == "0") {
                $('#savebtnid').html('<button class="btn btn-primary  form-control">Log In</button>');
                $("#msgprint").html('<h6 class="text-danger">Oops! Unable to login. Inavlid login id and password</h6>');
            }
            else if (dataar[0] == "2") {
                $('#savebtnid').html('<button class="btn btn-primary  form-control">Log In</button>');
                $("#msgprint").html('<h6 class="text-danger">Oops! Unable to login. Your account is not active</h6>');
            }
            else if (dataar[0] == "3") {
                $('#savebtnid').html('<button class="btn btn-primary  form-control">Log In</button>');
                $("#msgprint").html('<h6 class="text-danger">Oops! Unable to login. Invalid Company Code</h6>');
            }
            else if (dataar[0] == "4") {
                $('#savebtnid').html('<button type="submit" class="btn btn-primary  form-control">Login</button>');
                $("#msgprint").html('<h6 class="text-danger">Oops! Unable to login. Invalid IP Address</h6>');
            }
            else {
                $('#savebtnid').html('<button class="btn btn-primary  form-control">Log In</button>');
                $("#msgprint").html('<h6 class="text-danger">Oops! Unable to login. ' + dataar[1] + '</h6>');
            }
        })
        .fail(function (data) {
            $('#savebtnid').html('<button class="btn btn-primary  form-control">Log In</button>');
            $("#msgprint").html(data['responseText']);
        });
    event.preventDefault();
});