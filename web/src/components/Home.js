import React from 'react';
import '../css/style.css';

class Home extends React.Component {
  render() {
    return(
      <div className="content-body">
        <h1 className="headline">Welcome to PushApp</h1>
        <p>If you would like to become one of our beta-tester please follow this guide below. Keep in mind that the application will change during the time you
        are using it and data might be deleted during our development period.</p>

        <h2>Get started</h2>
        <p>We are so glad you decided to help us test the application. We would enjoy it even more if you submitted feedback for us, there is a form you can fill out and it is found in the menu above.</p>

        <h3>Downloading Expo</h3>
        <p>If you are using iOS you can download Expo application HERE. If you are using Android you can find it HERE.</p>

        <h3>Connecting Expo to PushApp</h3>
        <p>To connect Expo to PushApp you simply need to press the + button in the upper right corner. When you are asked for an address you fill in "@ryggan/client" without the quotes.
        An example of how it looks can be seen in the picture below.</p>

        <h3>You should be set!</h3>
        <p>The application should now be working for you, and you access it through Expo. Should any problem occur then please contact us att help@getpushapp.com.
        We hope you enjoy our application and please do not forget to send us your thoughts and opinions in the feedback form!</p>

      </div>
    );
  }
}

export default Home;
