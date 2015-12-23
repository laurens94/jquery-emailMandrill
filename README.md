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
  Emailaddress: <input type="text" name="email">
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
                // toField: '', // name-attribute of the input field that contains the to-emailaddress
                to: ['mail1@domain.com', 'mail2@domain2.com'], // ['email1', 'email2']
                // replyTo: 'mail@domain.com', // ['email1', 'email2']
                replyToField: 'E-mailadres', // name-attribute of the input field that contains the reply-to-emailaddress
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

| Name | Type          |
| ------------- | ----------- |
| mandrillKey      | variable|
| emails     | array with objects    |

The `emails`-object accepts the following parameters:

| Name | Type          |
| ------------- | ----------- |
| from      | variable|
| fromNameField      | variable|
| fromName      | variable|
| to      | array|
| toField      | variable|
| replyTo      | variable|
| replyToField      | variable|
| subject      | variable|
| headerText      | variable|
| footerText      | variable|