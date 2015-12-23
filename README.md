#jQuery Mandrill Plugin
jQuery plugin to parse a HTML-form and send it using the Mandrill API.

##Dependencies
- jQuery
- Mandrill API

##Quick Start
```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="js/mandrill.min.js"></script>
<script type="text/javascript" src="js/jquery.emailMandrill.js"></script>
```

```html
<form data-mailform="my-contact-form">
  Name: <input type="text" name="name">
  Email address: <input type="text" name="email">
  Subject: <input type="text" name="subject">
  Message: <textarea name="message" id="message" cols="30" rows="10"></textarea>
</form>
```

```js
$(function() {
    $('[data-mailform]').emailMandrill({
        mandrillKey: '', // Mandrill API key
        emails: [
            {
                from: 'yourname@domain.com', // From
                fromNameField: 'name', // name-attribute of the input field that contains the from-name
                // fromName: 'John Smith', // From-name in case you don't use an input field for this
                // toField: '', // name-attribute of the input field that contains the to-email address
                to: ['mail1@domain.com', 'mail2@domain2.com'], // ['email1', 'email2']
                // replyTo: 'mail@domain.com', // ['email1', 'email2']
                replyToField: 'Email address', // name-attribute of the input field that contains the reply-to-email address
                subject: 'This is the email subject', // Subject
                headerText: 'Hi there! You received the following data:', // Email header
                footerText: 'Bye!', // Email footer
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