interface User {
    id: string
    email: string
    calendar: Calendar[]
}

interface Observer<T> {
    update(data: T): void
}

interface Subject<T> {
    attach(observer: Observer<T>): void
    detach(observer: Observer<T>): void
    notify(observers: Observer<T>[], data: T): void
}

class AccountUser implements User, Observer<Meeting> {
    id: string
    email: string
    calendar: Calendar[]

    update(meeting: Meeting): void {

    }
}

interface Calendar {
    id: string
    meetings: Meeting[]

    addToCalendar(): void;
    getAllMeetings(): Meeting[]
}

class OutlookCalendar implements Calendar {
    id: string
    meetings: Meeting[]

    addToCalendar(): void {

    }

    getAllMeetings(): Meeting[] {
        return []
    }
}

interface Meeting {
    id: string;
    organizer: User;
    attendees: User[]
    dateTimes: string[]

    schedule(): void
}

class SingleMeeting implements Meeting {
    id: string;
    organizer: User;
    attendees: User[]
    dateTimes: string[]

    schedule(): void {

    }
}

class RecurringMeeting implements Meeting {
    id: string;
    organizer: User;
    attendees: User[]
    dateTimes: string[]

    schedule(): void {

    }
}

class SchedulerSystem {
    meetingManager = new MeetingsManager();
    userManager = new UserManager();
    notificationManager = new NotificationManager();
}

class MeetingsManager {
    meetings: Meeting[];

    scheduleMeeting(meeting: Meeting) { }

    updateMeeting() { }

    cancelMeeting() { }
}

class UserManager {
    users: User[]

    addToCalendar(user: User, meeting: Meeting) { }
    removeFromCalendar(user: User, meetingId: string) { }
}

class NotificationManager {

}