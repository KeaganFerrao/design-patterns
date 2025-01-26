class MeetingSchedulerSystem {
    attendeeSystem = new AttendeeSystem();
    schedulerSystem = new SchedulerSystem(new UserManager(), new MeetingsManager(), new NotificationManager());
}

class AttendeeSystem {

}

class SchedulerSystem {
    constructor(userManager: UserManager, meetingsManager: MeetingsManager, notificationManager: NotificationManager) {

    }
}

class MeetingsManager {
    meetings: Meeting[] = []

    createMeeting(meeting: Meeting) {

    }

    updateMeeting(meeting: Meeting) {

    }

    cancelMeeting(meetingId: string) {

    }
}

interface Meeting {
    id: string
    users: User[]
    dateTime: string[]

    schedule(): void
}

class SingleMeeting implements Meeting {
    id: string;
    users: User[];
    dateTime: string[];

    constructor(users: User[], dateTime: string[]) {
        this.users = users;
        this.dateTime = dateTime;
    }

    schedule(): void {

    }
}

class RecurringMeeting implements Meeting {
    id: string;
    users: User[];
    dateTime: string[];

    constructor(users: User[], dateTime: string[]) {
        this.users = users;
        this.dateTime = dateTime;
    }

    schedule(): void {

    }
}

class UserManager {

}

interface User {
    id: string;
    email: string;
    userCalendar: Calendar
}

class AccountUser implements User {
    id: string;
    email: string;

    userCalendar = new OutlookCalendar()
}

interface Calendar {
    dates: string[]

    listCalendarMeetings(): Meeting[]
}

class OutlookCalendar implements Calendar {
    dates: string[]

    listCalendarMeetings(): Meeting[] {
        return []
    }
}

class NotificationManager {

}