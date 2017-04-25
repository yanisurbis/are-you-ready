import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import IntroMessage from './IntroMessage';
import LoggedInMessage from './LoggedInMessage'
import 'grommet/grommet.min.css'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Message For User', module)
  .add('not logged in', () => (
    <IntroMessage />
  ))
  .add('logged in', () => (
    <LoggedInMessage
      name="Yanis Urbis"
    />
  ))
