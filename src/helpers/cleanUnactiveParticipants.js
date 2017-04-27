// @flow

import secondsBetwDates from "./secondsBetwDates";
import R from "ramda";

type ParticipantT = {
  uid: string,
  name: string,
  email: string,
  ready: boolean,
  isAdmin: boolean,
  lastSeen: string
};

function lessThan(seconds: number): (p: ParticipantT) => boolean {
  const currentTime = new Date().toLocaleString();
  return function keep(p) {
    return secondsBetwDates(currentTime, p.lastSeen) < seconds;
  };
}

function cleanUnactiveUsers(participants: ParticipantT[]): ParticipantT[] {
  return participants.filter(lessThan(10));
}

export default cleanUnactiveUsers;
