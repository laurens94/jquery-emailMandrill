#jQuery Mandrill Plugin
jQuery plugin to parse a HTML-form and send it using the Mandrill API.

##Quick Start
```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="js/mandrill.min.js"></script>
<script type="text/javascript" src="js/jquery.emailMandrill.js"></script>
```

```html
<form id="contact-form">
  Name: <input type="text" name="name">
  Email address: <input type="text" name="email" data-name="Email address">
  Subject: <input type="text" name="subject">
  Message: <textarea name="message" id="message" cols="30" rows="10"></textarea>
</form>
```
**Make sure the `input`-fields have a unique `name`-attribute.**

*Optional:* add a `data-name`-attribute to add proper labels in the emails.


```js
$(function() {

    $('#contact-form').emailMandrill({
        mandrillKey: 'ADD-YOUR-API-KEY',
        emails: [
            {
                from: 'yourname@domain.com',
                fromNameField: 'name',
                // fromName: 'John Smith',
                // toField: '',
                to: ['mail1@domain.com', 'mail2@domain2.com'],
                // replyTo: 'mail@domain.com',
                replyToField: 'Email address',
                subject: 'This is the email subject',
                headerText: 'Hi there! You received the following data:',
                footerText: 'Bye!',
            }
        ]
    });

});
```

##Reference
The `$.emailMandrill()` function accepts the following parameters:

| Name            | Type        | Description | 
| --------------- | ----------- | ----------- | 
| `mandrillKey`   | variable    | The API key |
| `emails`        | array with objects | Email addresses to send the email(s) to |

The `emails`-object accepts the following parameters:

| Name            | Type                    | Description              |
| --------------- | ----------------------- | ------------------------ |
| `from`          | variable                | The 'from'-emailaddress  |
| `fromNameField` | variable                | The `name`-attribute of an `input`-field that contains the name of the sender |
| `fromName`      | variable                | The name of the sender in case you don't use `fromNameField` |
| `to`            | array or single variable| The 'from'-email address(ess)  |
| `toField`       | variable                | The `name`-attribute of an `input`-field that contains the email address of the receiver |
| `replyToField`  | variable                | The `name`-attribute of an `input`-field that contains the reply-to email address |
| `replyTo`       | variable                | An reply-to email address in case you don't use `replyToField` |
| `subject`       | variable                | The email subject |
| `headerText`    | variable                | The prepending text of the mail |
| `footerText`    | variable                | The appending text of the mail |