
(function( $ ) {
    // SETTINGS:
    var pluginName = "emailMandrill",
        defaults = {
            mandrillKey: '',
            labelAttribute: 'data-name',
            submitSelector: 'input[type="submit"]',
            success: function () {
                $('body').removeClass('mandrill-waiting');
                $('body').addClass('mandrill-success');
                console.log('Message sent!');
            },
            wait: function () {
                $('body').removeClass('mandrill-error');
                $('body').removeClass('mandrill-success');
                $('body').addClass('mandrill-waiting');
            },
            error: function (errors) {
                $('body').removeClass('mandrill-waiting');
                $('body').addClass('mandrill-error');
                if (errors.length > 1) {
                    console.log(errors.length + ' messages could not be sent, reasons: ' + errors);
                } else {
                    console.log(errors.length + ' message could not be sent, reason: ' + errors);
                }
            },
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options);
        this.temp = {
            errors: [],
            total: 0
        };

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var that = this;

            that.mandrill = new mandrill.Mandrill(that.options.mandrillKey);

            // Skip init if the parent is not a form.
            if ($(this.element)[0].nodeName != 'FORM') {
                console.log(pluginName + ' can not handle ' + $(this.element)[0].nodeName + '. Use a FORM instead.');
                return false;
            }

            $(this.element).submit(function (e) {
                e.preventDefault();
                // reset errors:
                that.temp.errors = [];
                that.waitingHandler();

                var values = that.parseValues();

                var bodyText = that.createBodyText(values.valuesOrdered);

                that.sendEmails(bodyText, values.valuesDirect);

                return false;
            })
        },

        createBodyText: function (values) {
            var output = '';

            $.each(values, function (i, object) {
                output += object.label + ': ' + object.value + "\n";
            })

            return output;
        },

        sendEmails: function(bodyText, values) {
            var that = this

            $.each(that.options.emails, function (emailDelta, emailInfo) {
                that.temp.total += 1;
                var mailBody = ''

                if (emailInfo.headerText) {
                    mailBody += emailInfo.headerText + "\n\n"
                }

                mailBody += bodyText + "\n"

                if (emailInfo.footerText) {
                    mailBody += emailInfo.footerText
                }

                var email = {
                    subject: emailInfo.subject,
                    body: mailBody,
                    from: emailInfo.from
                }

                if (emailInfo.replyToField) { email.replyTo = values[emailInfo.replyToField] }
                else { email.replyTo = emailInfo.replyTo }

                if (emailInfo.fromNameField) { email.fromName = values[emailInfo.fromNameField] }
                else { email.fromName = emailInfo.fromName }

                if (emailInfo.toField) { email.to = values[emailInfo.toField] }
                else { email.to = emailInfo.to }

                that.sendEmail(email)
            })
        },

        sendEmail: function (email) {
            var that = this
            var to = []

            // Make array of 'to' field:
            if( typeof email.to === 'string' ) {
                email.to = [ email.to ];
            }

            $.each(email.to, function (delta, mail) {
                to.push({
                    email: mail
                })
            })

            that.mandrill.messages.send({
                "message": {
                    "from_email": email.from,
                    "from_name": email.fromName,
                    "to": to,
                    "subject": email.subject,
                    "headers": {
                        "Reply-To": email.replyTo
                    },
                    "text": email.body
                }
            }, function(success){
                that.successHandler('success');
            },
            function(error) {
                that.successHandler('error', error);
            });

        },
        waitingHandler: function () {
            var that = this;
            $(that.element).find(that.options.submitSelector).prop('disabled', true);
            that.options.wait();
        },
        successHandler: function (status, response) {
            var that = this;
            if (status == 'error') {
                that.temp.errors.push(response.message);
            }

            that.temp.total -= 1;

            if (that.temp.total == 0) {
                if (that.temp.errors.length > 0) {
                    that.options.error(that.temp.errors);
                    $(that.element).find(that.options.submitSelector).prop('disabled', false);
                } else {
                    that.options.success();
                }
            }
        },
        parseValues: function () {
            var that = this;

            var output = {
                valuesOrdered: [],
                valuesDirect: {}
            }
            var data = $(that.element).serializeArray();

            $.each(data, function (delta, formItem) {
                var input = $('[name="' + formItem.name + '"]');
                var label = input.attr(that.options.labelAttribute);
                var value = formItem.value;

                // Use name as label when no labelAttribute is present:
                if(label == undefined || label == '') {
                    label = formItem.name;
                }

                output.valuesOrdered.push({
                    'label': label,
                    'value': value
                });
                output.valuesDirect[formItem.name] = value; // Used because of direct referencing in settings.
            })

            return output;
        }
    }
 
    // jQuery plugin constructor
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

}( jQuery ));